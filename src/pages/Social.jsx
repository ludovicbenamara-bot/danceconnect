import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
    Search, Edit3, ChevronLeft, Send,
    MoreHorizontal, Phone, Video, Image as ImageIcon,
    Smile, Mic, CheckCheck
} from 'lucide-react';

const Social = () => {
    const { chats, teachers, currentUser, sendMessage } = useData();
    const location = useLocation();
    const [selectedChat, setSelectedChat] = useState(location.state?.selectedChat || null);
    const [messageInput, setMessageInput] = useState('');

    if (!currentUser) return <div className="p-10 text-white">Chargement...</div>;

    // Transform chats to display format
    const myChats = chats.filter(c => c.participants && c.participants.includes(currentUser.id)).map(chat => {
        const otherParticipantId = chat.participants.find(p => p !== currentUser.id);
        const otherParticipant = teachers.find(t => t.id === otherParticipantId) || { name: 'Utilisateur', image: 'https://via.placeholder.com/150' };

        const messages = chat.messages || [];
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

        return {
            id: chat.id,
            name: otherParticipant.name,
            image: otherParticipant.image,
            lastMsg: lastMessage ? lastMessage.text : 'Nouvelle conversation',
            time: lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            unread: 0,
            online: true,
            messages: messages,
            originalChat: chat
        };
    });

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedChat) return;
        sendMessage(selectedChat.id, messageInput);
        setMessageInput('');

    };

    // Re-sync selected chat if it changes in context
    const activeChatData = selectedChat ? myChats.find(c => c.id === selectedChat.id) : null;
    const messagesToDisplay = activeChatData ? activeChatData.messages : [];

    // Use activeChatData for display if available (ensures we have latest data/images from Context transformation)
    // If we only have an ID from navigation state, we MUST wait for context mapping to find the chat
    const displayChat = activeChatData;

    if (displayChat) {
        return (
            <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col max-w-md mx-auto shadow-2xl">
                {/* Chat Header */}
                <div className="bg-zinc-900/50 backdrop-blur-md p-4 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSelectedChat(null)} className="p-2 -ml-2 text-zinc-400 hover:text-white">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="relative">
                            <img src={displayChat.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                            {displayChat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full" />}
                        </div>
                        <div>
                            <h2 className="font-bold text-sm text-white">{displayChat.name}</h2>
                            <p className="text-[10px] text-green-500 font-bold">{displayChat.online ? 'En ligne' : 'Hors ligne'}</p>
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
                    {messagesToDisplay.map(msg => (
                        <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.senderId === currentUser.id
                                ? 'bg-purple-600 text-white rounded-tr-none'
                                : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
                                }`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <div className={`flex items-center gap-1 mt-1 ${msg.senderId === currentUser.id ? 'justify-end text-purple-200' : 'text-zinc-500'}`}>
                                    <span className="text-[8px]">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {msg.senderId === currentUser.id && <CheckCheck size={10} />}
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
                            onClick={handleSendMessage}
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
                {myChats.map(chat => (
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
