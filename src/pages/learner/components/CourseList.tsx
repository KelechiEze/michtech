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
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium text-gray-800">Courses List</h1>
          <p className="text-sm text-gray-400">Browse through thousands of lessons in list view.</p>
        </div>
        <div className="flex bg-white border border-gray-200 rounded overflow-hidden shadow-sm">
          <button 
            onClick={onSwitchToGrid}
            className="p-2 text-gray-400 hover:bg-gray-50 border-r border-gray-200"
          >
            <LayoutGrid size={18} />
          </button>
          <button className="p-2 bg-gray-50 text-gray-800">
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ x: 5 }}
            onClick={() => onSelectCourse(course)}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex items-center p-4 gap-6 cursor-pointer group"
          >
            <div className={`w-24 h-24 ${course.color} rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}>
              <course.icon size={40} className={course.iconColor} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-[#42a5f5] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-400">By <span className="text-[#42a5f5] font-medium">{course.instructor}</span></p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < course.rating ? "text-[#ffa726] fill-[#ffa726]" : "text-gray-200"} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 line-clamp-1 mb-3">
                {course.excerpt}
              </p>
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
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

            <div className="px-6">
              <button className="bg-gray-50 text-gray-400 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#42a5f5] hover:text-white transition-all">
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
