import React from 'react';
import { motion } from 'motion/react';
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

interface TeacherForumsProps {
  onSelectThread: (topic: ForumTopic) => void;
}

const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: 'Strategies for Teaching Basic Arithmetic to Grade 1',
    author: 'Miss Sarah',
    replies: 24,
    views: 312,
    lastActivity: '30 mins ago',
    category: 'Teaching Methods'
  },
  {
    id: 2,
    title: 'Best Educational Games for Science Lessons',
    author: 'Mr. James',
    replies: 15,
    views: 189,
    lastActivity: '2 hrs ago',
    category: 'Resources'
  },
  {
    id: 3,
    title: 'Handling Classroom Discipline in a Digital Environment',
    author: 'Mrs. Thompson',
    replies: 42,
    views: 567,
    lastActivity: '5 hrs ago',
    category: 'Classroom Management'
  },
  {
    id: 4,
    title: 'New Curriculum Updates for 2026',
    author: 'Admin',
    replies: 8,
    views: 124,
    lastActivity: '1 day ago',
    category: 'Announcements'
  }
];

export default function TeacherForums({ onSelectThread }: TeacherForumsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-[#c5a070] rounded-full" />
            <h1 className="text-4xl font-bold text-white tracking-tighter">Teachers Forum</h1>
          </div>
          <p className="text-sm text-gray-500 font-medium ml-4">Collaborate and share ideas with fellow educators.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#c5a070] to-[#b38f5f] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(197,160,112,0.3)] transition-all flex items-center gap-3 shadow-xl"
        >
          <Plus size={18} />
          New Discussion
        </motion.button>
      </div>

      <div className="bg-[#1a1d23]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-12 px-10 py-6 bg-white/5 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <div className="col-span-7">Discussion Topic</div>
          <div className="col-span-2 text-center">Engagement</div>
          <div className="col-span-3 text-right">Last Activity</div>
        </div>
        
        <div className="divide-y divide-white/5">
          {forumTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', x: 10 }}
              onClick={() => onSelectThread(topic)}
              className="grid grid-cols-12 px-10 py-8 items-center cursor-pointer group transition-all"
            >
              <div className="col-span-7 flex gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-[#c5a070] group-hover:text-white transition-all duration-500 shadow-lg border border-white/5 group-hover:rotate-12">
                  <MessageCircle size={24} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-200 group-hover:text-[#c5a070] transition-colors mb-2 tracking-tight">
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">
                      Category: <span className="text-[#c5a070]">{topic.category}</span>
                    </span>
                    <div className="w-1 h-1 bg-gray-700 rounded-full" />
                    <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">
                      By: <span className="text-gray-400">{topic.author}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-white tracking-tighter group-hover:text-[#c5a070] transition-colors">{topic.replies}</span>
                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1">Replies</p>
                </div>
              </div>
              
              <div className="col-span-3 text-right">
                <div className="flex items-center justify-end gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">
                  <Clock size={14} className="text-[#c5a070]" />
                  {topic.lastActivity}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Active By:</span>
                  <span className="text-[10px] text-gray-300 font-bold">{topic.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
