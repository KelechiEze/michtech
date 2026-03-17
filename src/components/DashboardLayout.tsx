import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  LogOut, 
  Bell, 
  ChevronDown, 
  Plus, 
  Minus,
  GraduationCap,
  LucideIcon,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface SidebarItem {
  name: string;
  view: string;
  icon: LucideIcon;
  submenu?: { name: string; view: string }[];
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface DashboardLayoutProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  sidebarItems: SidebarItem[];
  notifications: Notification[];
  activeView: string;
  setActiveView: (view: any) => void;
  onLogout: () => void;
  children: React.ReactNode;
  expandedMenus: string[];
  setExpandedMenus: React.Dispatch<React.SetStateAction<string[]>>;
  onNotificationClick?: (notification: Notification) => void;
}

export default function DashboardLayout({
  user,
  sidebarItems,
  notifications,
  activeView,
  setActiveView,
  onLogout,
  children,
  expandedMenus,
  setExpandedMenus,
  onNotificationClick
}: DashboardLayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  return (
    <div className={`min-h-screen flex overflow-hidden font-sans transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0f1115] text-white' : 'bg-gray-50 text-slate-900'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] ${
          theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-400/10'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] ${
          theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-400/10'
        }`} />
      </div>

      {/* Sidebar */}
      <aside className={`w-72 backdrop-blur-xl border-r flex flex-col flex-shrink-0 z-20 relative transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-[#1a1d23]/80 border-white/5' 
          : 'bg-white border-gray-200 shadow-xl'
      }`}>
        <div className="p-8 flex flex-col items-center">
          <motion.div 
            whileHover={theme === 'dark' ? { scale: 1.05, rotateY: 10 } : {}}
            className={`w-24 h-24 rounded-none overflow-hidden border-2 mb-4 shadow-2xl relative group ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-100'
            }`}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {theme === 'dark' && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
              </div>
            )}
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xl font-semibold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            {user.name}
          </motion.h3>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className={`text-[10px] uppercase tracking-[0.2em] mt-1 font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}
          >
            {user.role}
          </motion.span>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto px-4 custom-scrollbar">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.li 
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.submenu ? (
                  <div className="space-y-1">
                    <button 
                      onClick={() => toggleMenu(item.name.toLowerCase())}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-none text-sm font-medium transition-all duration-300 ${
                        expandedMenus.includes(item.name.toLowerCase()) 
                          ? theme === 'dark' 
                            ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                            : 'bg-blue-600 text-white shadow-sm'
                          : theme === 'dark'
                            ? 'text-gray-400 hover:text-white hover:bg-white/5'
                            : 'text-slate-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-none ${
                          expandedMenus.includes(item.name.toLowerCase()) 
                            ? theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/20 text-white'
                            : theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
                        }`}>
                          <item.icon size={18} />
                        </div>
                        {item.name}
                      </div>
                      <motion.div
                        animate={{ rotate: expandedMenus.includes(item.name.toLowerCase()) ? 180 : 0 }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedMenus.includes(item.name.toLowerCase()) && (
                        <motion.ul 
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: 'auto', scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          className={`overflow-hidden space-y-1 ml-4 border-l pl-4 ${
                            theme === 'dark' ? 'border-white/5' : 'border-gray-200'
                          }`}
                        >
                          {item.submenu.map((sub) => (
                            <li key={sub.name}>
                              <button 
                                onClick={() => setActiveView(sub.view)}
                                className={`w-full text-left px-4 py-2 text-xs font-medium transition-all duration-200 rounded-none ${
                                  activeView === sub.view
                                    ? theme === 'dark' ? 'text-blue-400 bg-blue-400/5' : 'text-blue-700 bg-blue-50'
                                    : theme === 'dark' ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-slate-600 hover:bg-gray-50'
                                }`}
                              >
                                {sub.name}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button 
                    onClick={() => setActiveView(item.view)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-none text-sm font-medium transition-all duration-300 ${
                      activeView === item.view 
                        ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)]' 
                        : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`p-2 rounded-none ${activeView === item.view ? 'bg-white/20' : theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <item.icon size={18} />
                    </div>
                    {item.name}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className={`p-6 border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-none text-sm font-medium transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/5' : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <div className={`p-2 rounded-none ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
              <LogOut size={18} />
            </div>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Header */}
        <header className={`h-20 backdrop-blur-md border-b flex items-center justify-between px-8 z-40 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-12">
            <motion.div 
              whileHover={theme === 'dark' ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-none cursor-pointer shadow-lg shadow-blue-600/20"
              onClick={() => setActiveView('dashboard')}
            >
              <GraduationCap size={22} />
              <span className="font-bold text-sm tracking-tight">Michtec Academy</span>
            </motion.div>
            
            <nav className="hidden lg:flex items-center gap-8">
              {['Forum', 'Courses', 'Resources'].map(item => (
                <button 
                  key={item} 
                  className={`text-sm font-semibold transition-colors flex items-center gap-1.5 group ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item}
                  <ChevronDown size={14} className={theme === 'dark' ? "group-hover:translate-y-0.5 transition-transform" : ""} />
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all border ${
                theme === 'dark' 
                  ? 'bg-white/5 hover:bg-white/10 border-white/5 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-indigo-600'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2.5 rounded-xl transition-all relative border ${
                  theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10 border-white/5' 
                    : 'bg-gray-100 hover:bg-gray-200 border-gray-200'
                }`}
              >
                <Bell size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-slate-700'} />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-2 right-2 bg-red-500 w-2 h-2 rounded-none shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className={`absolute right-0 mt-4 w-96 border shadow-2xl rounded-none overflow-hidden z-[100] backdrop-blur-2xl ${
                      theme === 'dark' ? 'bg-[#1a1d23] border-white/10' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className={`p-5 border-b flex justify-between items-center ${
                      theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
                    }`}>
                      <h3 className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Notifications</h3>
                      <button className="text-[10px] text-blue-400 font-bold uppercase hover:text-blue-300 transition-colors">Mark all read</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {notifications.length > 0 ? notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          onClick={() => {
                            if (onNotificationClick) onNotificationClick(notification);
                            setShowNotifications(false);
                          }}
                          className={`p-5 border-b transition-all cursor-pointer group ${
                            theme === 'dark' 
                              ? `border-white/5 hover:bg-white/5 ${notification.unread ? 'bg-blue-500/5' : ''}` 
                              : `border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`text-sm font-semibold transition-colors ${
                              theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900'
                            }`}>{notification.title}</h4>
                            <span className="text-[10px] text-gray-500 font-medium">{notification.time}</span>
                          </div>
                          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>{notification.message}</p>
                        </div>
                      )) : (
                        <div className={`p-10 text-center italic text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-slate-600'}`}>No notifications yet</div>
                      )}
                    </div>
                    <div className={`p-4 text-center border-t ${
                      theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
                    }`}>
                      <button className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}>View All Notifications</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div 
              whileHover={theme === 'dark' ? { x: -5 } : {}}
              className={`flex items-center gap-4 pl-8 border-l cursor-pointer group ${
                theme === 'dark' ? 'border-white/5' : 'border-gray-200'
              }`}
              onClick={() => setActiveView('account')}
            >
              <div className="text-right hidden sm:block">
                <p className={`text-sm font-bold transition-colors ${
                  theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900'
                }`}>{user.name}</p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>{user.role}</p>
              </div>
              <div className={`w-10 h-10 rounded-none overflow-hidden border shadow-lg transition-colors ${
                theme === 'dark' ? 'border-white/10 group-hover:border-blue-500/50' : 'border-gray-200'
              }`}>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
    </div>
  );
}
