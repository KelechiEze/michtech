import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 relative min-h-[450px] lg:min-h-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
              alt="Students studying"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Right Side: Content Blocks */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Block 1: Fun Learning Games */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-[#1a1f2c] text-white p-10 lg:p-20 flex flex-col justify-center flex-1"
          >
            <h2 className="text-3xl lg:text-4xl font-serif mb-6 leading-tight">Fun Learning Games</h2>
            <p className="text-gray-400 text-sm lg:text-base max-w-md mb-10 leading-relaxed font-light">
              Our interactive games make learning math and science feel like playing! Perfect for kids who love to explore.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#c5a070] text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase w-fit hover:bg-[#b38f5f] transition-all shadow-lg"
            >
              Start Playing
            </motion.button>
          </motion.div>

          {/* Block 2: Story Time: English */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white text-slate-800 p-10 lg:p-20 flex flex-col justify-center flex-1 border-b border-gray-100"
          >
            <h2 className="text-3xl lg:text-4xl font-serif mb-6 leading-tight">Story Time: English</h2>
            <p className="text-gray-500 text-sm lg:text-base max-w-md mb-10 leading-relaxed font-light">
              Dive into magical worlds with our animated storybooks that help children improve their reading and vocabulary.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#c5a070', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#c5a070] text-[#c5a070] px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase w-fit transition-all"
            >
              Read Stories
            </motion.button>
          </motion.div>

          {/* Block 3: Magic Science Lab */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white text-slate-800 p-10 lg:p-20 flex flex-col justify-center flex-1"
          >
            <h2 className="text-3xl lg:text-4xl font-serif mb-6 leading-tight">Magic Science Lab</h2>
            <p className="text-gray-500 text-sm lg:text-base max-w-md mb-10 leading-relaxed font-light">
              Discover the secrets of nature with our safe and fun virtual experiments designed for little scientists.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#c5a070', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#c5a070] text-[#c5a070] px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase w-fit transition-all"
            >
              Explore Lab
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
