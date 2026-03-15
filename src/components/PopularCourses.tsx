import React from 'react';
import { motion } from 'motion/react';
import { Users, MessageSquare } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Fun with Numbers: Math for Kids',
    instructor: 'Miss Sarah',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    students: 120,
    comments: 15,
    oldPrice: '£20.00',
    price: '£10.00',
  },
  {
    id: 2,
    title: 'Magic of Science: Experiments',
    instructor: 'Mr. James',
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?u=james',
    students: 85,
    comments: 8,
    oldPrice: '£25.00',
    price: '£15.00',
  },
  {
    id: 3,
    title: 'Story Time: English Reading',
    instructor: 'Mrs. Emily',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2074&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    students: 200,
    comments: 24,
    oldPrice: '£15.00',
    price: '£5.00',
  },
  {
    id: 4,
    title: 'Art & Colors: Creative Kids',
    instructor: 'Miss Lily',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?u=lily',
    students: 150,
    comments: 12,
    oldPrice: '£18.00',
    price: '£12.00',
  },
];

export default function PopularCourses() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-slate-800 mb-4">
            Popular <span className="text-[#c5a070]">Courses</span>
          </h2>
          <div className="flex justify-center items-center gap-1">
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className="w-12 h-0.5 bg-[#c5a070]"></div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Instructor Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1a1f2c] py-3 px-4 flex items-center gap-3">
                  <div className="relative -mt-10">
                    <img 
                      src={course.avatar} 
                      alt={course.instructor} 
                      className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-white text-xs font-medium tracking-wide">
                    {course.instructor}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col items-center text-center">
                <h3 className="text-lg font-serif text-slate-800 mb-6 leading-snug min-h-[3.5rem] flex items-center">
                  {course.title}
                </h3>
                
                <div className="w-full h-px bg-gray-100 mb-6"></div>

                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span className="text-xs font-semibold text-gray-400">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare size={14} />
                      <span className="text-xs font-semibold text-gray-400">{course.comments}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-300 line-through font-medium">
                      {course.oldPrice}
                    </span>
                    <span className="text-sm font-bold text-[#c5a070]">
                      {course.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
