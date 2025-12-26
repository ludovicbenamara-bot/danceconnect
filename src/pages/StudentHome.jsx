import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Search, MapPin, Star, List, Map as MapIcon, SlidersHorizontal, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StudentHome = () => {
    const navigate = useNavigate();
    const { teachers, favorites, toggleFavorite } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');

    const categories = ['Tous', 'Ballet', 'Hip Hop', 'Salsa', 'Contemporain', 'Jazz'];

    const filteredTeachers = useMemo(() => {
        return teachers.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.style.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'Tous' || t.styles.some(s => s.includes(selectedCategory)) || t.style.includes(selectedCategory);
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, teachers]);

    const handleToggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };

    return (
        <div className="pb-24 animate-in fade-in duration-500">
            {/* Header / Search */}
            <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Trouver un prof, un style..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 focus:bg-zinc-950 transition-all text-sm outline-none"
                        />
                    </div>
                    <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white transition-colors">
                        <SlidersHorizontal size={18} />
                    </button>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto mt-4 gap-2 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${selectedCategory === cat
                                ? 'bg-purple-600 border-purple-500 text-white shadow-[0_4px_12px_rgba(147,51,234,0.3)]'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Info */}
            <div className="px-6 py-4 flex justify-between items-center">
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-loose">
                    {filteredTeachers.length} {filteredTeachers.length > 1 ? 'Professeurs trouvés' : 'Professeur trouvé'}
                </p>
                <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                    <button className="p-1 px-3 bg-zinc-800 text-white rounded-lg shadow-lg">
                        <List size={16} />
                    </button>
                    <button
                        onClick={() => navigate('/student/explore')}
                        className="p-1 px-3 text-zinc-500 hover:text-white transition-colors"
                    >
                        <MapIcon size={16} />
                    </button>
                </div>
            </div>

            {/* Teacher List */}
            <div className="px-6 space-y-6">
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                        <Link key={teacher.id} to={`/student/teacher/${teacher.id}`} className="block transition-all group active:scale-[0.98]">
                            <div className="bg-zinc-950 rounded-[2.5rem] overflow-hidden border border-zinc-900 group-hover:border-zinc-700 group-hover:bg-zinc-900 transition-all duration-500 shadow-xl relative">
                                <div className="h-56 w-full relative">
                                    <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-2xl text-white text-xs font-black flex items-center border border-white/10 shadow-2xl">
                                            <Star size={12} className="text-amber-400 mr-1.5" fill="currentColor" />
                                            {teacher.rating}
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleToggleFavorite(e, teacher.id)}
                                        className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md border transition-all z-20 ${favorites.includes(teacher.id)
                                            ? 'bg-pink-600 border-pink-500 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)]'
                                            : 'bg-black/40 border-white/10 text-white hover:bg-black/60'
                                            }`}
                                    >
                                        <Heart size={18} fill={favorites.includes(teacher.id) ? "currentColor" : "none"} />
                                    </button>
                                    <div className="absolute bottom-4 left-4 bg-purple-600 px-3 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest border border-purple-500 shadow-2xl">
                                        {teacher.price}€/h
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">{teacher.name}</h3>
                                        <div className="h-8 w-8 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                                            <MapPin size={14} className="text-zinc-500 group-hover:text-purple-400 transition-colors" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-zinc-400 group-hover:text-zinc-300 transition-colors mb-4">{teacher.style}</p>
                                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-500 transition-colors">
                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                                        À {teacher.location} • Disponible ce soir
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="py-20 text-center">
                        <div className="bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                            <Search size={32} className="text-zinc-700" />
                        </div>
                        <h3 className="text-white font-bold mb-1">Aucun résultat</h3>
                        <p className="text-zinc-500 text-sm">Essayez une autre recherche ou catégorie.</p>
                    </div>
                )}
            </div>

            {/* Quick Explore FAB (Optional for Map) */}
            <button
                onClick={() => navigate('/student/explore')}
                className="fixed bottom-24 right-6 bg-white text-black h-14 px-6 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 font-black text-sm uppercase tracking-widest z-40 hover:scale-105 active:scale-95 transition-all"
            >
                <MapIcon size={20} />
                Carte
            </button>
        </div>
    );
};

export default StudentHome;
