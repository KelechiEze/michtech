import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  Copy, 
  Check, 
  Play, 
  MoreVertical,
  Search,
  Filter,
  X,
  Link as LinkIcon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLiveClasses, LiveClass } from '../../context/LiveClassContext';

interface LiveClassPageProps {
  role: 'teacher' | 'learner';
  onStartClass?: (classId: string) => void;
  onJoinClass?: (classId: string) => void;
}

export default function LiveClassPage({ role, onStartClass, onJoinClass }: LiveClassPageProps) {
  const { theme } = useTheme();
  const { classes, addClass, getClassByUrl } = useLiveClasses();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [joinLink, setJoinLink] = useState('');
  const [joinError, setJoinError] = useState<string | null>(null);

  // Form state for new class
  const [newClass, setNewClass] = useState({
    title: '',
    subject: 'Mathematics',
    date: '',
    startTime: '',
    endTime: '',
    duration: '45 mins'
  });

  const handleCreateClass = () => {
    if (!newClass.title || !newClass.date || !newClass.startTime || !newClass.endTime) return;

    const id = Date.now().toString();
    const createdClass: LiveClass = {
      id,
      title: newClass.title,
      subject: newClass.subject,
      teacher: 'Miss Sarah', // Assuming current user is teacher
      date: newClass.date,
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      duration: newClass.duration,
      status: 'upcoming',
      joinUrl: `https://michtec.edu/live/${id.slice(-6)}`
    };

    addClass(createdClass);
    setShowCreateModal(false);
    setNewClass({
      title: '',
      subject: 'Mathematics',
      date: '',
      startTime: '',
      endTime: '',
      duration: '45 mins'
    });
  };

  const handleJoinViaLink = () => {
    if (!joinLink.trim()) return;
    
    // In a real app, we'd fetch the class details from the link
    // For this demo, we'll check if it's a valid format or if it's a known link
    const existingClass = getClassByUrl(joinLink);
    
    if (existingClass) {
      onJoinClass?.(existingClass.id);
      setJoinLink('');
      setJoinError(null);
    } else {
      // Logic for "adding" a class that might not be in the mock list
      // For demo purposes, we'll simulate adding a new class if the link looks legit
      if (joinLink.startsWith('https://michtec.edu/live/')) {
        const id = joinLink.split('/').pop() || 'new';
        const externalClass: LiveClass = {
          id,
          title: 'External Live Session',
          subject: 'General Study',
          teacher: 'Guest Educator',
          date: new Date().toISOString().split('T')[0],
          startTime: 'Now',
          endTime: 'Later',
          duration: '60 mins',
          status: 'live',
          joinUrl: joinLink
        };
        addClass(externalClass);
        setJoinLink('');
        setJoinError(null);
      } else {
        setJoinError('Invalid class link. Please check and try again.');
      }
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredClasses = classes.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Live Classrooms
          </h2>
          <p className={`mt-1 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            {role === 'teacher' ? 'Manage and schedule your live interactive sessions.' : 'Join your scheduled live interactive lessons.'}
          </p>
        </div>

        {role === 'teacher' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-none font-bold text-sm shadow-lg shadow-blue-600/20 transition-all"
          >
            <Plus size={18} />
            Create Live Class
          </motion.button>
        )}
      </div>

      {/* Join via Link Section (Learner) */}
      {role === 'learner' && (
        <div className={`p-6 rounded-none border backdrop-blur-md ${
          theme === 'dark' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className={`w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0 ${
              theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <LinkIcon size={24} />
            </div>
            <div className="flex-1">
              <h3 className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                Join via Link
              </h3>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                Have a class link from your teacher? Paste it here to join instantly.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="text"
                placeholder="https://michtec.edu/live/..."
                value={joinLink}
                onChange={(e) => setJoinLink(e.target.value)}
                className={`flex-1 md:w-64 px-4 py-2 rounded-none text-sm outline-none border transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-200 text-slate-900 focus:border-blue-500'
                }`}
              />
              <button 
                onClick={handleJoinViaLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-none font-bold text-sm transition-all"
              >
                Join
              </button>
            </div>
          </div>
          {joinError && (
            <p className="mt-2 text-xs font-bold text-red-500 animate-shake">{joinError}</p>
          )}
        </div>
      )}

      {/* Filters & Search */}
      <div className={`p-4 rounded-none border backdrop-blur-md flex flex-col md:flex-row gap-4 items-center ${
        theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search classes or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-none text-sm outline-none transition-all ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                : 'bg-gray-50 border-gray-100 text-slate-900 focus:bg-white'
            } border`}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className={`flex items-center gap-2 px-4 py-3 rounded-none border text-xs font-bold uppercase tracking-widest transition-all ${
            theme === 'dark' ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white' : 'bg-white border-gray-100 text-slate-600 hover:bg-gray-50'
          }`}>
            <Filter size={16} />
            Filter
          </button>
          <button className={`flex items-center gap-2 px-4 py-3 rounded-none border text-xs font-bold uppercase tracking-widest transition-all ${
            theme === 'dark' ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white' : 'bg-white border-gray-100 text-slate-600 hover:bg-gray-50'
          }`}>
            <Calendar size={16} />
            This Week
          </button>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={`rounded-none border shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#1a1d23]/60 border-white/5' : 'bg-white border-gray-100'
            }`}
          >
            {/* Card Header */}
            <div className={`p-6 border-b flex justify-between items-start ${
              theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-gray-50 bg-gray-50/50'
            }`}>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-none border ${
                  cls.status === 'live' 
                    ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse' 
                    : theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                  {cls.status}
                </span>
                <h3 className={`mt-3 text-lg font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {cls.title}
                </h3>
                <p className="text-xs font-bold text-blue-500 mt-1 uppercase tracking-tighter">{cls.subject}</p>
              </div>
              <button className={`p-2 rounded-none transition-colors ${
                theme === 'dark' ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-600 hover:bg-gray-100'
              }`}>
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
                  theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-slate-500'
                }`}>
                  <User size={16} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Teacher</p>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{cls.teacher}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-slate-500'
                  }`}>
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Date</p>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{cls.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-slate-500'
                  }`}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Time</p>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{cls.startTime} - {cls.endTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className={`p-6 border-t flex gap-3 ${
              theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-gray-50 bg-gray-50/50'
            }`}>
              {role === 'teacher' ? (
                <>
                  <button
                    onClick={() => onStartClass?.(cls.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    <Play size={14} />
                    Start Class
                  </button>
                  <button
                    onClick={() => handleCopyLink(cls.joinUrl, cls.id)}
                    className={`px-4 py-3 rounded-none border font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                      copiedId === cls.id
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : theme === 'dark' ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white' : 'bg-white border-gray-100 text-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    {copiedId === cls.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === cls.id ? 'Copied' : 'Link'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onJoinClass?.(cls.id)}
                  disabled={cls.status === 'ended'}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all ${
                    cls.status === 'live'
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
                      : cls.status === 'upcoming'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                >
                  <Video size={14} />
                  {cls.status === 'live' ? 'Join Now' : cls.status === 'upcoming' ? 'Join Class' : 'Ended'}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Class Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg rounded-none border shadow-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-[#1a1d23] border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`p-6 border-b flex justify-between items-center ${
                theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Schedule Live Class
                </h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className={`p-2 rounded-none transition-colors ${
                    theme === 'dark' ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Class Title</label>
                  <input 
                    type="text"
                    placeholder="e.g., Advanced Algebra Session"
                    value={newClass.title}
                    onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                    className={`w-full px-4 py-3 rounded-none text-sm outline-none transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                        : 'bg-gray-50 border-gray-100 text-slate-900 focus:bg-white'
                    } border`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Subject</label>
                  <select 
                    value={newClass.subject}
                    onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                    className={`w-full px-4 py-3 rounded-none text-sm outline-none transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                        : 'bg-gray-50 border-gray-100 text-slate-900 focus:bg-white'
                    } border`}
                  >
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Art">Art</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Date</label>
                    <input 
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                      className={`w-full px-4 py-3 rounded-none text-sm outline-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                          : 'bg-gray-50 border-gray-100 text-slate-900 focus:bg-white'
                      } border`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Start Time</label>
                    <input 
                      type="time"
                      value={newClass.startTime}
                      onChange={(e) => setNewClass({...newClass, startTime: e.target.value})}
                      className={`w-full px-4 py-3 rounded-none text-sm outline-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                          : 'bg-gray-50 border-gray-100 text-slate-900 focus:bg-white'
                      } border`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>End Time</label>
                    <input 
                      type="time"
                      value={newClass.endTime}
                      onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                      className={`w-full px-4 py-3 rounded-none text-sm outline-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                          : 'bg-gray-50 border-gray-100 text-slate-900 focus:bg-white'
                      } border`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Duration</label>
                  <select 
                    value={newClass.duration}
                    onChange={(e) => setNewClass({...newClass, duration: e.target.value})}
                    className={`w-full px-4 py-3 rounded-none text-sm outline-none transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                        : 'bg-gray-50 border-gray-100 text-slate-900 focus:bg-white'
                    } border`}
                  >
                    <option>30 mins</option>
                    <option>45 mins</option>
                    <option>60 mins</option>
                    <option>90 mins</option>
                  </select>
                </div>
              </div>

              <div className={`p-6 border-t flex gap-4 ${
                theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateClass}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                >
                  Create Class
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
