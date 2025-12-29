import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
    ChevronLeft, ChevronRight, Plus,
    Calendar as CalendarIcon, Clock, MapPin,
    User, X, Star, MoreHorizontal, Trash2
} from 'lucide-react';

const Calendar = () => {
    const location = useLocation();
    const isTeacher = location.pathname.includes('/teacher');
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { slots, addSlot, removeSlot } = useData();
    const currentTeacherId = 1; // Simulated

    const days = [
        { name: 'Lun', date: 23 },
        { name: 'Mar', date: 24 },
        { name: 'Mer', date: 25 },
        { name: 'Jeu', date: 26 },
        { name: 'Ven', date: 27 },
        { name: 'Sam', date: 28 },
        { name: 'Dim', date: 29 },
    ];

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newSlotTime, setNewSlotTime] = useState('10:00');

    // Filter slots for the selected date and current teacher
    const daySlots = slots.filter(s =>
        s.teacherId === currentTeacherId &&
        new Date(s.date).getDate() === selectedDate
    );

    // Merge with bookings to show full schedule (optional, focusing on slots management first)
    const displayedEvents = daySlots.map(slot => ({
        id: slot.id,
        title: slot.status === 'booked' ? 'Créneau Réservé' : 'Disponibilité',
        time: slot.time,
        location: 'Studio Marais',
        person: slot.status === 'booked' ? 'Élève inscrit' : 'En attente',
        style: 'Général',
        color: slot.status === 'booked' ? 'bg-purple-500' : 'bg-zinc-700',
        price: '30 CHF',
        date: new Date(slot.date).getDate(),
        status: slot.status,
        type: 'slot'
    }));

    const handleAddSlot = () => {
        // Construct date string for 2025-12-XX based on selectedDate mock
        const dateStr = `2025-12-${selectedDate}`;
        addSlot(currentTeacherId, dateStr, newSlotTime);
        setIsAddModalOpen(false);
    };

    const handleDeleteSlot = (id) => {
        if (confirm('Supprimer ce créneau ?')) {
            removeSlot(id);
            setSelectedEvent(null);
        }
    };

    return (
        <div className="pb-24 animate-in fade-in duration-500 min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="p-6 pt-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">Mon <span className="text-purple-500">Planning</span></h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Novembre 2024</p>
                    </div>
                    {isTeacher && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="h-12 w-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_20px_rgba(147,51,234,0.3)] hover:scale-110 active:scale-95 transition-all">
                            <Plus size={24} />
                        </button>
                    )}
                </div>

                {/* Week View */}
                <div className="flex justify-between items-center gap-2 mb-2">
                    {days.map((day) => (
                        <button
                            key={day.date}
                            onClick={() => setSelectedDate(day.date)}
                            className={`flex-1 flex flex-col items-center py-4 rounded-2xl transition-all ${selectedDate === day.date
                                ? 'bg-purple-600 text-white shadow-xl scale-105'
                                : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'
                                }`}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest mb-2">{day.name}</span>
                            <span className="text-lg font-black">{day.date}</span>
                        </button>
                    ))}
                </div>
            </header>

            {/* Event List */}
            <main className="px-6 space-y-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Cours du jour</h2>
                    <button className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Tout voir</button>
                </div>

                {displayedEvents.length > 0 ? (
                    displayedEvents.map((event) => (
                        <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="w-full text-left group animate-in slide-in-from-bottom duration-500"
                        >
                            <div className="bg-zinc-900 border border-zinc-800/50 rounded-3xl p-5 hover:border-zinc-700 transition-all active:scale-[0.98]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl ${event.color} flex items-center justify-center text-white shadow-lg`}>
                                            <CalendarIcon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{event.title}</h3>
                                            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                                                <Clock size={12} /> {event.time}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-zinc-400">{event.price}</span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center">
                                            <User size={12} className="text-zinc-500" />
                                        </div>
                                        <span className="text-xs font-bold text-zinc-400">{event.person}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                        <MapPin size={12} className="text-purple-500" />
                                        Studio Marais
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="py-12 text-center bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
                        <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                            <CalendarIcon size={24} className="text-zinc-700" />
                        </div>
                        <p className="text-zinc-500 text-sm font-bold">Aucun cours prévu</p>
                        <p className="text-[10px] text-zinc-700 uppercase font-black tracking-widest mt-1">Profitez de votre temps libre !</p>
                    </div>
                )}
            </main>

            {/* Event Detail Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-zinc-900 w-full max-w-md rounded-[2.5rem] border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="relative h-48">
                            <div className={`absolute inset-0 ${selectedEvent.color} opacity-20`} />
                            <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent`} />
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-6 right-6 h-10 w-10 bg-zinc-950/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute bottom-6 left-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedEvent.color} text-white shadow-lg mb-2 inline-block`}>
                                    {selectedEvent.style}
                                </span>
                                <h3 className="text-2xl font-black text-white uppercase italic leading-none">{selectedEvent.title}</h3>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Horaire</p>
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Clock size={16} className="text-purple-500" />
                                        {selectedEvent.time}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Prix</p>
                                    <div className="flex items-center gap-2 text-white font-bold font-mono">
                                        <Star size={16} className="text-amber-500" fill="currentColor" />
                                        {selectedEvent.price}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Localisation</p>
                                <div className="flex items-start gap-2 text-white font-bold">
                                    <MapPin size={16} className="text-purple-500 mt-1 flex-shrink-0" />
                                    <span>{selectedEvent.location} <br /> <span className="text-xs text-zinc-500 font-medium">Bâtiment B, 3ème étage</span></span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{isTeacher ? 'Participant' : 'Professeur'}</p>
                                <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                            <User size={18} className="text-zinc-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{selectedEvent.person}</p>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                                {selectedEvent.status === 'booked' ? 'Confirmé' : 'Disponible'}
                                            </p>
                                        </div>
                                    </div>
                                    {isTeacher && selectedEvent.type === 'slot' && (
                                        <button
                                            onClick={() => handleDeleteSlot(selectedEvent.id)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-zinc-900 w-full max-w-sm rounded-[2rem] border border-zinc-800 p-6 animate-in zoom-in duration-300 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black text-white uppercase italic">Ajouter un créneau</h3>
                            <button onClick={() => setIsAddModalOpen(false)}><X size={20} className="text-zinc-500" /></button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Heure de début</label>
                            <input
                                type="time"
                                value={newSlotTime}
                                onChange={(e) => setNewSlotTime(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-bold"
                            />
                        </div>

                        <button
                            onClick={handleAddSlot}
                            className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold uppercase tracking-wide hover:bg-purple-500 active:scale-95 transition-all">
                            Ajouter Disponibilité
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
