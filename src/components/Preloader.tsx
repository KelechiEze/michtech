import React from 'react';
import { motion } from 'motion/react';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1f2c]"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Hexagonal Orb Container */}
        <div className="relative w-32 h-32">
          {/* Hexagon Pieces */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-[#c5a070]/40 rounded-lg"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: [0, 90, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.3, 0.8, 0.3],
                x: [0, (i % 2 === 0 ? 20 : -20), 0],
                y: [0, (i < 3 ? 20 : -20), 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Inner Power Core */}
          <motion.div
            className="absolute inset-4 bg-gradient-to-br from-[#42a5f5] to-[#c5a070] rounded-full blur-xl opacity-50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Central Hexagon */}
          <motion.div
            className="absolute inset-8 bg-[#c5a070] flex items-center justify-center shadow-[0_0_30px_rgba(197,160,112,0.5)]"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="text-white font-bold text-2xl">M</span>
          </motion.div>
        </div>

        {/* Orbiting Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-full h-full border border-white/5 rounded-full"
            animate={{
              rotateZ: [0, 360],
              rotateX: [45, 45],
              rotateY: [i * 60, i * 60],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#42a5f5] rounded-full shadow-[0_0_10px_#42a5f5]"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Text Branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold tracking-[0.3em] text-white uppercase">
          Michtec<span className="text-[#c5a070]">h</span>
        </h1>
        <div className="w-12 h-1 bg-[#c5a070] mt-2 rounded-full" />
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mt-4 font-semibold">
          Powering Future Minds
        </p>
      </motion.div>
    </motion.div>
  );
}
