import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Compass, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Accueil', path: `/${role}` },
        { icon: Calendar, label: 'Calendrier', path: `/${role}/calendar` },
        { icon: Compass, label: 'Explorer', path: `/${role}/explore` },
        { icon: MessageCircle, label: 'Social', path: `/${role}/social` },
        { icon: User, label: 'Moi', path: `/${role}/profile` },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 pb-safe">
            <div className="flex justify-center gap-6 items-center h-16">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.label === 'Accueil' && location.pathname === `/${role}`);
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center justify-center p-2 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const Layout = ({ role }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <div className="max-w-md mx-auto min-h-screen bg-zinc-950 relative shadow-2xl overflow-hidden">
                {/* Main content area */}
                <div className="h-full overflow-y-auto">
                    <div key={location.pathname} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Outlet />
                    </div>
                </div>
                {/* Bottom Navigation */}
                <BottomNav role={role} />
            </div>
        </div>
    );
};

export default Layout;
