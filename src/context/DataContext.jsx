import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
// Keeping mock data for initial seeding if DB is empty
import { INITIAL_TEACHERS, INITIAL_BOOKINGS, INITIAL_SLOTS, INITIAL_CHATS } from '../data/mockData';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [slots, setSlots] = useState([]);
    const [chats, setChats] = useState([]);

    const [session, setSession] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const mapUser = (user) => {
        console.log('Mapping user:', user);
        setCurrentUser({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email.split('@')[0],
            role: user.user_metadata?.role || 'student',
            image: user.user_metadata?.image || `https://ui-avatars.com/api/?name=${user.email}&background=random`
        });
    };

    // Auth Listeners
    useEffect(() => {
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) mapUser(session.user);
            setLoading(false);
        });

        // 2. Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user) {
                mapUser(session.user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Auth Actions
    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    };

    const signup = async (email, password, metadata) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata // { role: 'teacher', name: '...' }
            }
        });
        if (error) throw error;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    // 1. Fetch Initial Data
    useEffect(() => {
        const fetchData = async () => {
            // Fetch Teachers
            const { data: teachersData } = await supabase.from('teachers').select('*');
            if (teachersData) {
                // Enrich with default values for missing DB columns
                const enrichedTeachers = teachersData.map(t => ({
                    ...t,
                    styles: t.styles || [t.style || 'Danse'], // Fallback array
                    reviews: t.reviews || 0,
                    experience: t.experience || 'Expérimenté',
                    bio: t.bio || 'Aucune description disponible pour ce professeur.'
                }));
                setTeachers(enrichedTeachers);
            }

            // Fetch Slots
            const { data: slotsData } = await supabase.from('slots').select('*');
            if (slotsData) {
                // Normalize keys for frontend components (teacher_id -> teacherId)
                const normalizedSlots = slotsData.map(s => ({
                    ...s,
                    teacherId: s.teacher_id,
                    teacher_id: s.teacher_id // keep original just in case
                }));
                setSlots(normalizedSlots);
            }

            // Fetch Bookings with Teacher details
            const { data: bookingsData } = await supabase
                .from('bookings')
                .select(`
                    *,
                    teacher:teachers (
                        name,
                        style,
                        image,
                        location
                    )
                `);

            if (bookingsData) {
                // Hydrate and Normalize
                const hydratedBookings = bookingsData.map(b => ({
                    ...b,
                    teacherId: b.teacher_id,
                    studentId: b.student_id,
                    // Hydrate UI fields from joined teacher data if missing in booking
                    teacher: b.teacher_name || (b.teacher && b.teacher.name) || 'Prof',
                    style: b.style || (b.teacher && b.teacher.style) || 'Salsa',
                    image: b.teacher_image || (b.teacher && b.teacher.image) || '',
                    location: b.location || (b.teacher && b.teacher.location) || ''
                }));
                setBookings(hydratedBookings);
            }

            // Fetch Chats & Messages
            const { data: chatsData } = await supabase
                .from('chats')
                .select(`
                    *,
                    messages (*)
                `);

            if (chatsData) {
                // Formatting for frontend compatibility
                const formattedChats = chatsData.map(c => ({
                    ...c,
                    messages: c.messages ? c.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) : []
                }));
                setChats(formattedChats);
            }
        };

        fetchData();

        // 2. Realtime Subscriptions
        const channels = supabase
            .channel('custom-all-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'slots' }, (payload) => {
                if (payload.eventType === 'INSERT') setSlots(prev => [...prev, payload.new]);
                if (payload.eventType === 'DELETE') setSlots(prev => prev.filter(s => s.id !== payload.old.id));
                if (payload.eventType === 'UPDATE') setSlots(prev => prev.map(s => s.id === payload.new.id ? payload.new : s));
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
                if (payload.eventType === 'INSERT') setBookings(prev => [...prev, payload.new]);
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
                // When a new message arrives, we need to update the specific chat
                setChats(prev => prev.map(chat => {
                    if (chat.id === payload.new.chat_id) {
                        return { ...chat, messages: [...chat.messages, payload.new] };
                    }
                    return chat;
                }));
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, async (payload) => {
                setChats(prev => [...prev, { ...payload.new, messages: [] }]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channels);
        };
    }, []);

    // --- Legacy / Placeholder Actions (to be migrated or removed) ---
    const addCourse = (teacherId, course) => {
        console.log('addCourse not fully migrated to Supabase yet', teacherId, course);
        // Todo: Add 'courses' table in Supabase
    };

    const deleteCourse = (courseId) => {
        console.log('deleteCourse not fully migrated', courseId);
    };

    const addBooking = (booking) => {
        console.log('addBooking deprecated, use bookSlot', booking);
    };

    // --- Actions ---

    const addSlot = async (teacherId, date, time) => {
        const { error } = await supabase.from('slots').insert([{
            teacher_id: teacherId,
            date,
            time,
            status: 'available'
        }]);
        if (error) console.error('Error adding slot:', error);
    };

    const removeSlot = async (slotId) => {
        const { error } = await supabase.from('slots').delete().eq('id', slotId);
        if (error) console.error('Error removing slot:', error);
    };

    const bookSlot = async (slotId) => {
        const slot = slots.find(s => s.id === slotId);
        if (!slot) return;

        const teacher = teachers.find(t => t.id === slot.teacher_id);

        // 1. Update slot status
        await supabase.from('slots').update({ status: 'booked' }).eq('id', slotId);

        // 2. Create Booking
        await supabase.from('bookings').insert([{
            teacher_id: teacher.id,
            student_id: currentUser.id,
            date: slot.date,
            time: slot.time,
            status: 'upcoming',
            status_label: 'Payé',
            slot_id: slotId,
            price: teacher.price,
            location: teacher.location,
            style: teacher.style,
            teacher_name: teacher.name,
            teacher_image: teacher.image
        }]);
    };

    const toggleFavorite = (teacherId) => {
        setFavorites(prev => {
            const newFavs = prev.includes(teacherId)
                ? prev.filter(id => id !== teacherId)
                : [...prev, teacherId];
            localStorage.setItem('dc_favorites', JSON.stringify(newFavs)); // Keep favorites local for now
            return newFavs;
        });
    };

    const startChat = async (teacherId) => {
        // Check if chat exists locally first to avoid unnecessary calls
        // In real app we might query DB, but checking local state (synced with DB) is faster
        const existingChat = chats.find(c =>
            c.participants.includes(teacherId) && c.participants.includes(currentUser.id)
        );

        if (existingChat) return existingChat.id;

        // Create new chat
        const { data, error } = await supabase
            .from('chats')
            .insert([{ participants: [currentUser.id, teacherId] }])
            .select()
            .single();

        if (error) {
            console.error('Error creating chat:', error);
            return null;
        }
        return data.id;
    };

    const sendMessage = async (chatId, text) => {
        const { error } = await supabase.from('messages').insert([{
            chat_id: chatId,
            sender_id: currentUser.id,
            text
        }]);
        // Also update chat timestamp
        await supabase.from('chats').update({ updated_at: new Date() }).eq('id', chatId);

        if (error) console.error('Error sending message:', error);
    };

    const getTeacherById = (id) => {
        return teachers.find(t => t.id === parseInt(id));
    };

    return (
        <DataContext.Provider value={{
            teachers,
            bookings,
            favorites,
            currentUser,
            session,
            loading,
            login,
            signup,
            logout,
            addCourse,
            deleteCourse,
            addBooking,
            toggleFavorite,
            getTeacherById,
            setCurrentUser,
            slots,
            addSlot,
            removeSlot,
            bookSlot,
            chats,
            startChat,
            sendMessage
        }}>
            {children}
        </DataContext.Provider>
    );
};
