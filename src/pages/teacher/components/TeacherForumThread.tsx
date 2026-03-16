import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  ChevronRight, 
  Search, 
  Plus, 
  MessageCircle, 
  ArrowLeft,
  Send,
  LucideIcon,
  Reply
} from 'lucide-react';

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: string;
}

interface TeacherForumThreadProps {
  topic: ForumTopic;
  onBack: () => void;
}

interface ReplyItem {
  id: number;
  user: string;
  message: string;
  time: string;
  role: string;
  replyTo?: string;
}

const initialReplies: ReplyItem[] = [
  {
    id: 1,
    user: 'Miss Sarah',
    message: 'I have found that using visual aids like colorful blocks really helps the kids grasp the concept of addition much faster. What do you all think?',
    time: '30 mins ago',
    role: 'Teacher'
  },
  {
    id: 2,
    user: 'Mr. James',
    message: 'Absolutely! I also use a lot of storytelling. For example, "If we have 3 apples and we get 2 more, how many do we have?" It makes it more relatable.',
    time: '1 hr ago',
    role: 'Teacher'
  }
];

export default function TeacherForumThread({ topic, onBack }: TeacherForumThreadProps) {
  const { theme } = useTheme();
  const [replies, setReplies] = useState<ReplyItem[]>(initialReplies);
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState<ReplyItem | null>(null);

  const handlePostReply = () => {
    if (!newMessage.trim()) return;

    const newReply: ReplyItem = {
      id: Date.now(),
      user: 'Teacher Admin', // Mock current user
      message: newMessage,
      time: 'Just now',
      role: 'Teacher',
      replyTo: replyTo ? replyTo.user : undefined
    };

    setReplies([...replies, newReply]);
    setNewMessage('');
    setReplyTo(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-10 pb-12"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-all shadow-xl backdrop-blur-xl ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-400 hover:text-[#c5a070] hover:border-[#c5a070]' : 'bg-white border-gray-200 text-slate-400 hover:text-[#c5a070] hover:border-[#c5a070]'
            }`}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div>
            <h1 className={`text-3xl font-black tracking-tighter mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{topic.title}</h1>
            <div className="flex items-center gap-4">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                Category: <span className="text-[#c5a070]">{topic.category}</span>
              </span>
              <div className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                By: <span className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>{topic.author}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {replies.map((reply, i) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`backdrop-blur-xl rounded-none border overflow-hidden shadow-2xl group ${
                theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
              }`}
            >
              <div className="p-8 flex gap-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-[#c5a070] to-[#b38f5f] rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity" />
                    <img 
                      src={`https://i.pravatar.cc/150?u=${reply.user}`} 
                      alt={reply.user} 
                      className="w-16 h-16 rounded-lg relative border border-white/10 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-none ${
                    reply.role === 'Teacher' ? 'bg-[#c5a070]/20 text-[#c5a070] border border-[#c5a070]/20' : theme === 'dark' ? 'bg-white/5 text-gray-500 border border-white/5' : 'bg-gray-50 text-slate-500 border border-gray-100'
                  }`}>
                    {reply.role}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className={`flex justify-between items-center mb-6 border-b pb-4 ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold text-[#c5a070] hover:text-[#b38f5f] transition-colors cursor-pointer tracking-tight">{reply.user}</h4>
                      {reply.replyTo && (
                        <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-gray-600' : 'text-slate-500'}`}>
                          <Reply size={12} className={theme === 'dark' ? 'text-gray-700' : 'text-slate-400'} />
                          replied to <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}>{reply.replyTo}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-600' : 'text-slate-500'}`}>
                        <Clock size={14} className="text-[#c5a070]" />
                        {reply.time}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setReplyTo(reply);
                          document.getElementById('teacher-reply-textarea')?.focus();
                        }}
                        className="text-[10px] text-[#c5a070] font-black uppercase tracking-[0.2em] hover:text-[#b38f5f] transition-colors"
                      >
                        Reply
                      </motion.button>
                    </div>
                  </div>
                  <p className={`leading-relaxed text-base font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    {reply.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`backdrop-blur-2xl rounded-none border p-10 shadow-2xl relative overflow-hidden ${
          theme === 'dark' ? 'bg-[#1a1d23]/60 border-white/10' : 'bg-white border-gray-100'
        }`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a070]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#c5a070] rounded-full" />
            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
              {replyTo ? `Replying to ${replyTo.user}` : 'Post a Reply'}
            </h3>
          </div>
          {replyTo && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setReplyTo(null)}
              className="text-[10px] text-red-500 font-black uppercase tracking-[0.2em] hover:text-red-400 transition-colors"
            >
              Cancel Reply
            </motion.button>
          )}
        </div>
        
        <div className="space-y-6 relative z-10">
          <textarea 
            id="teacher-reply-textarea"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`w-full h-40 backdrop-blur-xl border rounded-none p-6 outline-none focus:ring-4 focus:ring-[#c5a070]/20 focus:border-[#c5a070]/50 transition-all resize-none text-base font-medium ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-200 placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-slate-900 placeholder-slate-400'
            }`}
            placeholder={replyTo ? `Write your reply to ${replyTo.user}...` : "Share your educational insights..."}
          ></textarea>
          <div className="flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePostReply}
              className="bg-gradient-to-r from-[#c5a070] to-[#b38f5f] text-white px-10 py-4 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(197,160,112,0.3)] transition-all flex items-center gap-3 shadow-xl"
            >
              <Send size={18} />
              Post Reply
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
