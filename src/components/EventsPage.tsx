import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight, Users, Ticket, Star } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Science Fair 2026',
    date: 'March 15, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Hall, Michtec Academy',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1564066391191-327336381e8e?q=80&w=2070&auto=format&fit=crop',
    description: 'A day of discovery and innovation where students showcase their scientific experiments and projects.'
  },
  {
    id: 2,
    title: 'Spring Music Concert',
    date: 'April 2, 2026',
    time: '6:00 PM - 8:00 PM',
    location: 'Academy Auditorium',
    category: 'Arts',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop',
    description: 'Join us for an evening of beautiful melodies performed by our talented young musicians and choir.'
  },
  {
    id: 3,
    title: 'Annual Sports Day',
    date: 'May 10, 2026',
    time: '9:00 AM - 3:00 PM',
    location: 'Academy Sports Field',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop',
    description: 'A day filled with fun, teamwork, and healthy competition across various athletic events.'
  },
  {
    id: 4,
    title: 'Parents Workshop: Digital Safety',
    date: 'May 25, 2026',
    time: '5:30 PM - 7:00 PM',
    location: 'Online Webinar',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    description: 'An informative session for parents on how to keep children safe and productive in the digital world.'
  }
];

export default function EventsPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#f9f8f6] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#c5a070]/5 rounded-l-[10rem]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#c5a070] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Join the Fun</span>
              <h1 className="text-6xl lg:text-8xl font-serif text-slate-800 mb-8 leading-tight">
                Upcoming <span className="italic text-[#c5a070]">Events</span> & Activities
              </h1>
              <p className="text-gray-500 text-lg font-light leading-relaxed max-w-xl">
                Stay updated with our school calendar. From academic fairs to sports days, there's always something exciting happening at Michtec.
              </p>
              <div className="mt-12 flex gap-6">
                <button className="bg-[#1a1f2c] text-white px-10 py-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                  View Calendar
                </button>
                <button className="border border-gray-200 px-10 py-5 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-800 hover:bg-white transition-all">
                  Past Events
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" 
                  alt="Students event" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Next Big Event</h4>
                    <p className="text-xs text-gray-400">Science Fair 2026</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Get ready for the biggest science fair of the year. Over 50 student projects!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                <div className="w-full lg:w-1/2 relative">
                  <div className="aspect-[16/10] rounded-[2rem] overflow-hidden shadow-xl group">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  {/* Floating Date Card */}
                  <div className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} bg-[#1a1f2c] text-white p-8 rounded-2xl shadow-2xl hidden md:block`}>
                    <div className="text-center">
                      <span className="text-3xl font-serif block mb-1">{event.date.split(' ')[1].replace(',', '')}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a070]">{event.date.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl lg:text-5xl font-serif text-slate-800 leading-tight">{event.title}</h3>
                    <p className="text-gray-500 text-lg font-light leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#c5a070]">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Time</p>
                        <p className="text-sm font-medium text-slate-800">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#c5a070]">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</p>
                        <p className="text-sm font-medium text-slate-800">{event.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex gap-6">
                    <button className="bg-[#c5a070] text-white px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#b38f5f] transition-all flex items-center gap-2 shadow-lg">
                      <Ticket size={16} />
                      Register Now
                    </button>
                    <button className="flex items-center gap-2 text-slate-800 hover:text-[#c5a070] transition-colors group">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Learn More</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-serif text-white mb-8 leading-tight">Don't Miss a <span className="italic text-[#c5a070]">Single</span> Moment</h2>
          <p className="text-gray-400 text-lg font-light mb-12 leading-relaxed">
            Subscribe to our newsletter and get notified about upcoming events, school news, and special announcements directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-[#c5a070] transition-all"
            />
            <button className="bg-[#c5a070] text-white px-12 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#b38f5f] transition-all shadow-2xl">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
