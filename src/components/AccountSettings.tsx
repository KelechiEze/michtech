import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save, 
  Shield, 
  Bell, 
  Globe,
  CheckCircle2
} from 'lucide-react';

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: 'Kelechi',
    lastName: 'Eze',
    email: 'kelechieze400@gmail.com',
    bio: 'Learner at Michtec Study Academy. Passionate about web development and UI/UX design.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    publicProfile: true
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Account <span className="text-indigo-400">Settings</span>
        </h1>
        <p className="text-gray-400 mt-2 font-medium">Manage your personal information, security preferences, and account visibility.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1d23]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 text-center shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <img 
                src="https://i.pravatar.cc/150?u=student" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-4 border-white/5 shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-2 right-2 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-indigo-500 transition-all z-20 border border-white/20"
              >
                <Camera size={20} />
              </motion.button>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{formData.firstName} {formData.lastName}</h3>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] mt-3">Learner Account</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1d23]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl"
          >
            {[
              { icon: User, label: 'Personal Info', active: true },
              { icon: Shield, label: 'Security' },
              { icon: Bell, label: 'Notifications' },
              { icon: Globe, label: 'Language' }
            ].map((item, i) => (
              <motion.button 
                key={item.label}
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                className={`w-full flex items-center gap-5 px-8 py-5 text-sm font-bold transition-all border-b border-white/5 last:border-0 ${
                  item.active ? 'bg-white/5 text-indigo-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={20} className={item.active ? 'text-indigo-400' : 'text-gray-500'} />
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1d23]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl"
            >
              <div className="px-10 py-6 border-b border-white/5 bg-white/5">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Personal Information</h2>
              </div>
              <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Bio</label>
                  <textarea 
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full h-40 bg-white/5 border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#1a1d23]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl"
            >
              <div className="px-10 py-6 border-b border-white/5 bg-white/5">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Security</h2>
              </div>
              <div className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Current Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-end items-center gap-6">
              <AnimatePresence>
                {isSaved && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 text-emerald-400 text-sm font-bold"
                  >
                    <CheckCircle2 size={20} />
                    Changes saved successfully!
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all flex items-center gap-3"
              >
                <Save size={18} />
                Save Changes
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
