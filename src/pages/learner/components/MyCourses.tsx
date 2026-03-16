import React from 'react';
import { motion } from 'motion/react';
import { 
  PlayCircle, 
  Clock, 
  CheckCircle2, 
  Github, 
  Code2, 
  Box, 
  Globe, 
  Cloud, 
  CreditCard,
  LucideIcon,
  Calculator,
  FlaskConical,
  BookOpen
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
  progress: number;
}

interface MyCoursesProps {
  onSelectCourse: (course: any) => void;
}

const myCourses: Course[] = [
  {
    id: 1,
    title: 'Fun with Numbers',
    instructor: 'Miss Sarah',
    rating: 5,
    color: 'bg-[#42a5f5]',
    icon: Calculator,
    iconColor: 'text-white',
    excerpt: 'Learn to count, add, and subtract with fun games and colorful characters!',
    progress: 75
  },
  {
    id: 2,
    title: 'Magic of Science',
    instructor: 'Mr. James',
    rating: 5,
    color: 'bg-[#66bb6a]',
    icon: FlaskConical,
    iconColor: 'text-white',
    excerpt: 'Explore the world around us with safe and exciting experiments for kids.',
    progress: 90
  },
  {
    id: 3,
    title: 'Story Time: English',
    instructor: 'Mrs. Emily',
    rating: 4,
    color: 'bg-[#ffa726]',
    icon: BookOpen,
    iconColor: 'text-white',
    excerpt: 'Improve your reading and vocabulary with magical animated stories.',
    progress: 45
  }
];

export default function MyCourses({ onSelectCourse }: MyCoursesProps) {
  const { theme } = useTheme();
  return (
    <div className="space-y-10 pb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className={`text-4xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          My <span className="text-emerald-400">Courses</span>
        </h1>
        <p className={`mt-2 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Manage and track your learning progress across all enrolled lessons.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {myCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={theme === 'dark' ? { y: -12, rotateX: 2, rotateY: 2 } : {}}
            onClick={() => onSelectCourse(course)}
            className={`backdrop-blur-xl rounded-none border overflow-hidden flex flex-col cursor-pointer group shadow-2xl transition-all duration-500 ${
              theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5 hover:shadow-emerald-500/10' : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            <div className={`h-44 ${course.color} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <course.icon size={64} className={`${course.iconColor} drop-shadow-2xl`} />
              </motion.div>
              <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                >
                  <PlayCircle size={64} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                </motion.div>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <h3 className={`text-xl font-bold mb-6 transition-colors tracking-tight ${
                theme === 'dark' ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
              }`}>
                {course.title}
              </h3>
              
              <div className="space-y-3 mb-8">
                <div className={`flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] ${
                  theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                }`}>
                  <span>Progress</span>
                  <span className="text-emerald-400">{course.progress}%</span>
                </div>
                <div className={`w-full h-2 rounded-none overflow-hidden border ${
                  theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-gray-200'
                }`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-none shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  />
                </div>
              </div>

              <div className={`flex items-center justify-between pt-6 border-t ${
                theme === 'dark' ? 'border-white/5' : 'border-gray-100'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-none flex items-center justify-center border ${
                    theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'
                  }`}>
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                  }`}>Active</span>
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
                >
                  Continue <PlayCircle size={12} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
