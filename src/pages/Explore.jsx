import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, MapPin, Star, Filter, Navigation } from 'lucide-react';

const Explore = () => {
    const navigate = useNavigate();
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const teachers = [
        { id: 1, name: 'Sophie Martin', style: 'Ballet', price: '30 CHF', rating: 4.9, x: '45%', y: '40%' },
        { id: 2, name: 'Lucas Dubois', style: 'Hip Hop', price: '25 CHF', rating: 4.8, x: '60%', y: '65%' },
        { id: 3, name: 'Elena Rodriguez', style: 'Salsa', price: '40 CHF', rating: 5.0, x: '35%', y: '75%' },
        { id: 4, name: 'Marc V.', style: 'Contemporain', price: '35 CHF', rating: 4.7, x: '55%', y: '30%' },
    ];

    return (
        <div className="fixed inset-0 bg-zinc-950 z-50 overflow-hidden flex flex-col items-center">
            {/* Dark Styled Map Background (CSS Pattern) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 pointer-events-none">
                <div className="max-w-md mx-auto flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl text-white shadow-2xl pointer-events-auto"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="relative flex-1 pointer-events-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Explorer les environs..."
                            className="w-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-all shadow-2xl"
                        />
                    </div>
                    <button className="p-3 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl text-white shadow-2xl pointer-events-auto">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Simulated Map Pins */}
            <div className="relative w-full h-full">
                {teachers.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setSelectedTeacher(t)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all group ${selectedTeacher?.id === t.id ? 'z-30 scale-125' : 'hover:scale-110 z-10'
                            }`}
                        style={{ left: t.x, top: t.y }}
                    >
                        <div className={`relative flex flex-col items-center animate-in zoom-in duration-500`}>
                            <div className={`px-3 py-1.5 rounded-xl font-black text-[10px] mb-1 transition-all border shadow-2xl ${selectedTeacher?.id === t.id
                                    ? 'bg-purple-600 border-purple-400 text-white'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                                }`}>
                                {t.price}
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all ${selectedTeacher?.id === t.id
                                    ? 'bg-purple-600 border-white scale-110'
                                    : 'bg-zinc-950 border-purple-500'
                                }`}>
                                <MapPin size={16} className={selectedTeacher?.id === t.id ? 'text-white' : 'text-purple-500'} />
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Floating Info Card */}
            {selectedTeacher && (
                <div className="absolute bottom-10 left-6 right-6 z-30 animate-in slide-in-from-bottom-10 duration-500">
                    <div className="max-w-md mx-auto bg-zinc-900/95 backdrop-blur-2xl rounded-[2.5rem] p-4 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4">
                        <div className="h-24 w-24 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0">
                            <img
                                src={`https://images.unsplash.com/photo-${selectedTeacher.id === 1 ? '1504609773096-104ff2c73ba4' : selectedTeacher.id === 2 ? '1547153760-18fc86324498' : '1508700929628-666bc9536e2d'}?auto=format&fit=crop&q=80&w=200`}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-black text-white text-lg truncate uppercase tracking-tight">{selectedTeacher.name}</h3>
                                <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-lg border border-white/5">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <span className="text-xs font-bold text-white">{selectedTeacher.rating}</span>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-zinc-500 mb-3">{selectedTeacher.style}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/student/teacher/${selectedTeacher.id}`)}
                                    className="flex-1 bg-white text-black py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                                >
                                    Profil
                                </button>
                                <button className="p-2.5 bg-zinc-800 text-purple-400 rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-colors">
                                    <Navigation size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Controls */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
                <button className="w-12 h-12 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl text-zinc-400 flex items-center justify-center shadow-2xl hover:text-white transition-all">
                    +
                </button>
                <button className="w-12 h-12 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl text-zinc-400 flex items-center justify-center shadow-2xl hover:text-white transition-all">
                    -
                </button>
            </div>

            <button className="absolute bottom-32 right-6 w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_rgba(147,51,234,0.4)] border border-purple-400/50 hover:scale-110 active:scale-95 transition-all z-20">
                <Navigation size={24} />
            </button>
        </div>
    );
};

export default Explore;
