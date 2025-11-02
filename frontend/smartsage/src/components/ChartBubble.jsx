import { User, Bot } from 'lucide-react';

export default function ChatBubble({ message, isUser, timestamp }) {
    return (
        <div className={`flex gap-3 animate-[slideUp_0.4s_ease-out] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center${isUser
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : 'bg-slate-700 border border-slate-600'
                }`}>
                {isUser ? (
                    <User size={20} className="text-white" />
                ) : (
                    <Bot size={20} className="text-blue-400" />
                )}
            </div>

            <div className="flex flex-col gap-1 max-w-[85%]">
                <div className={`rounded-2xl px-5 py-3 shadow-lg ${isUser
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                        : 'bg-slate-700 text-slate-100 border border-slate-600 rounded-bl-md'
                    }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message}
                    </p>
                </div>

                {timestamp && (
                    <span className="text-xs text-slate-500 px-2">
                        {timestamp}
                    </span>
                )}
            </div>
        </div>
    );
}
