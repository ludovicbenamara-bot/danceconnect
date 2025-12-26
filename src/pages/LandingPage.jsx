import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, Check, Rocket, Crown } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col bg-gradient-to-br from-purple-900/20 to-zinc-950">
            {/* Top Navigation Menu */}
            <nav className="flex items-center justify-between p-6 border-b border-white/5 backdrop-blur-sm fixed top-0 w-full z-50">
                <div
                    onClick={() => navigate('/')}
                    className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
                >
                    DanceConnect
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm font-black text-zinc-300 hover:text-white transition-colors px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 uppercase tracking-widest"
                    >
                        Connexion
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-sm font-black bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-widest"
                    >
                        S'inscrire
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 mt-16">
                <div className="mb-12 text-center max-w-md">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Vibrez au <br />
                        <span className="text-purple-500">Rythme</span> de votre vie
                    </h1>
                    <p className="text-lg text-zinc-400 mb-8">
                        La plateforme numéro 1 pour connecter les passionnés de danse avec les meilleurs professeurs.
                    </p>

                    <div className="flex gap-4 justify-center">
                        <button onClick={() => navigate('/signup')} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all text-sm shadow-2xl">
                            Commencer l'aventure
                        </button>
                    </div>
                </div>


            </div>

            {/* Pricing Section */}
            <div className="w-full max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 mb-20 relative z-10">
                <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 flex flex-col hover:border-zinc-700 transition-all group">
                    <div className="mb-4 p-3 bg-zinc-800 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                        <Music2 className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Liberté</h3>
                    <p className="text-zinc-400 mb-6 flex-1">Payez uniquement ce que vous consommez. Idéal pour découvrir.</p>
                    <div className="text-3xl font-bold mb-6">Gratuit <span className="text-sm font-normal text-zinc-500">/ accès</span></div>

                    <ul className="space-y-3 mb-8 text-zinc-300">
                        <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> Navigation illimitée</li>
                        <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> Paiement à la carte</li>
                        <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> Chat avec les profs</li>
                    </ul>

                    <button onClick={() => navigate('/signup')} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 font-black uppercase text-xs tracking-widest transition-colors">
                        Commencer gratuitement
                    </button>
                </div>

                <div className="bg-gradient-to-b from-purple-900/40 to-zinc-900/40 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-purple-600 text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAIRE</div>
                    <div className="mb-4 p-3 bg-purple-500/20 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                        <Rocket className="text-purple-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Passionné</h3>
                    <p className="text-purple-200/60 mb-6 flex-1">Progressez plus vite avec un accès régulier.</p>
                    <div className="text-3xl font-bold mb-6">CHF 29.99 <span className="text-sm font-normal text-zinc-500">/ mois</span></div>

                    <ul className="space-y-3 mb-8 text-zinc-300">
                        <li className="flex items-center"><Check size={16} className="text-purple-400 mr-2" /> 5 cours inclus</li>
                        <li className="flex items-center"><Check size={16} className="text-purple-400 mr-2" /> -10% sur les cours supp.</li>
                        <li className="flex items-center"><Check size={16} className="text-purple-400 mr-2" /> Accès prioritaire</li>
                    </ul>

                    <button onClick={() => navigate('/signup')} className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-black uppercase text-xs tracking-widest transition-colors shadow-lg shadow-purple-900/20">
                        S'abonner
                    </button>
                </div>

                <div className="bg-gradient-to-b from-amber-500/10 to-zinc-900/40 backdrop-blur-md border border-amber-500/30 rounded-3xl p-8 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">MEILLEURE OFFRE</div>
                    <div className="mb-4 p-3 bg-amber-500/20 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                        <Crown className="text-amber-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-amber-100">Premium</h3>
                    <p className="text-amber-200/60 mb-6 flex-1">L'expérience ultime pour vivre de sa passion.</p>
                    <div className="text-3xl font-bold mb-6 text-amber-400">CHF 49.99 <span className="text-sm font-normal text-zinc-500">/ mois</span></div>

                    <ul className="space-y-3 mb-8 text-zinc-300">
                        <li className="flex items-center"><Check size={16} className="text-amber-400 mr-2" /> 10 cours inclus</li>
                        <li className="flex items-center"><Check size={16} className="text-amber-400 mr-2" /> -20% sur les cours supp.</li>
                        <li className="flex items-center"><Check size={16} className="text-amber-400 mr-2" /> Support prioritaire 24/7</li>
                        <li className="flex items-center"><Check size={16} className="text-amber-400 mr-2" /> Invitations aux événements</li>
                    </ul>

                    <button onClick={() => navigate('/signup')} className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-black uppercase text-xs tracking-widest transition-colors shadow-lg shadow-amber-900/20">
                        Devenir Premium
                    </button>
                </div>
            </div>

            {/* Legal Footer */}
            <footer className="w-full bg-zinc-900 border-t border-zinc-800 p-8 text-zinc-400 text-sm">
                <div className="max-w-4xl mx-auto">
                    <h4 className="text-white font-bold mb-4">Confidentialité et Protection des Données</h4>
                    <p className="mb-4">
                        La protection de votre vie privée est notre priorité. DanceConnect s'engage à protéger la confidentialité des membres
                        et la sécurité des données conformément aux réglementations en vigueur.
                    </p>
                    <div className="space-y-2 mb-6 text-xs">
                        <p><strong>1. Collecte des données :</strong> Nous collectons les informations nécessaires à la mise en relation (nom, email, ville) et au bon fonctionnement du service.</p>
                        <p><strong>2. Utilisation :</strong> Vos données servent uniquement à faciliter les cours de danse. Aucune vente de données à des tiers.</p>
                        <p><strong>3. Sécurité :</strong> Toutes les transactions et navigations sont sécurisées (HTTPS). Les données bancaires ne sont pas stockées sur nos serveurs.</p>
                    </div>
                    <div className="flex gap-4 border-t border-zinc-800 pt-4 mt-4">
                        <span className="hover:text-white cursor-pointer">Mentions Légales</span>
                        <span className="hover:text-white cursor-pointer">CGU</span>
                        <span className="hover:text-white cursor-pointer">Confidentialité</span>
                    </div>
                    <p className="mt-4 text-xs text-zinc-600">© 2024 DanceConnect. Inspiré par les standards de Superprof.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
