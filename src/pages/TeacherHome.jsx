import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Calendar as CalendarIcon, Users, CreditCard, ChevronRight, TrendingUp, Plus, Share2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherHome = () => {
    const navigate = useNavigate();
    const { bookings } = useData();
    const currentTeacherId = 1; // Simulated logged-in teacher

    const teacherBookings = useMemo(() => {
        return bookings.filter(b => b.teacherId === currentTeacherId && b.status === 'upcoming');
    }, [bookings]);

    const stats = useMemo(() => {
        const uniqueStudents = new Set(teacherBookings.map(b => b.id)).size; // Simplified student count
        // Parse "CHF 30" to 30
        const revenue = teacherBookings.reduce((acc, curr) => {
            const price = parseInt(curr.price.replace(/[^0-9]/g, '')) || 0;
            return acc + price;
        }, 850); // Start with base 850 as per mock for realism

        return [
            { icon: Users, label: 'Élèves', value: `${24 + uniqueStudents}`, trend: uniqueStudents > 0 ? `+${uniqueStudents}` : 'Stable', color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { icon: CalendarIcon, label: 'Cours à venir', value: `${teacherBookings.length}`, trend: 'Actifs', color: 'text-purple-400', bg: 'bg-purple-400/10' },
            { icon: CreditCard, label: 'Revenus', value: `CHF ${revenue}`, trend: '+24%', color: 'text-green-400', bg: 'bg-green-400/10' },
        ];
    }, [teacherBookings]);

    const chartData = [35, 65, 45, 80, 55, 90, 70]; // Keeping visual mock for now
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    // Recent activity mock (could be derived effectively later)
    const activities = [
        { id: 1, user: 'Julie R.', action: 's\'est inscrite à', target: 'Ballet Débutant', time: 'Il y a 2h' },
        { id: 2, user: 'Marc V.', action: 'a payé son cours de', target: 'Hip Hop', time: 'Il y a 5h' },
    ];

    return (
        <div className="p-4 pb-24 space-y-6">
            <header className="flex justify-between items-center pt-8 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white">Bonjour, Ludovic</h1>
                    <p className="text-zinc-500 text-sm">Bonne progression cette semaine ! 📈</p>
                </div>
                <div className="relative group">
                    <div className="h-12 w-12 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-pink-500">
                        <div className="h-full w-full rounded-full bg-zinc-950 p-[2px]">
                            <img src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-zinc-950 rounded-full"></div>
                </div>
            </header>

            {/* Quick Actions */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                <button
                    onClick={() => navigate('/teacher/courses')}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap active:scale-95 transition-transform"
                >
                    <Plus size={18} />
                    Gérer mes cours
                </button>
                <button className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl font-semibold text-sm border border-zinc-800 whitespace-nowrap active:scale-95 transition-transform">
                    <Share2 size={18} className="text-purple-400" />
                    Partager mon profil
                </button>
            </div>

            {/* Stats Dashboard */}
            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold flex items-center gap-2">
                        <TrendingUp size={20} className="text-green-400" />
                        Aperçu des revenus
                    </h2>
                    <select className="bg-transparent text-xs text-zinc-500 border-none focus:ring-0 outline-none">
                        <option>7 derniers jours</option>
                        <option>30 jours</option>
                    </select>
                </div>

                {/* Mock Chart */}
                <div className="h-32 flex items-end justify-between gap-1 px-2">
                    {chartData.map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div
                                className="w-full rounded-t-lg bg-gradient-to-t from-purple-500/20 to-purple-500 transition-all hover:to-pink-500 cursor-pointer relative group"
                                style={{ height: `${h}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    CHF {h * 10}
                                </div>
                            </div>
                            <span className="text-[10px] text-zinc-600 font-bold">{days[i]}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-zinc-800 pt-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="text-center flex flex-col items-center">
                                <div className={`p-2 rounded-xl mb-2 ${stat.bg} ${stat.color}`}>
                                    <Icon size={18} />
                                </div>
                                <div className="text-xs text-zinc-500 mb-1">{stat.label}</div>
                                <div className="font-bold text-lg text-white">{stat.value}</div>
                                <div className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-green-500' : 'text-zinc-500'}`}>
                                    {stat.trend}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Classes */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Planning du jour</h2>
                    <button className="text-xs text-purple-400 font-semibold">Voir l'agenda</button>
                </div>
                <div className="space-y-3">
                    {teacherBookings.length > 0 ? (
                        teacherBookings.map((item) => (
                            <div key={item.id} className={`bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex justify-between items-center group active:scale-[0.98] transition-all`}>
                                <div className="flex gap-4 items-center">
                                    <div className="text-center min-w-[50px]">
                                        <div className="text-sm font-black text-white">{item.time}</div>
                                        <div className="text-[10px] text-zinc-500 font-bold">{item.date.split(' ')[0]}</div>
                                    </div>
                                    <div className={`w-[2px] h-8 rounded-full bg-purple-500`} />
                                    <div>
                                        <div className="text-white font-bold text-sm">{item.style}</div>
                                        <div className="text-xs text-zinc-500">{item.price} • Étudiant Test</div>
                                    </div>
                                </div>
                                <MoreHorizontal size={20} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-zinc-500 text-sm">Aucun cours prévu prochainement.</div>
                    )}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
                <h2 className="font-bold text-sm mb-4">Activité récente</h2>
                <div className="space-y-4">
                    {activities.map(act => (
                        <div key={act.id} className="flex gap-3 items-start">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-purple-400 border border-zinc-700">
                                {act.user.split(' ')[0][0]}{act.user.split(' ')[1][0]}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-zinc-300">
                                    <span className="font-bold text-white">{act.user}</span> {act.action} <span className="text-purple-400">{act.target}</span>
                                </p>
                                <span className="text-[10px] text-zinc-600">{act.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherHome;
