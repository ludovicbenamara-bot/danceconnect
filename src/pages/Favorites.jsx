import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Star, MapPin, Search } from 'lucide-react';

const Favorites = () => {
    const navigate = useNavigate();
    const { teachers, favorites, toggleFavorite } = useData();

    const favoriteTeachers = useMemo(() => {
        return teachers.filter(t => favorites.includes(t.id));
    }, [teachers, favorites]);

    const handleToggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };

    return (
        <div className="min-h-screen bg-zinc-950 pb-24 animate-in fade-in duration-500">
            {/* Header */}
            <div className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mes <span className="text-pink-500">Favoris</span></h1>
            </div>

            <div className="px-6 space-y-6 mt-4">
                {favoriteTeachers.length > 0 ? (
                    favoriteTeachers.map((teacher) => (
                        <Link key={teacher.id} to={`/student/teacher/${teacher.id}`} className="block transition-all active:scale-[0.98]">
                            <div className="flex bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all shadow-xl group">
                                <div className="w-1/3 h-32 relative flex-shrink-0">
                                    <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                                    <button
                                        onClick={(e) => handleToggleFavorite(e, teacher.id)}
                                        className="absolute top-2 left-2 p-1.5 bg-pink-600 rounded-full text-white shadow-lg"
                                    >
                                        <Heart size={14} fill="currentColor" />
                                    </button>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-white text-lg leading-tight uppercase tracking-tight">{teacher.name}</h3>
                                        <div className="flex items-center gap-1 bg-black/30 px-1.5 py-0.5 rounded-lg">
                                            <Star size={10} className="text-amber-400 fill-amber-400" />
                                            <span className="text-[10px] font-bold text-white">{teacher.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-500 font-bold mb-2 uppercase tracking-widest">{teacher.style}</p>
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                                        <MapPin size={10} className="text-purple-500" />
                                        {teacher.location}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="py-20 text-center">
                        <div className="bg-zinc-900 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-zinc-800 rotate-12 group hover:rotate-0 transition-transform">
                            <Heart size={40} className="text-zinc-800" />
                        </div>
                        <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Aucun favori</h3>
                        <p className="text-zinc-500 text-sm max-w-[200px] mx-auto font-medium mb-8">Lancez-vous et explorez pour trouver vos professeurs préférés !</p>
                        <button
                            onClick={() => navigate('/student')}
                            className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all"
                        >
                            Découvrir
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
