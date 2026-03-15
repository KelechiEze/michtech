import React, { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'HOME', view: 'landing' },
  { name: 'COURSES', view: 'courses' },
  { name: 'EVENTS', view: 'events' },
  { name: 'CONTACT', view: 'contact' },
];

interface NavbarProps {
  onHomeClick?: () => void;
  onGetStartedClick?: () => void;
  onNavigate?: (view: any) => void;
  activeView?: string;
}

export default function Navbar({ onHomeClick, onGetStartedClick, onNavigate, activeView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onHomeClick}
          >
            <div className="flex flex-col items-center">
              <GraduationCap className="w-8 h-8 text-slate-800" />
              <div className="w-8 h-1 bg-[#c5a070] mt-0.5"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800 leading-tight">Michtec<span className="text-[#c5a070]">Study</span></span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">Academy</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => {
                  if (link.view === 'landing' && onHomeClick) {
                    onHomeClick();
                  } else if (onNavigate) {
                    onNavigate(link.view);
                  }
                }}
                className={`text-xs font-bold tracking-widest transition-colors ${
                  activeView === link.view ? 'text-[#c5a070]' : 'text-slate-800 hover:text-[#c5a070]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={onGetStartedClick}
              className="border border-gray-300 px-6 py-3 text-xs font-bold tracking-widest text-slate-800 hover:bg-slate-50 transition-all uppercase"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  className={`block w-full text-left px-3 py-4 text-sm font-bold tracking-widest ${
                    activeView === link.view ? 'text-[#c5a070]' : 'text-slate-800'
                  }`}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (link.view === 'landing' && onHomeClick) {
                      onHomeClick();
                    } else if (onNavigate) {
                      onNavigate(link.view);
                    }
                  }}
                >
                  {link.name}
                </button>
              ))}
              <div className="px-3 pt-4">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    if (onGetStartedClick) onGetStartedClick();
                  }}
                  className="w-full border border-gray-300 px-6 py-4 text-xs font-bold tracking-widest text-slate-800 uppercase"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
