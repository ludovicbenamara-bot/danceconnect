import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Search, Edit3, ChevronLeft, Send,
    MoreHorizontal, Phone, Video, Image as ImageIcon,
    Smile, Mic, CheckCheck
} from 'lucide-react';

const Social = () => {
    const location = useLocation();
    const isTeacher = location.pathname.includes('/teacher');
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    const conversations = [
        {
            id: 1,
            name: isTeacher ? 'Sarah M.' : 'Sophie Martin',
            image: isTeacher
                ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
                : 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=200',
            lastMsg: isTeacher ? 'Est-ce qu\'on peut décaler le cours ?' : 'Parfait, à tout à l\'heure !',
            time: '14:20',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: isTeacher ? 'Marc V.' : 'Thomas D.',
            image: isTeacher
                ? 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200'
                : 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200',
            lastMsg: 'Merci pour le cours de hier !',
            time: 'Hier',
            unread: 0,
            online: false
        }
    ];

    const currentMessages = [
        { id: 1, text: 'Hello ! J\'ai une question sur le cours de demain.', sender: 'them', time: '14:15' },
        { id: 2, text: 'Oui, dis-moi tout ? 😊', sender: 'me', time: '14:16' },
        { id: 3, text: isTeacher ? 'Est-ce qu\'on peut décaler le cours à 15h ?' : 'Est-ce que je dois apporter des chaussures spécifiques ?', sender: 'them', time: '14:18' },
    ];

    if (selectedChat) {
        return (
            <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col max-w-md mx-auto shadow-2xl">
                {/* Chat Header */}
                <div className="bg-zinc-900/50 backdrop-blur-md p-4 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSelectedChat(null)} className="p-2 -ml-2 text-zinc-400 hover:text-white">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="relative">
                            <img src={selectedChat.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                            {selectedChat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full" />}
                        </div>
                        <div>
                            <h2 className="font-bold text-sm text-white">{selectedChat.name}</h2>
                            <p className="text-[10px] text-green-500 font-bold">{selectedChat.online ? 'En ligne' : 'Hors ligne'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-zinc-500 hover:text-white"><Phone size={18} /></button>
                        <button className="p-2 text-zinc-500 hover:text-white"><Video size={18} /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    <div className="text-center py-4">
                        <span className="text-[10px] font-bold text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full uppercase tracking-widest">Aujourd'hui</span>
                    </div>
                    {currentMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'me'
                                ? 'bg-purple-600 text-white rounded-tr-none'
                                : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
                                }`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end text-purple-200' : 'text-zinc-500'}`}>
                                    <span className="text-[8px]">{msg.time}</span>
                                    {msg.sender === 'me' && <CheckCheck size={10} />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-zinc-950 border-t border-zinc-900">
                    <div className="bg-zinc-900 rounded-2xl p-2 flex items-center gap-2 border border-zinc-800 transition-focus-within focus-within:border-purple-500/50">
                        <button className="p-2 text-zinc-500 hover:text-white"><Smile size={20} /></button>
                        <input
                            type="text"
                            placeholder="Message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-zinc-600"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <button className="p-2 text-zinc-500 hover:text-white"><ImageIcon size={20} /></button>
                        <button
                            className={`p-2 rounded-xl transition-all ${messageInput.trim() ? 'bg-purple-600 text-white' : 'text-zinc-500'
                                }`}
                        >
                            {messageInput.trim() ? <Send size={20} /> : <Mic size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-24">
            {/* Header */}
            <div className="bg-zinc-950/80 backdrop-blur-md pt-12 pb-6 px-6 sticky top-0 z-20">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-black text-white">Messages</h1>
                    <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-purple-400">
                        <Edit3 size={20} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher une discussion..."
                        className="w-full bg-zinc-900 border border-zinc-900 focus:border-purple-600 focus:bg-zinc-950 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white transition-all outline-none"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="px-6 space-y-2">
                {conversations.map(chat => (
                    <button
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-zinc-900 active:bg-zinc-900/50 rounded-3xl transition-all group"
                    >
                        <div className="relative">
                            <div className="h-14 w-14 rounded-full p-[2px] bg-gradient-to-tr from-zinc-800 to-zinc-700 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500">
                                <div className="h-full w-full rounded-full bg-zinc-950 p-[2px]">
                                    <img src={chat.image} alt="" className="w-full h-full rounded-full object-cover" />
                                </div>
                            </div>
                            {chat.online && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-zinc-950 rounded-full" />}
                        </div>
                        <div className="flex-1 text-left">
                            <div className="flex justify-between items-center mb-0.5">
                                <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{chat.name}</h3>
                                <span className="text-[10px] text-zinc-500 font-bold">{chat.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className={`text-xs truncate max-w-[180px] ${chat.unread > 0 ? 'text-zinc-200 font-bold' : 'text-zinc-500'}`}>
                                    {chat.lastMsg}
                                </p>
                                {chat.unread > 0 && (
                                    <span className="h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Empty State / Quick Help */}
            <div className="mt-8 px-6 text-center">
                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest leading-loose">
                    Besoin d'aide ? <br />
                    <span className="text-purple-500/50">Contactez le support 24/7</span>
                </p>
            </div>
        </div>
    );
};

export default Social;
