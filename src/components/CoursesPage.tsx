import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, BookOpen, Star, Clock, ArrowRight, GraduationCap } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Fun with Numbers',
    category: 'Mathematics',
    rating: 4.9,
    students: '1.2k',
    duration: '4 Weeks',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd48a5d5f?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-blue-50',
    accent: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Creative Writing',
    category: 'English',
    rating: 4.8,
    students: '850',
    duration: '6 Weeks',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop',
    color: 'bg-emerald-50',
    accent: 'text-emerald-600'
  },
  {
    id: 3,
    title: 'Science Explorers',
    category: 'Science',
    rating: 5.0,
    students: '2.1k',
    duration: '8 Weeks',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-amber-50',
    accent: 'text-amber-600'
  },
  {
    id: 4,
    title: 'World History',
    category: 'History',
    rating: 4.7,
    students: '600',
    duration: '5 Weeks',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop',
    color: 'bg-rose-50',
    accent: 'text-rose-600'
  },
  {
    id: 5,
    title: 'Digital Arts',
    category: 'Art',
    rating: 4.9,
    students: '1.5k',
    duration: '10 Weeks',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1974&auto=format&fit=crop',
    color: 'bg-violet-50',
    accent: 'text-violet-600'
  },
  {
    id: 6,
    title: 'Music Theory',
    category: 'Music',
    rating: 4.6,
    students: '400',
    duration: '4 Weeks',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-indigo-50',
    accent: 'text-indigo-600'
  },
  {
    id: 7,
    title: 'Advanced Algebra',
    category: 'Mathematics',
    rating: 4.9,
    students: '900',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-blue-50',
    accent: 'text-blue-600'
  },
  {
    id: 8,
    title: 'Biology Basics',
    category: 'Science',
    rating: 4.8,
    students: '1.1k',
    duration: '6 Weeks',
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-amber-50',
    accent: 'text-amber-600'
  },
  {
    id: 9,
    title: 'Modern Literature',
    category: 'English',
    rating: 4.7,
    students: '750',
    duration: '8 Weeks',
    image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-emerald-50',
    accent: 'text-emerald-600'
  }
];

interface CoursesPageProps {
  onNavigate?: (view: any) => void;
}

export default function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const displayedCourses = filteredCourses.slice(0, visibleCount);

  const handleLoadToggle = () => {
    if (visibleCount < filteredCourses.length) {
      setVisibleCount(filteredCourses.length);
    } else {
      setVisibleCount(6);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-[#1a1f2c]">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
            alt="Library" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1f2c]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[#c5a070] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Our Curriculum</span>
            <h1 className="text-6xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              Explore Our <span className="italic text-[#c5a070]">Magical</span> Courses
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
              Discover a world of knowledge designed specifically for young minds. From numbers to stars, we make every lesson an adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search for a course..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border-none px-12 py-4 rounded-none text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {['All Courses', 'Mathematics', 'Science', 'English', 'Art', 'History', 'Music'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`${
                    selectedCategory === cat 
                      ? 'bg-[#1a1f2c] text-white' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  } px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap`}
                >
                  {cat}
                </button>
              ))}
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#c5a070] transition-colors ml-4">
                <Filter size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-none mb-6">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`${course.color} ${course.accent} px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest shadow-sm`}>
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full bg-white text-slate-800 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      Enroll Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold text-slate-800">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{course.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-800 group-hover:text-[#c5a070] transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <BookOpen size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{course.students} Students Enrolled</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredCourses.length > 0 && (
            <div className="mt-20 text-center">
              <button 
                onClick={handleLoadToggle}
                className="border border-gray-200 px-12 py-5 text-xs font-bold tracking-widest text-slate-800 hover:bg-slate-50 transition-all uppercase rounded-full"
              >
                {visibleCount < filteredCourses.length ? 'Load More Courses' : 'Load Less Courses'}
              </button>
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="mt-20 text-center py-20 bg-gray-50 rounded-none">
              <GraduationCap size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-serif text-slate-800">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#c5a070] rounded-none p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6 leading-tight">Ready to Start Your <span className="italic">Journey?</span></h2>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Join Michtec Study Academy today and give your child the gift of interactive, fun, and effective education.
              </p>
            </div>
            <button 
              onClick={() => onNavigate?.('login')}
              className="bg-[#1a1f2c] text-white px-12 py-6 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl whitespace-nowrap"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
