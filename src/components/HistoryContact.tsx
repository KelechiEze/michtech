import React from 'react';
import { motion } from 'motion/react';

const history = [
  {
    year: '2017',
    text: 'Released the Arctic Collection the Perennial Collection of handknotted luxury area rugs.',
  },
  {
    year: '2016',
    text: 'Installed our first custom floorcovering for a museum at the Aga Khan Museum in Toronto',
  },
  {
    year: '2015',
    text: 'Designed our first wallcovering for all these healthcare sector at the Toronto Centre',
  },
  {
    year: '2014',
    text: 'Released the Arctic Collection the Perennial Collection of handknotted luxury area rugs.',
  },
];

export default function HistoryContact() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
          alt="Students" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/85"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Our History */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-start gap-6 mb-12">
              <div className="w-1 h-16 bg-gray-500 mt-2"></div>
              <h2 className="text-4xl font-serif text-white">Our History</h2>
            </div>
            
            <div className="space-y-8">
              {history.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <span className="text-gray-400 text-sm font-bold tracking-widest transition-colors group-hover:text-[#c5a070]">
                    {item.year}
                  </span>
                  <p className="text-white text-sm leading-relaxed font-light max-w-md">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">
                Still not convinced? <span className="text-[#c5a070] underline underline-offset-8 decoration-gray-500">We can help you!</span>
              </h2>
              <p className="text-gray-400 text-sm font-light">
                Fill out the form below and we will contact you.
              </p>
            </div>

            <form className="border border-white/20 p-1 flex flex-col md:flex-row items-stretch">
              <div className="flex-1 border-b md:border-b-0 md:border-r border-white/20 px-6 py-4 flex items-center">
                <span className="text-white text-sm font-medium mr-4">Name:</span>
                <input 
                  type="text" 
                  className="bg-transparent border-none text-white text-sm outline-none w-full"
                />
              </div>
              <div className="flex-1 border-b md:border-b-0 md:border-r border-white/20 px-6 py-4 flex items-center">
                <span className="text-white text-sm font-medium mr-4">E-mail:</span>
                <input 
                  type="email" 
                  className="bg-transparent border-none text-white text-sm outline-none w-full"
                />
              </div>
              <button className="bg-transparent text-white px-8 py-6 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-slate-900 transition-all">
                Get Advice
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
