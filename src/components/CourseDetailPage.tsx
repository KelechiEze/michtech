import React from 'react';
import { motion } from 'motion/react';
import { Star, Clock, BookOpen, Users, Check, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface CourseDetailPageProps {
  course: any;
  onBack: () => void;
  onLoginClick: () => void;
}

export default function CourseDetailPage({ course, onBack, onLoginClick }: CourseDetailPageProps) {
  const { addToCart, cart } = useCart();
  const { theme } = useTheme();
  const isInCart = cart.some(item => item.id === course.id);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'}`}>
      {/* Hero Section */}
      <div className={`py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-slate-50 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className={`flex items-center gap-2 transition-colors mb-8 group ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#c5a070] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">Best Seller</span>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className={`text-sm font-bold ml-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.rating}</span>
                </div>
              </div>
              
              <h1 className={`text-4xl lg:text-5xl font-serif mb-6 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>{course.title}</h1>
              <p className={`text-lg mb-8 leading-relaxed max-w-xl ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-[#c5a070]" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-[#c5a070]" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#c5a070]" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{course.students} Students</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm line-through">{course.oldPrice}</span>
                  <span className="text-3xl font-bold text-[#c5a070]">{course.price}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(course)}
                  disabled={isInCart}
                  className={`px-10 py-4 text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all rounded-lg ${
                    isInCart 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-[#c5a070] text-white hover:bg-[#b38f5f] shadow-lg shadow-[#c5a070]/20'
                  }`}
                >
                  {isInCart ? <Check size={16} /> : <ShoppingCart size={16} />}
                  {isInCart ? 'In Cart' : 'Add to Cart'}
                </motion.button>
              </div>
            </div>
            
            <div className="relative">
              <div className={`aspect-video overflow-hidden shadow-2xl ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className={`absolute -bottom-6 -right-6 p-6 shadow-xl hidden lg:block ${
                theme === 'dark' ? 'bg-[#1e293b] border border-white/10' : 'bg-white border border-gray-100'
              }`}>
                <div className="flex items-center gap-4">
                  <img 
                    src={course.avatar} 
                    alt={course.instructor} 
                    className="w-12 h-12 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Instructor</p>
                    <p className={`font-serif ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>{course.instructor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className={`text-3xl font-serif mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {[
                  "Master the core concepts of the subject",
                  "Hands-on projects and practical exercises",
                  "Expert guidance from industry professionals",
                  "Lifetime access to course materials",
                  "Certificate of completion",
                  "Join a community of like-minded learners"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-1 p-1 ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item}</span>
                  </div>
                ))}
              </div>
              
              <h2 className={`text-3xl font-serif mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Course Content</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`p-6 flex justify-between items-center group cursor-pointer transition-colors border ${
                    theme === 'dark' 
                      ? 'border-white/5 hover:bg-white/5' 
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors ${
                        theme === 'dark'
                          ? 'bg-white/5 text-gray-500 group-hover:bg-[#c5a070] group-hover:text-white'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-[#c5a070] group-hover:text-white'
                      }`}>
                        0{i}
                      </div>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>Module {i}: Introduction to the Fundamentals</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">4 Lessons • 45m</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className={`p-8 border ${
                theme === 'dark' ? 'bg-[#1e293b] border-white/10' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className={`text-xl font-serif mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Ready to start?</h3>
                <p className={`text-sm mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Join thousands of students and start your learning journey today. Get instant access to all materials.
                </p>
                <button 
                  onClick={onLoginClick}
                  className="w-full bg-slate-800 text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-slate-700 transition-all rounded-lg"
                >
                  Enroll Now
                </button>
              </div>
              
              <div className={`p-8 border ${
                theme === 'dark' ? 'bg-[#c5a070]/10 border-[#c5a070]/20' : 'bg-[#c5a070]/5 border-[#c5a070]/10'
              }`}>
                <h3 className={`text-xl font-serif mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Need Help?</h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Have questions about this course? Our team is here to help you.
                </p>
                <button className="text-[#c5a070] text-xs font-bold tracking-widest uppercase hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
