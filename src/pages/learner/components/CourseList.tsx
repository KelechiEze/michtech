import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutGrid, 
  List as ListIcon, 
  Search, 
  Star, 
  Github, 
  Code2, 
  Box, 
  Globe, 
  Cloud, 
  CreditCard,
  LucideIcon,
  Clock,
  Users,
  Calculator,
  FlaskConical,
  BookOpen,
  Palette,
  Music,
  Heart
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

interface CourseListProps {
  onSelectCourse: (course: Course) => void;
  onSwitchToGrid: () => void;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Fun with Numbers',
    instructor: 'Miss Sarah',
    rating: 5,
    color: 'bg-[#42a5f5]',
    icon: Calculator,
    iconColor: 'text-white',
    excerpt: 'Learn to count, add, and subtract with fun games and colorful characters!'
  },
  {
    id: 2,
    title: 'Magic of Science',
    instructor: 'Mr. James',
    rating: 5,
    color: 'bg-[#66bb6a]',
    icon: FlaskConical,
    iconColor: 'text-white',
    excerpt: 'Explore the world around us with safe and exciting experiments for kids.'
  },
  {
    id: 3,
    title: 'Story Time: English',
    instructor: 'Mrs. Emily',
    rating: 4,
    color: 'bg-[#ffa726]',
    icon: BookOpen,
    iconColor: 'text-white',
    excerpt: 'Improve your reading and vocabulary with magical animated stories.'
  },
  {
    id: 4,
    title: 'Art & Colors',
    instructor: 'Miss Lily',
    rating: 5,
    color: 'bg-[#ec407a]',
    icon: Palette,
    iconColor: 'text-white',
    excerpt: 'Unleash your creativity with fun drawing and painting lessons.'
  },
  {
    id: 5,
    title: 'Musical Adventure',
    instructor: 'Mr. David',
    rating: 4,
    color: 'bg-[#9575cd]',
    icon: Music,
    iconColor: 'text-white',
    excerpt: 'Learn about rhythms, instruments, and sing along to your favorite songs.'
  },
  {
    id: 6,
    title: 'Healthy Habits',
    instructor: 'Coach Mike',
    rating: 5,
    color: 'bg-[#ef5350]',
    icon: Heart,
    iconColor: 'text-white',
    excerpt: 'Learn how to stay strong and healthy with fun exercises and food tips.'
  }
];

export default function CourseList({ onSelectCourse, onSwitchToGrid }: CourseListProps) {
  const { theme } = useTheme();
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Courses List</h1>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Browse through thousands of lessons in list view.</p>
        </div>
        <div className={`flex rounded-lg overflow-hidden shadow-sm border ${
          theme === 'dark' ? 'bg-[#1a1d23]/60 border-white/5' : 'bg-white border-gray-200'
        }`}>
          <button 
            onClick={onSwitchToGrid}
            className={`p-2 transition-colors border-r ${
              theme === 'dark' ? 'text-gray-400 hover:bg-white/5 border-white/5' : 'text-slate-400 hover:bg-gray-50 border-gray-200'
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button className={`p-2 transition-colors ${
            theme === 'dark' ? 'bg-white/5 text-white' : 'bg-gray-50 text-slate-900'
          }`}>
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={theme === 'dark' ? { x: 5 } : {}}
            onClick={() => onSelectCourse(course)}
            className={`rounded-none shadow-sm border overflow-hidden flex items-center p-4 gap-6 cursor-pointer group transition-colors ${
              theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5 hover:bg-[#1a1d23]/60' : 'bg-white border-gray-100 hover:bg-gray-50/50'
            }`}
          >
            <div className={`w-24 h-24 ${course.color} rounded-none flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}>
              <course.icon size={40} className={course.iconColor} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`text-lg font-bold transition-colors ${
                    theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {course.title}
                  </h3>
                  <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>By <span className="text-blue-400 font-bold">{course.instructor}</span></p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < course.rating ? "text-amber-400 fill-amber-400" : theme === 'dark' ? "text-white/10" : "text-gray-200"} 
                    />
                  ))}
                </div>
              </div>
              <p className={`text-sm line-clamp-1 mb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                {course.excerpt}
              </p>
              <div className={`flex items-center gap-6 text-[10px] font-black uppercase tracking-widest ${
                theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
              }`}>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  4 Hours
                </div>
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  30 Students
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  Beginner
                </div>
              </div>
            </div>

            <div className={`px-6`}>
              <button className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                theme === 'dark' 
                  ? 'bg-white/5 text-gray-400 border-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-600' 
                  : 'bg-gray-50 text-slate-500 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
              }`}>
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
