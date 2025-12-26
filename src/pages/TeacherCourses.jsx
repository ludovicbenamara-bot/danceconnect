import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Plus, Edit2, Trash2,
    Check, X, Star, Clock, Info,
    BookOpen, Layers, Users, DollarSign
} from 'lucide-react';

const TeacherCourses = () => {
    const navigate = useNavigate();
    const { getTeacherById, addCourse, deleteCourse } = useData();

    // Mocking logged in teacher as ID 1 (Sophie Martin)
    const currentTeacherId = 1;
    const teacherProfile = getTeacherById(currentTeacherId);
    const courses = teacherProfile?.courses || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        style: 'Ballet',
        level: 'Débutant',
        price: '',
        duration: '60'
    });

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({
                title: course.title,
                style: course.style,
                level: course.level,
                price: course.price,
                duration: course.duration
            });
        } else {
            setEditingCourse(null);
            setFormData({
                title: '',
                style: 'Ballet',
                level: 'Débutant',
                price: '',
                duration: '60'
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.price) return;

        const coursePayload = {
            id: editingCourse ? editingCourse.id : Date.now(),
            ...formData,
            reviews: editingCourse ? editingCourse.reviews : 0,
            rating: editingCourse ? editingCourse.rating : 0
        };

        addCourse(currentTeacherId, coursePayload);
        setIsModalOpen(false);
    };

    const handleDelete = (courseId) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce cours ?')) {
            deleteCourse(currentTeacherId, courseId);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 pb-24 animate-in fade-in duration-500 text-white">
            {/* Header */}
            <div className="p-6 pt-12 flex justify-between items-center sticky top-0 bg-zinc-950/80 backdrop-blur-md z-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter">Mes <span className="text-purple-500">Cours</span></h1>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="h-12 w-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(147,51,234,0.3)] hover:scale-110 active:scale-95 transition-all"
                >
                    <Plus size={24} />
                </button>
            </div>

            <div className="px-6 space-y-4 mt-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} className="group bg-zinc-900 rounded-[2.5rem] p-6 border border-zinc-800 hover:border-zinc-700 transition-all shadow-xl animate-in slide-in-from-bottom duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                                            {course.style}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                                            {course.level}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black uppercase italic tracking-tight">{course.title}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(course)}
                                        className="p-2 bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors border border-zinc-700"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="p-2 bg-zinc-800 rounded-xl text-red-500/50 hover:text-red-500 transition-colors border border-zinc-700"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-purple-500" />
                                    <span className="text-xs font-bold text-zinc-400">{course.duration} min</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign size={14} className="text-green-500" />
                                    <span className="text-xs font-bold text-zinc-400">{course.price} CHF / séance</span>
                                </div>
                                {course.rating > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Star size={14} className="text-amber-500" fill="currentColor" />
                                        <span className="text-xs font-bold text-zinc-400">{course.rating} ({course.reviews})</span>
                                    </div>
                                )}
                            </div>

                            <button className="w-full py-4 bg-zinc-950 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all">
                                Voir les statistiques de ce cours
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center">
                        <div className="bg-zinc-900 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                            <BookOpen size={40} className="text-zinc-800" />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tight mb-2 text-zinc-500">Aucun cours actif</h3>
                        <p className="text-zinc-600 text-xs font-medium max-w-[200px] mx-auto mb-8">Commencez par créer votre premier cours pour attirer des élèves !</p>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-purple-600 px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                        >
                            Créer mon premier cours
                        </button>
                    </div>
                )}
            </div>

            {/* Course Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-zinc-900 w-full max-w-md rounded-[3rem] border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black uppercase italic italic">{editingCourse ? 'Modifier' : 'Nouveau'} <span className="text-purple-500">Cours</span></h2>
                                <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Titre du cours</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Kizomba Sensual"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-purple-500 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Style</label>
                                        <select
                                            value={formData.style}
                                            onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-purple-500 appearance-none"
                                        >
                                            <option>Ballet</option>
                                            <option>Hip Hop</option>
                                            <option>Salsa</option>
                                            <option>Contemporain</option>
                                            <option>Kizomba</option>
                                            <option>Jazz</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Niveau</label>
                                        <select
                                            value={formData.level}
                                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-purple-500 appearance-none"
                                        >
                                            <option>Tous niveaux</option>
                                            <option>Débutant</option>
                                            <option>Intermédiaire</option>
                                            <option>Avancé</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Prix (CHF)</label>
                                        <div className="relative">
                                            <DollarSign size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" />
                                            <input
                                                type="number"
                                                placeholder="30"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-500 transition-all font-mono"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Durée (min)</label>
                                        <div className="relative">
                                            <Clock size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" />
                                            <input
                                                type="number"
                                                placeholder="60"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-500 transition-all font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-zinc-800/50 rounded-2xl p-4 flex gap-3 border border-zinc-800">
                                    <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed italic">
                                        Ces informations seront visibles par tous les élèves lors de leur recherche. Assurez-vous d'être précis !
                                    </p>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-zinc-200 transition-all shadow-2xl active:scale-[0.98]"
                                >
                                    {editingCourse ? 'Enregistrer les modifications' : 'Publier ce cours'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCourses;
