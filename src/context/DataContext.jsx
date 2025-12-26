import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TEACHERS, INITIAL_BOOKINGS } from '../data/mockData';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    // Teachers State
    const [teachers, setTeachers] = useState(() => {
        const saved = localStorage.getItem('dc_teachers');
        return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
    });

    // Bookings State
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('dc_bookings');
        return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    });

    // Favorites State
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('dc_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Current User (simulated)
    const [currentUser, setCurrentUser] = useState({
        id: 'student-1',
        name: 'Étudiant Test',
        role: 'student'
    });

    // Persist to LocalStorage
    useEffect(() => {
        localStorage.setItem('dc_teachers', JSON.stringify(teachers));
    }, [teachers]);

    useEffect(() => {
        localStorage.setItem('dc_bookings', JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        localStorage.setItem('dc_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Actions
    const addCourse = (teacherId, course) => {
        setTeachers(prev => prev.map(t => {
            if (t.id === teacherId) {
                const updatedCourses = t.courses ? [...t.courses] : [];
                // Check if update or new
                const existingIndex = updatedCourses.findIndex(c => c.id === course.id);
                if (existingIndex >= 0) {
                    updatedCourses[existingIndex] = course;
                } else {
                    updatedCourses.push(course);
                }
                return { ...t, courses: updatedCourses };
            }
            return t;
        }));
    };

    const deleteCourse = (teacherId, courseId) => {
        setTeachers(prev => prev.map(t => {
            if (t.id === teacherId) {
                return { ...t, courses: t.courses.filter(c => c.id !== courseId) };
            }
            return t;
        }));
    };

    const addBooking = (booking) => {
        const newBooking = {
            id: Date.now(),
            status: 'upcoming',
            statusLabel: 'Payé',
            ...booking
        };
        setBookings(prev => [newBooking, ...prev]);
    };

    const toggleFavorite = (teacherId) => {
        setFavorites(prev => {
            if (prev.includes(teacherId)) {
                return prev.filter(id => id !== teacherId);
            }
            return [...prev, teacherId];
        });
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
            addCourse,
            deleteCourse,
            addBooking,
            toggleFavorite,
            getTeacherById,
            setCurrentUser
        }}>
            {children}
        </DataContext.Provider>
    );
};
