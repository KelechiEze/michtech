import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutGrid, 
  List, 
  Search, 
  Star, 
  Github, 
  Code2, 
  Box, 
  Globe, 
  Cloud, 
  CreditCard,
  LucideIcon,
  Calculator,
  FlaskConical,
  BookOpen,
  Palette,
  Music,
  Heart,
  Plus
} from 'lucide-react';

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

interface CourseLibraryProps {
  onSelectCourse: (course: Course) => void;
  onSwitchToList?: () => void;
}

const categories = [
  { name: 'Math', count: '50+' },
  { name: 'Science', count: '30+', active: true },
  { name: 'English', count: '40+' },
  { name: 'Art', count: '60+' },
  { name: 'Music', count: '15+' },
  { name: 'PE', count: '25+' },
  { name: 'History', count: '35+' },
  { name: 'Free', count: '20+' },
];

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
  },
];

export default function CourseLibrary({ onSelectCourse, onSwitchToList }: CourseLibraryProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 pb-12">
      {/* Main Content */}
      <div className="flex-1">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Course <span className="text-blue-400">Library</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium">Browse through thousands of lessons curated for you.</p>
          </div>
          <div className="flex bg-[#1a1d23]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-1">
            <button className="p-3 bg-blue-600 text-white rounded-xl shadow-lg transition-all">
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={onSwitchToList}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <List size={20} />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12, rotateX: 2, rotateY: 2 }}
              onClick={() => onSelectCourse(course)}
              className="bg-[#1a1d23]/40 backdrop-blur-xl rounded-[2rem] border border-white/5 overflow-hidden flex flex-col cursor-pointer group shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
            >
              <div className={`h-52 ${course.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <course.icon size={80} className={`${course.iconColor} drop-shadow-2xl`} />
                </motion.div>
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={10} 
                        className={i < course.rating ? "text-yellow-400 fill-yellow-400" : "text-white/30"} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tight">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1 font-medium opacity-80">
                  {course.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                      <img 
                        src={`https://i.pravatar.cc/150?u=${course.instructor}`} 
                        alt={course.instructor} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{course.instructor}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Instructor</p>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-400 border border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all"
                  >
                    <Plus size={18} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 space-y-10">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400 mb-5">Search</h4>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Find a course..." 
              className="w-full bg-[#1a1d23]/40 backdrop-blur-xl border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400 mb-5">Categories</h4>
          <div className="bg-[#1a1d23]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.name} 
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                className={`flex justify-between items-center px-6 py-4 text-sm font-bold cursor-pointer transition-all border-b border-white/5 last:border-0 ${
                  cat.active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-1 rounded-lg ${cat.active ? 'bg-white/20' : 'bg-white/5 text-gray-500'}`}>{cat.count}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Price Range */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400 mb-5">Price Range</h4>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Min" 
              className="w-1/2 bg-[#1a1d23]/40 backdrop-blur-xl border border-white/5 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-blue-500/50 transition-all"
            />
            <input 
              type="text" 
              placeholder="Max" 
              className="w-1/2 bg-[#1a1d23]/40 backdrop-blur-xl border border-white/5 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-blue-500/50 transition-all"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-600 text-white p-3 rounded-xl shadow-lg hover:bg-blue-500 transition-colors"
            >
              <Search size={18} />
            </motion.button>
          </div>
        </motion.div>
      </aside>
    </div>
  );
}
