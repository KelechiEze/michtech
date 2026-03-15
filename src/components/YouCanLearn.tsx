import React from 'react';
import { motion } from 'motion/react';

const categories = [
  {
    title: 'Math Fun',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Science Magic',
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Story Reading',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2074&auto=format&fit=crop',
  },
  {
    title: 'Creative Art',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
  },
];

export default function YouCanLearn() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-slate-800 mb-4">
            You Can <span className="text-[#c5a070]">Learn</span>
          </h2>
          <div className="flex justify-center items-center gap-1">
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className="w-12 h-0.5 bg-[#c5a070]"></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-[300px] lg:h-[400px] overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 transition-colors duration-500 flex items-center justify-center">
                <h3 className="text-white text-3xl lg:text-4xl font-serif tracking-wide drop-shadow-lg">
                  {cat.title}
                </h3>
              </div>

              {/* Decorative Border on Hover */}
              <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
