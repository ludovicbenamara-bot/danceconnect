import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowLeft, Heart, Share2, Play, Check, X, Calendar as CalendarIcon, Info } from 'lucide-react';

const TeacherProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { teachers, favorites, toggleFavorite } = useData();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const teacher = teachers.find(t => t.id === parseInt(id));
    const isFavorite = favorites.includes(parseInt(id));

    // Mock slots (could be moved to context later)
    const slots = [
        { id: 1, day: 'Lun', date: '28 Déc', time: '18:00', available: true },
        { id: 2, day: 'Lun', date: '28 Déc', time: '19:30', available: true },
        { id: 3, day: 'Mar', date: '29 Déc', time: '17:00', available: false },
        { id: 4, day: 'Mer', date: '30 Déc', time: '10:00', available: true },
        { id: 5, day: 'Ven', date: '1 Jan', time: '18:00', available: true },
    ];

    if (!teacher) return <div className="text-white p-10">Professeur non trouvé</div>;

    const handleToggleFavorite = () => {
        toggleFavorite(parseInt(id));
    };

    return (
        <div className="bg-zinc-950 pb-32 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-72">
                <img
                    src={teacher.videoThumb}
                    alt={teacher.name}
                    className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute top-6 left-6 right-6 flex justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleToggleFavorite}
                            className={`p-2 backdrop-blur-md rounded-full text-white transition-all ${isFavorite ? 'bg-pink-600 border border-pink-500 shadow-[0_0_20px_rgba(219,39,119,0.4)]' : 'bg-black/50'
                                }`}
                        >
                            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                        <button className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform pointer-events-auto">
                        <Play className="text-white fill-white ml-1" size={32} />
                    </button>
                </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 -mt-10 relative z-10 pb-10">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">{teacher.name}</h1>
                            <p className="text-purple-400 font-medium">{teacher.style}</p>
                        </div>
                        <div className="flex items-center bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                            <Star size={16} className="text-amber-400 fill-amber-400 mr-1" />
                            <span className="font-bold">{teacher.rating}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 text-sm text-zinc-400 mb-6">
                        <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {teacher.location}
                        </div>
                        <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {teacher.experience}
                        </div>
                    </div>

                    <p className="text-zinc-300 leading-relaxed mb-6">
                        {teacher.bio}
                    </p>

                    <h3 className="font-bold mb-3">Spécialités</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {teacher.styles.map(s => (
                            <span key={s} className="bg-zinc-800 text-zinc-300 px-4 py-1.5 rounded-full text-sm flex items-center border border-zinc-700">
                                <Check size={12} className="mr-1.5 text-purple-400" />
                                {s}
                            </span>
                        ))}
                    </div>

                    <div className="border-t border-zinc-800 pt-6">
                        <div className="flex justify-between items-baseline mb-4">
                            <h3 className="font-bold">Avis ({teacher.reviews})</h3>
                            <button className="text-sm text-purple-400 font-medium">Voir tout</button>
                        </div>
                        <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400 border border-purple-500/30">JD</div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold">Jean Dupont</p>
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-amber-400" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-400 italic">"Sophie est une excellente pédagogue. Elle a su me redonner confiance dès le premier cours."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-xl border-t border-zinc-900 z-50">
                <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                    <div>
                        <p className="text-zinc-500 text-xs text-left">À partir de</p>
                        <p className="text-2xl font-bold">{teacher.price}</p>
                    </div>
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex-1 hover:bg-zinc-200 transition-colors shadow-lg active:scale-95"
                    >
                        Réserver un cours
                    </button>
                </div>
            </div>

            {/* Booking Drawer Overlay */}
            {isBookingOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end animate-in fade-in duration-300"
                    onClick={() => setIsBookingOpen(false)}
                >
                    <div
                        className="w-full bg-zinc-900 rounded-t-[40px] p-8 pb-12 shadow-2xl border-t border-zinc-800 animate-in slide-in-from-bottom duration-300 pointer-events-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="max-w-md mx-auto">
                            <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-8" />

                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold">Réserver</h2>
                                    <p className="text-zinc-500 text-sm">Disponibilités de {teacher.name}</p>
                                </div>
                                <button
                                    onClick={() => setIsBookingOpen(false)}
                                    className="p-2 bg-zinc-800 rounded-full text-zinc-400"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-10 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                                {slots.map(slot => (
                                    <button
                                        key={slot.id}
                                        disabled={!slot.available}
                                        onClick={() => setSelectedSlot(slot.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${!slot.available
                                            ? 'bg-zinc-900/50 border-zinc-900 opacity-40 grayscale cursor-not-allowed'
                                            : selectedSlot === slot.id
                                                ? 'bg-purple-900/20 border-purple-500 text-white'
                                                : 'bg-zinc-800 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 text-center">
                                                <p className="text-xs font-bold uppercase text-purple-400">{slot.day}</p>
                                                <p className="text-sm font-bold">{slot.date.split(' ')[0]}</p>
                                            </div>
                                            <div className="h-8 w-[1px] bg-zinc-700" />
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-zinc-500" />
                                                <span className="font-bold">{slot.time}</span>
                                            </div>
                                        </div>
                                        {selectedSlot === slot.id && (
                                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                                <Check size={14} className="text-white" />
                                            </div>
                                        )}
                                        {!slot.available && <span className="text-xs font-medium uppercase text-zinc-600">Complet</span>}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-zinc-800/50 rounded-2xl p-4 mb-8 flex items-start gap-3 border border-zinc-800">
                                <Info size={18} className="text-purple-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Vous serez redirigé vers le paiement après confirmation. L'annulation est gratuite jusqu'à 24h avant le cours.
                                </p>
                            </div>

                            <button
                                disabled={!selectedSlot}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl active:scale-95 ${selectedSlot
                                    ? 'bg-white text-black hover:bg-zinc-200'
                                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                    }`}
                                onClick={() => {
                                    const selectedSlotData = slots.find(s => s.id === selectedSlot);
                                    navigate('/checkout', {
                                        state: {
                                            teacherId: teacher.id,
                                            teacherName: teacher.name,
                                            price: teacher.price,
                                            slot: `${selectedSlotData.day} ${selectedSlotData.date} - ${selectedSlotData.time}`
                                        }
                                    });
                                    setIsBookingOpen(false);
                                }}
                            >
                                Confirmer la réservation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherProfile;
