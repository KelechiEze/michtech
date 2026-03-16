import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight, Users, Sparkles, X, CheckCircle2, Ticket, Star } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Science Fair 2026',
    date: 'March 15, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Hall, Michtec Academy',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?q=80&w=2070&auto=format&fit=crop',
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

const pastEvents = [
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514525253361-bee871870472?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop'
];

interface EventsPageProps {
  onNavigate?: (view: any) => void;
  onEventClick?: (event: any) => void;
}

export default function EventsPage({ onNavigate, onEventClick }: EventsPageProps) {
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [selectedEventForReg, setSelectedEventForReg] = useState<any>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationSuccess(true);
    setTimeout(() => {
      setRegistrationSuccess(false);
      setShowRegisterForm(false);
      setSelectedEventForReg(null);
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-[#1a1f2c]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" 
            alt="Events Hero" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f2c] via-[#1a1f2c]/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[#c5a070] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Community & Growth</span>
            <h1 className="text-6xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              Where <span className="italic text-[#c5a070]">Moments</span> Become Memories
            </h1>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => setShowCalendar(true)}
                className="bg-[#c5a070] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#b38f5f] transition-all flex items-center gap-3 shadow-2xl"
              >
                <Calendar size={18} />
                View Calendar
              </button>
              <button 
                onClick={() => setShowPastEvents(!showPastEvents)}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Past Events
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area with Spin Transition */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!showPastEvents ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="py-24"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-4">Upcoming Events</h2>
                    <p className="text-gray-500 font-light">Don't miss out on our upcoming activities and workshops.</p>
                  </div>
                  <div className="hidden md:flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-slate-800 border border-gray-100 cursor-pointer hover:bg-[#c5a070] hover:text-white transition-all">
                      <ArrowRight size={20} className="rotate-180" />
                    </div>
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-slate-800 border border-gray-100 cursor-pointer hover:bg-[#c5a070] hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest shadow-sm">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[#c5a070]">
                            <Calendar size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{event.date}</span>
                          </div>
                          <h3 className="text-2xl font-serif text-slate-800 group-hover:text-[#c5a070] transition-colors">
                            {event.title}
                          </h3>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-gray-50">
                          <div className="flex items-center gap-3 text-gray-400">
                            <Clock size={16} />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-400">
                            <MapPin size={16} />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <button 
                            onClick={() => {
                              setSelectedEventForReg(event);
                              setShowRegisterForm(true);
                            }}
                            className="bg-[#1a1f2c] text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
                          >
                            Register Now
                          </button>
                          <button 
                            onClick={() => onEventClick?.(event)}
                            className="border border-gray-200 text-slate-800 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="py-24 bg-slate-900 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex justify-between items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-serif text-white mb-4">Memories Gallery</h2>
                  <p className="text-gray-400 font-light">A glimpse into our past celebrations and achievements.</p>
                </div>
                <button 
                  onClick={() => setShowPastEvents(false)}
                  className="text-[#c5a070] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
                >
                  <ArrowRight size={16} className="rotate-180" />
                  Back to Upcoming
                </button>
              </div>

              <div className="space-y-8">
                {/* Row 1: Left to Right */}
                <div className="flex gap-8 animate-scroll-right">
                  {[...pastEvents, ...pastEvents].map((img, i) => (
                    <div 
                      key={i} 
                      className="flex-shrink-0 w-80 h-60 overflow-hidden cursor-pointer group relative"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt="Past Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Sparkles className="text-white w-8 h-8" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 2: Right to Left */}
                <div className="flex gap-8 animate-scroll-left">
                  {[...pastEvents.slice().reverse(), ...pastEvents.slice().reverse()].map((img, i) => (
                    <div 
                      key={i} 
                      className="flex-shrink-0 w-80 h-60 overflow-hidden cursor-pointer group relative"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt="Past Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Sparkles className="text-white w-8 h-8" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-[#1a1f2c] p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" alt="Pattern" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-serif text-white mb-8 leading-tight">Never Miss an <span className="italic text-[#c5a070]">Update</span></h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
                Subscribe to our newsletter and be the first to know about new courses, upcoming events, and special announcements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-white/5 border border-white/10 px-8 py-5 text-white rounded-none focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                />
                <button className="bg-[#c5a070] text-white px-10 py-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b38f5f] transition-all whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <Users className="text-[#c5a070] w-10 h-10 mb-6" />
                <h4 className="text-white text-2xl font-serif mb-2">5,000+</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Active Members</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <Calendar className="text-[#c5a070] w-10 h-10 mb-6" />
                <h4 className="text-white text-2xl font-serif mb-2">150+</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Annual Events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-[#c5a070] transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white w-full max-w-4xl p-12 relative overflow-hidden"
            >
              <button 
                onClick={() => setShowCalendar(false)}
                className="absolute top-8 right-8 text-gray-400 hover:text-slate-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-12">
                <h2 className="text-4xl font-serif text-slate-800 mb-4">Event Calendar 2026</h2>
                <p className="text-gray-500">Mark your calendars for an exciting year ahead at Michtec Study Academy.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, i) => (
                  <div key={month} className="p-6 bg-gray-50 border border-gray-100">
                    <h4 className="text-lg font-serif text-slate-800 mb-4 border-b border-gray-200 pb-2">{month}</h4>
                    <div className="space-y-3">
                      {i === 0 && (
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-600 font-medium">Jan 15: Winter Gala</p>
                        </div>
                      )}
                      {i === 1 && (
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-600 font-medium">Feb 14: Charity Ball</p>
                        </div>
                      )}
                      {i === 2 && (
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-600 font-medium">Mar 25: Science Fair</p>
                        </div>
                      )}
                      {i === 3 && (
                        <>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                            <p className="text-xs text-gray-600 font-medium">Apr 12: Music Concert</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                            <p className="text-xs text-gray-600 font-medium">Apr 20: Workshop</p>
                          </div>
                        </>
                      )}
                      {i === 4 && (
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-600 font-medium">May 10: Sports Day</p>
                        </div>
                      )}
                      {i === 5 && (
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-600 font-medium">Jun 20: Summer Camp</p>
                        </div>
                      )}
                      {i === 9 && (
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-600 font-medium">Oct 31: Fall Festival</p>
                        </div>
                      )}
                      {i === 11 && (
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#c5a070] rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-600 font-medium">Dec 15: Holiday Party</p>
                        </div>
                      )}
                      {![0, 1, 2, 3, 4, 5, 9, 11].includes(i) && (
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">No events scheduled</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showRegisterForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white w-full max-w-lg p-12 relative"
            >
              <button 
                onClick={() => setShowRegisterForm(false)}
                className="absolute top-8 right-8 text-gray-400 hover:text-slate-800 transition-colors"
              >
                <X size={24} />
              </button>

              {registrationSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-8 rounded-full">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-serif text-slate-800 mb-4">Registration Successful!</h2>
                  <p className="text-gray-500">Your student has been registered for {selectedEventForReg?.title}. We'll send more details to your email.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-serif text-slate-800 mb-2">Event Registration</h2>
                    <p className="text-gray-500 text-sm">Register your student for {selectedEventForReg?.title}</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Student Name</label>
                      <input type="text" required className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Student ID / Grade</label>
                      <input type="text" required className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" placeholder="e.g. Grade 5 - MS123" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Parent Email</label>
                      <input type="email" required className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" placeholder="your@email.com" />
                    </div>
                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-[#c5a070] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b38f5f] transition-all"
                      >
                        Confirm Registration
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
