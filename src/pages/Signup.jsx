import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Sparkles, Check, ArrowRight, ShieldCheck, Music, Star } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        email: '',
        interests: []
    });
    const [isLoading, setIsLoading] = useState(false);

    const danceStyles = ['Ballet', 'Hip Hop', 'Salsa', 'Jazz', 'Contemporary', 'Zumba', 'Tango', 'Bachata'];

    const toggleInterest = (style) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(style)
                ? prev.interests.filter(i => i !== style)
                : [...prev.interests, style]
        }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else finishSignup();
    };

    const finishSignup = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('userRole', formData.role);
            localStorage.setItem('isLoggedIn', 'true');
            navigate(formData.role === 'teacher' ? '/teacher' : '/student');
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col p-6 animate-in fade-in duration-700">
            {/* Header / Progress */}
            <header className="relative z-10 flex items-center justify-between py-4 mb-10">
                <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/login')} className="p-2 -ml-2 text-zinc-400">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-6 bg-purple-500' : 'w-2 bg-zinc-800'}`} />
                    ))}
                </div>
            </header>

            <main className="relative z-10 flex-1 flex flex-col">
                {/* Step 1: Role Selection */}
                {step === 1 && (
                    <div className="animate-in slide-in-from-right duration-500">
                        <div className="mb-10">
                            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
                                Parlez-nous de <br /> <span className="text-purple-500">vous</span>
                            </h1>
                            <p className="text-zinc-500 text-sm font-medium">Quel sera votre rôle sur DanceConnect ?</p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => setFormData({ ...formData, role: 'student' })}
                                className={`w-full p-6 pb-8 rounded-[2.5rem] border-2 text-left transition-all ${formData.role === 'student'
                                        ? 'bg-purple-900/20 border-purple-500 shadow-[0_10px_40px_rgba(147,51,234,0.3)]'
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-3xl ${formData.role === 'student' ? 'bg-purple-600 text-white' : 'bg-zinc-950 text-zinc-600'}`}>
                                        <Music size={28} />
                                    </div>
                                    {formData.role === 'student' && <Check size={24} className="text-purple-500" />}
                                </div>
                                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Je suis Élève</h3>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Je veux apprendre et découvrir</p>
                            </button>

                            <button
                                onClick={() => setFormData({ ...formData, role: 'teacher' })}
                                className={`w-full p-6 pb-8 rounded-[2.5rem] border-2 text-left transition-all ${formData.role === 'teacher'
                                        ? 'bg-purple-900/20 border-purple-500 shadow-[0_10px_40px_rgba(147,51,234,0.3)]'
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-3xl ${formData.role === 'teacher' ? 'bg-purple-600 text-white' : 'bg-zinc-950 text-zinc-600'}`}>
                                        <Sparkles size={28} />
                                    </div>
                                    {formData.role === 'teacher' && <Check size={24} className="text-purple-500" />}
                                </div>
                                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Je suis Prof</h3>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Je veux enseigner et grandir</p>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Info */}
                {step === 2 && (
                    <div className="animate-in slide-in-from-right duration-500">
                        <div className="mb-10">
                            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
                                Vos <br /> <span className="text-purple-500">identifiants</span>
                            </h1>
                            <p className="text-zinc-500 text-sm font-medium">Comment souhaitez-vous être appelé ?</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-1">Nom complet</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="James Bond"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-purple-500 focus:bg-zinc-950 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="james@mi6.ch"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-purple-500 focus:bg-zinc-950 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Interests */}
                {step === 3 && (
                    <div className="animate-in slide-in-from-right duration-500 flex flex-col flex-1">
                        <div className="mb-10">
                            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
                                Vos <br /> <span className="text-purple-500">passions</span>
                            </h1>
                            <p className="text-zinc-500 text-sm font-medium">Sélectionnez les styles qui vous font vibrer.</p>
                        </div>

                        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[50vh] pr-2 no-scrollbar">
                            {danceStyles.map(style => (
                                <button
                                    key={style}
                                    onClick={() => toggleInterest(style)}
                                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border ${formData.interests.includes(style)
                                            ? 'bg-purple-600 border-purple-400 text-white shadow-[0_8px_20px_rgba(147,51,234,0.4)]'
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                        }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 bg-zinc-900/50 p-4 rounded-3xl border border-zinc-800 flex items-center gap-4">
                            <div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center">
                                <Star size={20} fill="currentColor" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                                DanceConnect utilisera ces infos pour personnaliser votre accueil.
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer Action */}
                <div className="mt-auto pt-10">
                    <button
                        disabled={(step === 1 && !formData.role) || (step === 2 && (!formData.name || !formData.email)) || isLoading}
                        onClick={handleNext}
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${(step === 1 && !formData.role) || (step === 2 && (!formData.name || !formData.email)) || isLoading
                                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-2xl'
                            }`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>{step === 3 ? 'Finaliser' : 'Suivant'} <ArrowRight size={20} /></>
                        )}
                    </button>
                    <footer className="flex items-center justify-center gap-2 py-6 text-zinc-700">
                        <ShieldCheck size={14} />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">Données chiffrées & protégées</span>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Signup;
