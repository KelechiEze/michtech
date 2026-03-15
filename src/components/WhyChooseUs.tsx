import React from 'react';
import { motion } from 'motion/react';

const stats = [
  {
    value: '500+',
    label: 'Fun lessons created for primary school kids',
  },
  {
    value: '98%',
    label: 'of parents say their children love learning with us',
  },
  {
    value: '10k',
    label: 'Happy little learners exploring every day',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif text-slate-800 mb-4">
            Why <span className="text-[#c5a070]">Choose Us</span>
          </h2>
          <div className="flex justify-center items-center gap-1">
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className="w-12 h-0.5 bg-[#c5a070]"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
          {/* Stats Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-6xl lg:text-7xl font-serif text-[#c5a070] block mb-4">
                  {stat.value}
                </span>
                <div className="w-16 h-px border-t border-dotted border-gray-300 mx-auto mb-6"></div>
                <p className="text-slate-800 text-sm lg:text-base leading-relaxed max-w-[200px] mx-auto">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Block */}
          <div className="w-full lg:w-1/3 relative flex justify-center lg:justify-end">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 bg-white p-10 lg:p-12 border border-gray-100 shadow-xl text-center max-w-sm flex flex-col items-center justify-center"
            >
              <h3 className="text-2xl font-serif text-slate-800 mb-6 leading-tight">
                Questions about studying with us?
              </h3>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                We have a team of student advisers & officers to answer any questions:
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#c5a070', color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#c5a070] text-[#c5a070] px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all"
              >
                Ask Us Now
              </motion.button>
            </motion.div>

            {/* Graduate Image - Positioned behind and to the right */}
            <div className="absolute -right-20 -bottom-24 lg:-right-32 lg:-bottom-24 w-[300px] lg:w-[400px] hidden md:block select-none pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Graduate" 
                className="w-full h-full object-contain opacity-20 grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
