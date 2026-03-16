import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  ChevronRight, 
  Search, 
  Plus, 
  MessageCircle, 
  LayoutDashboard, 
  BookOpen, 
  User, 
  LogOut, 
  Bell, 
  ChevronDown, 
  Trophy, 
  GraduationCap, 
  FileText,
  PlayCircle,
  Minus,
  LucideIcon
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

interface CourseForumsProps {
  onSelectThread: (topic: ForumTopic) => void;
}

const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: 'How to setup Github Webhooks with Node.js?',
    author: 'Adrian Demian',
    replies: 12,
    views: 156,
    lastActivity: '1 hr ago',
    category: 'Github Webhooks'
  },
  {
    id: 2,
    title: 'CSS Grid vs Flexbox: Which one to use?',
    author: 'Bill',
    replies: 8,
    views: 89,
    lastActivity: '2 hrs ago',
    category: 'CSS with LESS'
  },
  {
    id: 3,
    title: 'Vagrant setup on Windows 11',
    author: 'John. S',
    replies: 5,
    views: 45,
    lastActivity: '5 hrs ago',
    category: 'Vagrant Portable'
  }
];

export default function CourseForums({ onSelectThread }: CourseForumsProps) {
  const { theme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-blue-600 rounded-full" />
            <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'} tracking-tighter`}>Course Forums</h1>
          </div>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-500'} font-medium ml-4`}>Discuss and learn with fellow students.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all flex items-center gap-3 shadow-xl"
        >
          <Plus size={18} />
          New Topic
        </motion.button>
      </div>

      <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1d23]/40 border-white/5'} backdrop-blur-xl rounded-none border overflow-hidden shadow-2xl`}>
        <div className={`grid grid-cols-12 px-10 py-6 ${theme === 'light' ? 'bg-gray-50 border-b border-gray-200' : 'bg-white/5 border-b border-white/5'} text-[10px] font-black uppercase tracking-[0.2em] text-gray-500`}>
          <div className="col-span-7">Topic</div>
          <div className="col-span-2 text-center">Engagement</div>
          <div className="col-span-3 text-right">Last Activity</div>
        </div>
        
        <div className={`divide-y ${theme === 'light' ? 'divide-gray-100' : 'divide-white/5'}`}>
          {forumTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={theme === 'dark' ? { backgroundColor: 'rgba(255, 255, 255, 0.03)', x: 10 } : { x: 5 }}
              onClick={() => onSelectThread(topic)}
              className={`grid grid-cols-12 px-10 py-8 items-center cursor-pointer group transition-all ${theme === 'light' ? 'hover:bg-gray-50' : ''}`}
            >
              <div className="col-span-7 flex gap-6">
                <div className={`${theme === 'light' ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-white/5 border-white/5 text-gray-500'} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg border group-hover:rotate-12`}>
                  <MessageCircle size={24} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-800 group-hover:text-blue-600' : 'text-gray-200 group-hover:text-blue-400'} transition-colors mb-2 tracking-tight`}>
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} font-black uppercase tracking-widest`}>
                      Category: <span className="text-blue-500">{topic.category}</span>
                    </span>
                    <div className={`w-1 h-1 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'} rounded-full`} />
                    <span className={`text-[10px] ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} font-black uppercase tracking-widest`}>
                      By: <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>{topic.author}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 text-center">
                <div className="flex flex-col items-center">
                  <span className={`text-3xl font-black ${theme === 'light' ? 'text-black group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'} tracking-tighter transition-colors`}>{topic.replies}</span>
                  <p className={`text-[8px] ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} font-black uppercase tracking-[0.2em] mt-1`}>Replies</p>
                </div>
              </div>
              
              <div className="col-span-3 text-right">
                <div className={`flex items-center justify-end gap-2 text-[10px] ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'} font-black uppercase tracking-widest mb-2`}>
                  <Clock size={14} className="text-blue-500" />
                  {topic.lastActivity}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className={`text-[10px] ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} font-black uppercase tracking-widest`}>Active By:</span>
                  <span className={`text-[10px] ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} font-bold`}>{topic.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
