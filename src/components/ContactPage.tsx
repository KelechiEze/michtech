import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Globe, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Split Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        {/* Left Side: Contact Info */}
        <div className="bg-[#1a1f2c] p-12 lg:p-24 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a070]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="text-[#c5a070] text-xs font-bold tracking-[0.3em] uppercase mb-8 block">Get in Touch</span>
            <h1 className="text-6xl lg:text-8xl font-serif text-white mb-12 leading-tight">
              Let's Start a <span className="italic text-[#c5a070]">Conversation</span>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md mb-16">
              Have questions about our curriculum, enrollment, or events? Our team is here to help you every step of the way.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#c5a070] group-hover:bg-[#c5a070] group-hover:text-white transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Email Us</p>
                  <p className="text-xl font-light text-white">hello@michtecacademy.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#c5a070] group-hover:bg-[#c5a070] group-hover:text-white transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Call Us</p>
                  <p className="text-xl font-light text-white">+1 (234) 567-890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#c5a070] group-hover:bg-[#c5a070] group-hover:text-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Visit Us</p>
                  <p className="text-xl font-light text-white">123 Education St, Knowledge City</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="relative z-10 pt-20 flex gap-8">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-gray-500 hover:text-[#c5a070] transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-12 lg:p-24 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl"
          >
            <div className="mb-12">
              <h2 className="text-4xl font-serif text-slate-800 mb-4">Send a Message</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Subject</label>
                <select className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Enrollment Question</option>
                  <option>Event Information</option>
                  <option>Technical Support</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Your Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all h-40 resize-none"
                ></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#c5a070] text-white py-6 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#b38f5f] transition-all shadow-2xl"
              >
                Send Message
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[60vh] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 grayscale opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
            alt="Map placeholder" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-16 h-16 bg-[#c5a070] rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
              <MapPin size={32} />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white px-6 py-3 rounded-xl shadow-2xl whitespace-nowrap">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-800">Michtec Academy Main Campus</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Quick answers to common questions. If you don't find what you're looking for, feel free to reach out.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { q: "How do I enroll my child?", a: "Enrollment is simple! Just create an account, verify your credentials, and choose the courses that fit your child's needs." },
              { q: "Are the courses suitable for all ages?", a: "Our courses are specifically designed for primary school children, typically aged 5 to 11 years old." },
              { q: "Can I track my child's progress?", a: "Yes! Both parents and students have access to a detailed dashboard showing progress, scores, and achievements." },
              { q: "What if we need technical support?", a: "Our support team is available 24/7 via email and during school hours via phone to help with any technical issues." }
            ].map((faq, i) => (
              <div key={i} className="space-y-4 p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500 group">
                <h4 className="text-xl font-serif text-slate-800 group-hover:text-[#c5a070] transition-colors">{faq.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{faq.a}</p>
                <button className="flex items-center gap-2 text-[#c5a070] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
