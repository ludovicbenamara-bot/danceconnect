import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CreditCard, ShieldCheck, CheckCircle2, Apple, Wallet } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = useData();
    console.log('Checkout Render - Data Context:', data);

    // Safety check for context
    if (!data) {
        console.error('UseData is invalid/null');
        return <div className="text-white pt-20">Error: Context not loaded</div>;
    }

    const { bookSlot, currentUser, loading } = data;
    console.log('Checkout Render - User:', currentUser, 'Loading:', loading);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Mock data if no state is passed (Fallback)
    const stateParams = location.state || {
        teacherName: 'Sophie Martin',
        price: 'CHF 65',
        slot: 'Lundi 28 Déc. - 14:00'
    };
    console.log('Checkout Render - Params:', stateParams);

    const { teacherName, price, slot, slotId } = stateParams;

    const handlePayment = async () => {
        if (!currentUser) {
            // Should normally not happen if route is protected, but safe check
            navigate('/login');
            return;
        }

        if (!slotId) {
            setError("Erreur: Créneau non valide (Mode démo ?)");
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            // Real Supabase call
            await bookSlot(slotId);
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Impossible de confirmer la réservation. Veuillez réessayer.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                    <CheckCircle2 size={40} className="text-green-500 animate-bounce" />
                </div>
                <h1 className="text-3xl font-black mb-2 text-white">C'est confirmé !</h1>
                <p className="text-zinc-400 mb-8 max-w-xs">
                    Votre cours avec <span className="text-white font-bold">{teacherName}</span> est réservé. Un rappel vous sera envoyé 2h avant.
                </p>
                <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8 text-left">
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Détails de la réservation</div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-zinc-400 text-sm">Professeur</span>
                            <span className="text-white text-sm font-bold">{teacherName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400 text-sm">Date & Heure</span>
                            <span className="text-white text-sm font-bold">{slot}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 pb-10">
            {/* Header */}
            <header className="p-6 flex items-center gap-4 bg-zinc-950 sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-black text-white">Paiement</h1>
            </header>

            <div className="px-6 space-y-8">
                {/* Order Summary */}
                <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white mb-1">Résumé du cours</h2>
                            <p className="text-sm text-zinc-500">{slot}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-black text-purple-400">{price}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-zinc-950 rounded-2xl border border-zinc-800">
                        <img
                            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=100"
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                            <p className="text-sm font-bold text-white">{teacherName}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Dance Professionnelle</p>
                        </div>
                    </div>
                </section>

                {/* Quick Pay */}
                <section className="space-y-3">
                    <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-2">Paiement Rapide</div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 bg-white text-black py-3 rounded-2xl font-bold hover:bg-zinc-200 transition-colors">
                            <Apple size={20} fill="currentColor" />
                            Apple Pay
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                            <Wallet size={20} />
                            Google Pay
                        </button>
                    </div>
                </section>

                {/* Card Payment */}
                <section className="space-y-4">
                    <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-2">Carte de Crédit</div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl -mr-16 -mt-16" />
                        <div className="space-y-1">
                            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider ml-1">Numéro de Carte</label>
                            <div className="relative">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-purple-500 outline-none transition-all font-mono"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider ml-1">Expiration</label>
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 px-4 text-sm text-white focus:border-purple-500 outline-none transition-all font-mono"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider ml-1">CVC</label>
                                <input
                                    type="text"
                                    placeholder="***"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 px-4 text-sm text-white focus:border-purple-500 outline-none transition-all font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 text-zinc-600">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-center">Paiement sécurisé et chiffré</span>
                </div>

                {/* Final Action */}
                <div className="pt-4">
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${isProcessing
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-purple-600 text-white shadow-[0_10px_30px_rgba(147,51,234,0.3)] hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        {isProcessing ? (
                            <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Payer {price}</>
                        )}
                    </button>
                    {error && <p className="text-red-500 text-xs text-center font-bold mt-2">{error}</p>}
                    <p className="text-[10px] text-zinc-600 text-center mt-4 px-10">
                        En réservant, vous acceptez nos <span className="underline">Conditions Générales de Vente</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
