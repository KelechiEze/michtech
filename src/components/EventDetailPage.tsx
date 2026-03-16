import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowLeft, Users, Star, CheckCircle2, Share2, Bookmark, X } from 'lucide-react';

interface EventDetailPageProps {
  event: any;
  onBack: () => void;
}

export default function EventDetailPage({ event, onBack }: EventDetailPageProps) {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  if (!event) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationSuccess(true);
    setTimeout(() => {
      setRegistrationSuccess(false);
      setShowRegisterForm(false);
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end pb-12 overflow-hidden bg-[#1a1f2c]">
        <div className="absolute inset-0">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2c] via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8 group transition-colors"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Events</span>
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#c5a070] text-white px-4 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest">
                {event.category}
              </span>
              <div className="flex items-center gap-2 text-white/60">
                <Calendar size={14} />
                <span className="text-xs font-medium uppercase tracking-wider">{event.date}</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif text-white mb-4 leading-tight">
              {event.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif text-slate-800">About This Event</h2>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  {event.description}
                </p>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  Join us for an unforgettable experience at Michtec Study Academy. This event is carefully designed to provide 
                  both educational value and community engagement. Participants will have the opportunity to interact with 
                  experts, peers, and mentors in a supportive and inspiring environment.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50 border border-gray-100">
                  <h3 className="text-xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                    <Users className="text-[#c5a070]" size={24} />
                    Who Should Attend?
                  </h3>
                  <ul className="space-y-4">
                    {['Students of all grades', 'Parents and guardians', 'Education enthusiasts', 'Community members'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-500 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 bg-gray-50 border border-gray-100">
                  <h3 className="text-xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                    <Star className="text-[#c5a070]" size={24} />
                    What to Expect
                  </h3>
                  <ul className="space-y-4">
                    {['Interactive sessions', 'Networking opportunities', 'Refreshments provided', 'Certificate of participation'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-500 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-serif text-slate-800">Event Schedule</h2>
                <div className="space-y-4">
                  {[
                    { time: '09:00 AM', activity: 'Registration & Welcome Coffee' },
                    { time: '10:00 AM', activity: 'Opening Ceremony & Keynote' },
                    { time: '11:30 AM', activity: 'Morning Workshops & Sessions' },
                    { time: '01:00 PM', activity: 'Networking Lunch' },
                    { time: '02:30 PM', activity: 'Afternoon Activities' },
                    { time: '04:00 PM', activity: 'Closing Remarks' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 border-b border-gray-50">
                      <span className="text-[#c5a070] font-bold text-sm w-24">{item.time}</span>
                      <span className="text-slate-800 font-medium">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white border border-gray-100 shadow-xl p-8 sticky top-32">
                <h3 className="text-2xl font-serif text-slate-800 mb-8">Event Details</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Time</p>
                      <p className="text-slate-800 font-medium">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</p>
                      <p className="text-slate-800 font-medium">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => setShowRegisterForm(true)}
                    className="w-full bg-[#c5a070] text-white py-5 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-[#b38f5f] transition-all shadow-lg"
                  >
                    Register Now
                  </button>
                  <div className="flex gap-4">
                    <button className="flex-1 border border-gray-100 py-4 flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 transition-all">
                      <Share2 size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Share</span>
                    </button>
                    <button className="flex-1 border border-gray-100 py-4 flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 transition-all">
                      <Bookmark size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Save</span>
                    </button>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50">
                  <p className="text-xs text-gray-400 text-center">
                    Limited spots available. Register early to secure your place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <p className="text-gray-500">Your student has been registered for {event.title}. We'll send more details to your email.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-serif text-slate-800 mb-2">Event Registration</h2>
                    <p className="text-gray-500 text-sm">Register your student for {event.title}</p>
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
    </div>
  );
}
