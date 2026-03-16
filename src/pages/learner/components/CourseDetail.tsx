import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Clock, 
  Calendar, 
  User, 
  Users, 
  CheckCircle2, 
  Facebook, 
  Twitter, 
  ChevronDown,
  Play,
  ArrowLeft,
  LucideIcon,
  X
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  color: string;
  icon: LucideIcon;
  iconColor: string;
  excerpt: string;
}

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onStartCourse: () => void;
}

export default function CourseDetail({ course, onBack, onStartCourse }: CourseDetailProps) {
  const { theme } = useTheme();
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row gap-10 relative pb-12"
    >
      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className={`rounded-none shadow-[0_0_100px_rgba(0,0,0,0.5)] w-full max-w-5xl overflow-hidden border ${
                theme === 'dark' ? 'bg-[#1a1d23] border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`p-8 border-b flex justify-between items-center ${
                theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <div>
                  <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Course Preview: {course.title}</h3>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Introduction Video</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowVideoModal(false)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all shadow-xl ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400' : 'bg-white border-gray-200 text-slate-400 hover:text-red-500'
                  }`}
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              <div className="aspect-video bg-black relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/u0Vv_7U2p60" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="relative z-10"
                ></iframe>
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] pointer-events-none" />
              </div>

              <div className={`p-8 flex justify-end ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideoModal(false)}
                  className={`px-10 py-4 rounded-lg text-xs font-black uppercase tracking-widest transition-all border ${
                    theme === 'dark' ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' : 'bg-white text-slate-900 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Close Preview
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1">
        {/* Course Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-start gap-8 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-20 h-20 ${course.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-2xl border ${
              theme === 'dark' ? 'border-white/10' : 'border-black/5'
            }`}
          >
            <course.icon size={40} className={`${course.iconColor} drop-shadow-xl`} />
          </motion.div>
          <div>
            <h1 className={`text-5xl font-bold mb-3 tracking-tighter leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course.title}</h1>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < course.rating ? "text-amber-400 fill-amber-400" : theme === 'dark' ? "text-white/20" : "text-gray-200"} 
                  />
                ))}
              </div>
              <span className={`text-sm font-bold ml-2 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>({course.rating}.0 Rating)</span>
            </div>
          </div>
        </motion.div>

        {/* Video & Description */}
        <div className="flex flex-col xl:flex-row gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="xl:w-1/2"
          >
            <motion.div 
              whileHover={theme === 'dark' ? { scale: 1.02, rotateY: 2 } : {}}
              onClick={() => setShowVideoModal(true)}
              className={`relative aspect-video rounded-none overflow-hidden group cursor-pointer shadow-2xl border ${
                theme === 'dark' ? 'bg-[#1a1d23] border-white/5' : 'bg-gray-100 border-gray-200'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
                alt="Video Preview" 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] group-hover:bg-red-500 transition-all"
                >
                  <Play size={28} fill="currentColor" className="ml-1" />
                </motion.div>
              </div>
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-bold text-xs uppercase tracking-widest">
                Watch Course Trailer
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:w-1/2 space-y-6"
          >
            <p className={`text-lg leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
              Welcome to the most exciting learning adventure! This course is specially designed for primary school children to explore the wonders of {course.title.toLowerCase()} through fun games, colorful videos, and interactive stories.
            </p>
            <p className={`text-base leading-relaxed opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Our expert teachers use easy-to-understand language and engaging activities to make sure every child feels confident and happy while learning. Whether it's counting, reading, or science experiments, we make it feel like play!
            </p>
            <div className="flex gap-3 pt-4">
              <span className="bg-blue-600/10 text-blue-400 px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">New Course</span>
              <span className={`px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.2em] border ${
                theme === 'dark' ? 'bg-white/5 text-gray-500 border-white/5' : 'bg-gray-100 text-slate-500 border-gray-200'
              }`}>Primary School</span>
            </div>
          </motion.div>
        </div>

        {/* What you'll learn */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-blue-600 rounded-full" />
            <h2 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>What you'll learn</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { text: "Understand the basics of " + course.title.toLowerCase() + ".", color: "bg-blue-600" },
              { text: "Complete fun challenges and earn badges.", color: "bg-emerald-600" },
              { text: "Learn through colorful stories and animations.", color: "bg-purple-600" },
              { text: "Interactive quizzes with voice support.", color: "bg-orange-600" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={theme === 'dark' ? { x: 10, backgroundColor: "rgba(255,255,255,0.05)" } : { x: 10, backgroundColor: "rgba(0,0,0,0.02)" }}
                className={`flex items-center gap-5 p-6 backdrop-blur-xl border rounded-none transition-all group ${
                  theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-xl ${item.color} group-hover:scale-110 transition-transform`}>
                  <CheckCircle2 size={20} />
                </div>
                <span className={`text-sm font-bold transition-colors ${
                  theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
                }`}>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button 
          whileHover={{ x: -5 }}
          onClick={onBack}
          className={`mt-16 flex items-center gap-3 text-sm font-black uppercase tracking-widest transition-all ${
            theme === 'dark' ? 'text-gray-500 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
          }`}
        >
          <ArrowLeft size={18} />
          Back to Lessons
        </motion.button>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-10">
        {/* Course Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`backdrop-blur-xl border rounded-none shadow-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
          }`}
        >
          <div className={`px-8 py-6 border-b ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
            <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Lesson Info</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              {[
                { icon: Clock, text: "2 hrs Duration", color: "text-blue-400" },
                { icon: Calendar, text: "Term 1, 2026", color: "text-purple-400" },
                { icon: User, text: "Teacher: Miss Sarah", color: "text-emerald-400" },
                { icon: Users, text: "Class Size: 25 Kids", color: "text-orange-400" },
                { icon: CheckCircle2, text: "Enrolled: 18 Friends", color: "text-blue-400" }
              ].map((info, i) => (
                <div key={i} className={`flex items-center gap-4 text-xs font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
                  } ${info.color}`}>
                    <info.icon size={16} />
                  </div>
                  <span>{info.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartCourse}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-5 rounded-lg text-sm font-black uppercase tracking-widest hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all"
              >
                Start Learning
              </motion.button>
              <p className={`text-center text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                Join our fun classroom today!
              </p>
            </div>

            <div className={`pt-8 border-t flex justify-center gap-6 ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
              <motion.a whileHover={{ scale: 1.2, y: -2 }} href="#" className={`transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}>
                <Facebook size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, y: -2 }} href="#" className={`transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}>
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Instructor Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`backdrop-blur-xl border rounded-none shadow-2xl p-8 group ${
            theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
          }`}
        >
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
              <img 
                src="https://i.pravatar.cc/150?u=teacher" 
                alt="Miss Sarah" 
                className={`w-14 h-14 rounded-full border-2 relative z-10 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className={`text-base font-bold transition-colors ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>Miss Sarah</h4>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Primary Teacher</p>
            </div>
          </div>
          <p className={`text-sm leading-relaxed mb-6 font-medium opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            Miss Sarah loves teaching children and has over 10 years of experience in making learning fun and easy for everyone!
          </p>
          <div className="flex justify-center">
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={20} className="text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      </aside>
    </motion.div>
  );
}
