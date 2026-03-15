import React from 'react';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: any) => void;
  onLogin?: () => void;
}

export default function Footer({ onNavigate, onLogin }: FooterProps) {
  return (
    <footer className="bg-[#1a1f2c] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-10 h-10 text-[#c5a070]" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-tight">Michtec<span className="text-[#c5a070]">Study</span></span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">Academy</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Making learning fun and magical for primary school children everywhere. Join our community of little explorers!
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#c5a070] transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-[#c5a070] transition-colors">Our Courses</button></li>
              <li><button onClick={() => onNavigate?.('events')} className="hover:text-[#c5a070] transition-colors">Upcoming Events</button></li>
              <li><button onClick={() => onLogin?.()} className="hover:text-[#c5a070] transition-colors">Student Dashboard</button></li>
              <li><button onClick={() => onNavigate?.('contact')} className="hover:text-[#c5a070] transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="text-lg font-serif mb-6">Programmes</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button className="hover:text-[#c5a070] transition-colors">International Studies</button></li>
              <li><button className="hover:text-[#c5a070] transition-colors">Academic Excellence</button></li>
              <li><button className="hover:text-[#c5a070] transition-colors">University Research</button></li>
              <li><button className="hover:text-[#c5a070] transition-colors">Online Learning</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">Subscribe to get the latest news and updates.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-[#c5a070] outline-none"
              />
              <button className="bg-[#c5a070] text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#b38f5f] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest font-semibold">
          <p>© 2026 Michtec Study Academy. All Rights Reserved.</p>
          <div className="flex gap-8">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
