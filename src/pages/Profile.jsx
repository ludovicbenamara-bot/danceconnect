import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
    CreditCard, Heart, History,
    Shield, Bell, HelpCircle, ChevronRight,
    Star, Landmark, GraduationCap, LogOut
} from 'lucide-react';

const ProfileItem = ({ icon: Icon, label, value, color = "text-zinc-400", onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl border border-zinc-800/50 transition-all active:scale-[0.98]"
    >
        <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl bg-zinc-900 border border-zinc-800 ${color}`}>
                <Icon size={20} />
            </div>
            <div className="text-left">
                <p className="text-sm font-bold text-white">{label}</p>
                {value && <p className="text-[10px] text-zinc-500">{value}</p>}
            </div>
        </div>
        <ChevronRight size={18} className="text-zinc-700" />
    </button>
);

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, logout, loading } = useData();

    // If loading, show nothing or a spinner
    if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Chargement...</div>;

    // If not logged in and not loading, redirect (or show empty state, but normally we redirect)
    // For now, let's just be safe
    if (!currentUser) {
        // We might want to render a "Not logged in" view or redirect
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white gap-4">
                <p>Non connecté</p>
                <button onClick={() => navigate('/login')} className="text-purple-500 underline">Se connecter</button>
            </div>
        );
    }

    const isTeacher = currentUser.role === 'teacher';

    const userInfo = {
        name: currentUser.name || 'Utilisateur',
        email: currentUser.email,
        image: currentUser.image,
        badge: isTeacher ? 'Professeur Certifié' : 'Membre Passionné'
    };

    return (
        <div className="pb-24">
            {/* Header */}
            <div className="relative pt-12 pb-8 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-purple-600/20 to-transparent" />
                <div className="relative flex flex-col items-center">
                    <div className="h-24 w-24 rounded-3xl p-[2px] bg-gradient-to-tr from-purple-500 to-pink-500 shadow-2xl mb-4">
                        <div className="h-full w-full rounded-3xl bg-zinc-950 p-[2px]">
                            <img src={userInfo.image} alt="Profile" className="w-full h-full rounded-3xl object-cover" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-white">{userInfo.name}</h1>
                    <p className="text-zinc-500 text-sm mb-2">{userInfo.email}</p>
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                        {userInfo.badge}
                    </span>
                </div>
            </div>

            <div className="px-6 space-y-8">
                {/* Role Specific Section */}
                <section>
                    <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 ml-2">GÉRAL DE COMPTE</h2>
                    <div className="space-y-3">
                        {isTeacher ? (
                            <>
                                <ProfileItem icon={GraduationCap} label="Ma Danse École" value="Studio Marais, Hip-Hop" color="text-purple-400" />
                                <ProfileItem icon={Landmark} label="Coordonnées Bancaires" value="Banque Raiffeisen ****4210" color="text-green-400" />
                                <ProfileItem icon={Star} label="Avis & Notes" value="4.9 / 5 (128 avis)" color="text-amber-400" />
                            </>
                        ) : (
                            <>
                                <ProfileItem icon={CreditCard} label="Mon Abonnement" value="Passionné (CHF 29.99/mois)" color="text-purple-400" />
                                <ProfileItem
                                    icon={Heart}
                                    label="Mes Profs Favoris"
                                    value="Mes professeurs enregistrés"
                                    color="text-pink-400"
                                    onClick={() => navigate('/student/favorites')}
                                />
                                <ProfileItem
                                    icon={History}
                                    label="Mes Réservations"
                                    value="Historique et cours à venir"
                                    color="text-blue-400"
                                    onClick={() => navigate('/student/bookings')}
                                />
                            </>
                        )}
                    </div>
                </section>

                {/* Shared Settings Section */}
                <section>
                    <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 ml-2">PARAMÈTRES</h2>
                    <div className="space-y-3">
                        <ProfileItem icon={Shield} label="Sécurité & Confidentialité" />
                        <ProfileItem icon={Bell} label="Notifications" value="Push, Email actives" />
                        <ProfileItem icon={HelpCircle} label="Centre d'aide" />
                    </div>
                </section>

                {/* Logout Button */}
                <button
                    onClick={async () => {
                        try {
                            await logout();
                            navigate('/');
                        } catch (error) {
                            console.error('Logout failed', error);
                        }
                    }}
                    className="w-full flex items-center justify-center gap-2 p-4 bg-zinc-900/30 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 rounded-2xl border border-zinc-900 transition-all font-bold text-sm group"
                >
                    <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                    Se déconnecter
                </button>
            </div>
        </div>
    );
};

export default Profile;
