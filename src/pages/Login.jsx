import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Github, Chrome, ArrowRight, ChevronLeft, ShieldCheck } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock auth delay
        setTimeout(() => {
            // For now, if no role is saved, default to student but let the user select during signup
            // If they are logging in, we assume they have a role. 
            // Mock: email containing 'teacher' logs in as teacher.
            const role = email.includes('teacher') ? 'teacher' : 'student';
            localStorage.setItem('userRole', role);
            localStorage.setItem('isLoggedIn', 'true');
            navigate(role === 'teacher' ? '/teacher' : '/student');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col p-6 animate-in fade-in duration-700">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-pink-600/5 blur-[100px] rounded-full" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between py-4 mb-12">
                <button onClick={() => navigate('/')} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-right cursor-pointer group" onClick={() => navigate('/')}>
                    <p className="text-[10px] font-black text-zinc-600 group-hover:text-purple-500 transition-colors uppercase tracking-widest leading-none">DanceConnect</p>
                    <p className="text-xs font-bold text-white group-hover:text-zinc-300 transition-colors">Auth v1.0</p>
                </div>
            </header>

            {/* Content */}
            <main className="relative z-10 flex-1 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
                        De retour <br /> <span className="text-purple-500">parmi nous</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">Connectez-vous pour continuer votre progression.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 mb-8">
                    <div className="space-y-1.5">
                        <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-1">Email professionnel</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nom@exemple.ch"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-purple-500 focus:bg-zinc-950 transition-all outline-none shadow-xl"
                            />
                        </div>
                    </div>

                    <button
                        disabled={isLoading || !email}
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${isLoading || !email
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>Continuer <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-900"></div></div>
                    <div className="relative flex justify-center"><span className="bg-zinc-950 px-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">Ou via</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                    <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl py-3.5 hover:bg-zinc-800 transition-all font-bold text-sm text-white">
                        <Chrome size={18} /> Google
                    </button>
                    <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl py-3.5 hover:bg-zinc-800 transition-all font-bold text-sm text-white">
                        <Github size={18} /> GitHub
                    </button>
                </div>

                <div className="mt-auto pb-6 text-center">
                    <p className="text-zinc-500 text-sm mb-4">Pas encore de compte ?</p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-purple-400 font-black uppercase text-xs tracking-widest hover:text-purple-300 transition-colors"
                    >
                        Créer un profil gratuitement
                    </button>
                </div>
            </main>

            {/* Footer Trust */}
            <footer className="relative z-10 flex items-center justify-center gap-2 py-4 text-zinc-700">
                <ShieldCheck size={14} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">Secure Authentication Gateway</span>
            </footer>
        </div>
    );
};

export default Login;
