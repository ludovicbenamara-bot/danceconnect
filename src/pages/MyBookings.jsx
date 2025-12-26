import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar as CalendarIcon, Clock, MapPin, User, ArrowRight, MessageCircle } from 'lucide-react';

const MyBookings = () => {
    const navigate = useNavigate();
    const { bookings } = useData();
    const [filter, setFilter] = useState('upcoming');

    const filteredBookings = bookings.filter(b => b.status === filter);

    return (
        <div className="min-h-screen bg-zinc-950 pb-24 animate-in fade-in duration-500">
            {/* Header */}
            <div className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mes <span className="text-purple-500">Réservations</span></h1>
            </div>

            {/* Filter Pills */}
            <div className="px-6 flex gap-2 mb-8">
                <button
                    onClick={() => setFilter('upcoming')}
                    className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === 'upcoming'
                        ? 'bg-purple-600 text-white shadow-xl scale-105'
                        : 'bg-zinc-900 text-zinc-500'
                        }`}
                >
                    À venir
                </button>
                <button
                    onClick={() => setFilter('past')}
                    className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === 'past'
                        ? 'bg-zinc-800 text-white'
                        : 'bg-zinc-900 text-zinc-500'
                        }`}
                >
                    Passés
                </button>
            </div>

            <div className="px-6 space-y-6">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-zinc-900 rounded-[2.5rem] p-6 border border-zinc-800 shadow-2xl animate-in slide-in-from-bottom duration-500">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-xl border border-white/5">
                                        <img src={booking.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-white text-lg uppercase tracking-tight">{booking.teacher}</h3>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{booking.style}</p>
                                        <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${booking.color || 'bg-green-500/20 text-green-500'}`}>
                                            {booking.statusLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-white">{booking.price}</p>
                                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Facturé</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <CalendarIcon size={16} className="text-purple-500" />
                                    <span className="font-bold">{booking.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <Clock size={16} className="text-purple-500" />
                                    <span className="font-bold">{booking.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <MapPin size={16} className="text-purple-500" />
                                    <span className="font-bold truncate">{booking.location}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {booking.status === 'upcoming' ? (
                                    <>
                                        <button className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 active:scale-[0.98] transition-all">
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => navigate('/student/social')}
                                            className="p-4 bg-zinc-800 text-purple-400 rounded-2xl border border-zinc-700 hover:text-white transition-colors"
                                        >
                                            <MessageCircle size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full bg-zinc-800 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                        Reprendre un cours <ArrowRight size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center">
                        <div className="bg-zinc-900 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                            <CalendarIcon size={40} className="text-zinc-800" />
                        </div>
                        <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Pas de réservations</h3>
                        <p className="text-zinc-500 text-sm max-w-[200px] mx-auto font-medium mb-8">Vous n'avez pas encore de réservations dans cette catégorie.</p>
                        <button
                            onClick={() => navigate('/student')}
                            className="bg-purple-600 text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all"
                        >
                            Trouver un cours
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
