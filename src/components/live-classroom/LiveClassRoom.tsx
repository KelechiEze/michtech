import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Hand, 
  MessageSquare, 
  Users, 
  LogOut, 
  Monitor, 
  Settings,
  MoreHorizontal,
  Shield,
  X,
  Check,
  Send,
  UserPlus,
  Volume2,
  VolumeX,
  Layout,
  Clock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Participant {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  handRaised: boolean;
  isSpeaking?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  isTeacher?: boolean;
}

interface LiveClassRoomProps {
  role: 'teacher' | 'student';
  classTitle: string;
  status?: 'upcoming' | 'live' | 'ended';
  startTime?: string;
  onLeave: () => void;
}

export default function LiveClassRoom({ role, classTitle, status = 'live', startTime = '10:00 AM', onLeave }: LiveClassRoomProps) {
  const { theme } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState<'chat' | 'participants' | null>(null);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // Mock participants
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 't1', name: 'Mr. James Wilson', role: 'teacher', avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1920', isMuted: false, isVideoOff: false, handRaised: false, isSpeaking: true },
    { id: 's1', name: 'Kelechi Eze', role: 'student', avatar: 'https://i.pravatar.cc/150?u=student', isMuted: true, isVideoOff: false, handRaised: false },
    { id: 's2', name: 'Sarah Miller', role: 'student', avatar: 'https://i.pravatar.cc/150?u=s2', isMuted: true, isVideoOff: true, handRaised: true },
    { id: 's3', name: 'Alex Johnson', role: 'student', avatar: 'https://i.pravatar.cc/150?u=s3', isMuted: false, isVideoOff: false, handRaised: false },
    { id: 's4', name: 'Emily Davis', role: 'student', avatar: 'https://i.pravatar.cc/150?u=s4', isMuted: true, isVideoOff: false, handRaised: false },
    { id: 's5', name: 'Michael Brown', role: 'student', avatar: 'https://i.pravatar.cc/150?u=s5', isMuted: true, isVideoOff: false, handRaised: false },
  ]);

  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', senderId: 't1', senderName: 'Mr. James Wilson', text: 'Welcome everyone! Today we are learning about fractions.', time: '10:01 AM', isTeacher: true },
    { id: 'm2', senderId: 's3', senderName: 'Alex Johnson', text: 'Good morning Mr. Wilson!', time: '10:02 AM' },
    { id: 'm3', senderId: 's2', senderName: 'Sarah Miller', text: 'I have a question about the homework.', time: '10:05 AM' },
  ]);

  const effectiveParticipants = participants.map(p => {
    const currentUserId = role === 'teacher' ? 't1' : 's1';
    if (p.id === currentUserId) {
      return { ...p, isMuted, isVideoOff, handRaised: isHandRaised };
    }
    return p;
  });

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: role === 'teacher' ? 't1' : 's1',
      senderName: role === 'teacher' ? 'Mr. James Wilson' : 'Kelechi Eze',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTeacher: role === 'teacher'
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const toggleHand = () => {
    setIsHandRaised(!isHandRaised);
    // In a real app, this would notify the teacher
  };

  const handleMuteStudent = (studentId: string) => {
    if (role !== 'teacher') return;
    setParticipants(prev => prev.map(p => 
      p.id === studentId ? { ...p, isMuted: !p.isMuted } : p
    ));
  };

  const handleRemoveStudent = (studentId: string) => {
    if (role !== 'teacher') return;
    setParticipants(prev => prev.filter(p => p.id !== studentId));
  };

  const handleAllowToSpeak = (studentId: string) => {
    if (role !== 'teacher') return;
    setParticipants(prev => prev.map(p => 
      p.id === studentId ? { ...p, isMuted: false, handRaised: false } : p
    ));
  };

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0a0c10]' : 'bg-gray-100'
    }`}>
      {/* Top Header / Status Bar */}
      <div className={`h-14 px-6 flex items-center justify-between border-b backdrop-blur-md z-50 ${
        theme === 'dark' ? 'bg-[#1a1d23]/80 border-white/5' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-widest animate-pulse">
            <div className="w-1.5 h-1.5 bg-white rounded-none" />
            Live
          </div>
          <h1 className={`text-sm font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {classTitle}
          </h1>
          <div className={`h-4 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
          <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
            Teacher: Mr. James Wilson
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-none border ${
            theme === 'dark' ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-50 border-gray-100 text-slate-600'
          }`}>
            <Users size={14} />
            <span className="text-xs font-bold">{effectiveParticipants.length}</span>
          </div>
          <div className={`text-xs font-mono font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            00:45:12
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {status === 'upcoming' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className={`w-24 h-24 rounded-none flex items-center justify-center border-2 border-dashed ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
            }`}>
              <Clock size={48} />
            </div>
            <div className="space-y-2">
              <h2 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Class Not Started Yet
              </h2>
              <p className={`max-w-md mx-auto text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                This class does not start until the appointed time: <span className="font-bold text-blue-500">{startTime}</span>. 
                Please wait for the teacher to start the session.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLeave}
              className={`px-8 py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all ${
                theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              Go Back
            </motion.button>
          </div>
        ) : (
          <>
            {/* Video Grid Section */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
              {/* Teacher View (Featured) */}
              <div className="flex-1 min-h-0 mb-4 relative group">
                <div className={`w-full h-full rounded-none border overflow-hidden relative shadow-2xl ${
                  theme === 'dark' ? 'bg-[#1a1d23] border-white/5' : 'bg-white border-gray-200'
                }`}>
                  {/* Teacher Video Logic */}
                  {effectiveParticipants.find(p => p.id === 't1')?.isVideoOff ? (
                    <div className={`w-full h-full flex flex-col items-center justify-center gap-4 ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                    }`}>
                      <div className={`w-32 h-32 rounded-none flex items-center justify-center text-4xl font-bold border ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-gray-200 border-gray-300 text-slate-400'
                      }`}>
                        T
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <VideoOff size={24} />
                        <span className="text-xs font-black uppercase tracking-widest">Camera Off</span>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={effectiveParticipants.find(p => p.id === 't1')?.avatar} 
                      alt="Teacher" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  {/* Overlay Info */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-none border border-white/10">
                    <div className="w-2 h-2 bg-blue-500 rounded-none animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Teacher: Mr. James Wilson</span>
                    {effectiveParticipants.find(p => p.id === 't1')?.isMuted ? (
                      <MicOff size={14} className="text-red-400" />
                    ) : (
                      <Volume2 size={14} className="text-white/60" />
                    )}
                  </div>

                  {/* Hand Raised Indicator for Teacher (if they were a student, but here it's the teacher) */}
                  {effectiveParticipants.find(p => p.id === 't1')?.handRaised && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black p-2 rounded-none shadow-lg animate-bounce z-20">
                      <Hand size={20} />
                    </div>
                  )}

              {/* Teacher Controls (Floating) */}
              {role === 'teacher' && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-blue-600 text-white p-2 rounded-none shadow-lg">
                    <Settings size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Student Grid (Horizontal Scroll or Multi-row) */}
          <div className="h-48 flex-shrink-0 overflow-x-auto overflow-y-hidden custom-scrollbar pb-2">
            <div className="flex gap-4 h-full">
              {effectiveParticipants.filter(p => p.role === 'student').map((student) => (
                <div 
                  key={student.id}
                  className={`w-64 h-full flex-shrink-0 rounded-none border overflow-hidden relative group transition-all duration-300 ${
                    student.handRaised ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent' : ''
                  } ${
                    theme === 'dark' ? 'bg-[#1a1d23] border-white/5' : 'bg-white border-gray-200 shadow-md'
                  }`}
                >
                  {student.isVideoOff ? (
                    <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                    }`}>
                      <div className={`w-16 h-16 rounded-none flex items-center justify-center text-xl font-bold border ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-gray-200 border-gray-300 text-slate-400'
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                      <VideoOff size={20} className="text-gray-500" />
                    </div>
                  ) : (
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Overlay Info */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/40 backdrop-blur-md px-2 py-1 rounded-none border border-white/10">
                    <span className="text-[10px] font-bold text-white truncate">{student.name}</span>
                    <div className="flex items-center gap-1">
                      {student.isMuted ? <MicOff size={10} className="text-red-400" /> : <Mic size={10} className="text-green-400" />}
                    </div>
                  </div>

                  {/* Hand Raised Icon */}
                  {student.handRaised && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black p-1 rounded-none shadow-lg animate-bounce">
                      <Hand size={14} />
                    </div>
                  )}

                  {/* Teacher Quick Actions */}
                  {role === 'teacher' && (
                    <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                      <button 
                        onClick={() => handleMuteStudent(student.id)}
                        className="p-2 bg-white text-blue-600 rounded-none hover:scale-110 transition-transform"
                        title={student.isMuted ? "Unmute" : "Mute"}
                      >
                        {student.isMuted ? <Mic size={18} /> : <MicOff size={18} />}
                      </button>
                      {student.handRaised && (
                        <button 
                          onClick={() => handleAllowToSpeak(student.id)}
                          className="p-2 bg-yellow-400 text-black rounded-none hover:scale-110 transition-transform"
                          title="Allow to speak"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleRemoveStudent(student.id)}
                        className="p-2 bg-red-600 text-white rounded-none hover:scale-110 transition-transform"
                        title="Remove"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Panels (Chat / Participants) */}
        <AnimatePresence>
          {activeSidebar && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className={`w-96 border-l flex flex-col z-40 ${
                theme === 'dark' ? 'bg-[#1a1d23] border-white/5' : 'bg-white border-gray-200 shadow-2xl'
              }`}
            >
              {/* Sidebar Header */}
              <div className={`p-4 border-b flex justify-between items-center ${
                theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {activeSidebar === 'chat' ? 'Class Chat' : 'Participants'}
                </h3>
                <button 
                  onClick={() => setActiveSidebar(null)}
                  className={`p-2 rounded-none transition-colors ${
                    theme === 'dark' ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {activeSidebar === 'chat' ? (
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col ${msg.senderId === (role === 'teacher' ? 't1' : 's1') ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${
                            msg.isTeacher ? 'text-blue-500' : theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                          }`}>
                            {msg.senderName}
                          </span>
                          <span className="text-[8px] text-gray-400">{msg.time}</span>
                        </div>
                        <div className={`max-w-[85%] p-3 rounded-none text-sm ${
                          msg.senderId === (role === 'teacher' ? 't1' : 's1')
                            ? 'bg-blue-600 text-white'
                            : theme === 'dark' ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-slate-700'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {effectiveParticipants.map((p) => (
                      <div key={p.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none overflow-hidden border border-white/10">
                            <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <p className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              {p.name}
                              {p.id === (role === 'teacher' ? 't1' : 's1') && <span className="ml-2 text-[8px] text-blue-500 uppercase">(You)</span>}
                            </p>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-gray-500">{p.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {p.handRaised && <Hand size={14} className="text-yellow-400" />}
                          {p.isMuted ? <MicOff size={14} className="text-red-400" /> : <Mic size={14} className="text-green-400" />}
                          {role === 'teacher' && p.role === 'student' && (
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded-none transition-all">
                              <MoreHorizontal size={14} className="text-gray-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Footer (Chat Input) */}
              {activeSidebar === 'chat' && (
                <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className={`flex-1 px-4 py-2 rounded-none text-xs outline-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' 
                          : 'bg-white border-gray-200 text-slate-900 focus:border-blue-500'
                      } border`}
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="bg-blue-600 text-white p-2 rounded-none hover:bg-blue-700 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
          </>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className={`h-20 px-8 flex items-center justify-between border-t backdrop-blur-xl z-50 ${
        theme === 'dark' ? 'bg-[#1a1d23]/90 border-white/5' : 'bg-white border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]'
      }`}>
        {/* Left Controls */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className={`flex flex-col items-center gap-1 p-2 rounded-none transition-all ${
              isMuted 
                ? 'bg-red-500/10 text-red-500' 
                : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            <span className="text-[8px] font-bold uppercase tracking-widest">{isMuted ? 'Unmute' : 'Mute'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`flex flex-col items-center gap-1 p-2 rounded-none transition-all ${
              isVideoOff 
                ? 'bg-red-500/10 text-red-500' 
                : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
            <span className="text-[8px] font-bold uppercase tracking-widest">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
          </motion.button>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-6">
          {role === 'teacher' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSharingScreen(!isSharingScreen)}
              className={`flex flex-col items-center gap-1 p-3 rounded-none transition-all ${
                isSharingScreen 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              <Monitor size={22} />
              <span className="text-[8px] font-bold uppercase tracking-widest">Share Screen</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleHand}
              className={`flex flex-col items-center gap-1 p-3 rounded-none transition-all ${
                isHandRaised 
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                  : theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              <Hand size={22} />
              <span className="text-[8px] font-bold uppercase tracking-widest">{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</span>
            </motion.button>
          )}

          <div className={`h-10 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSidebar(activeSidebar === 'chat' ? null : 'chat')}
              className={`flex flex-col items-center gap-1 p-2 rounded-none transition-all relative ${
                activeSidebar === 'chat' 
                  ? 'text-blue-500' 
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare size={20} />
              <span className="text-[8px] font-bold uppercase tracking-widest">Chat</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-none border-2 border-transparent" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSidebar(activeSidebar === 'participants' ? null : 'participants')}
              className={`flex flex-col items-center gap-1 p-2 rounded-none transition-all ${
                activeSidebar === 'participants' 
                  ? 'text-blue-500' 
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users size={20} />
              <span className="text-[8px] font-bold uppercase tracking-widest">People</span>
            </motion.button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-none transition-all ${
              theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            <Settings size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLeaveConfirm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-600/20"
          >
            <LogOut size={16} />
            {role === 'teacher' ? 'End Class' : 'Leave'}
          </motion.button>
        </div>
      </div>

      {/* Leave Confirmation Modal */}
      <AnimatePresence>
        {showLeaveConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLeaveConfirm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-sm rounded-none border shadow-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-[#1a1d23] border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-none flex items-center justify-center mx-auto mb-6">
                  <LogOut size={32} />
                </div>
                <h3 className={`text-xl font-bold tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {role === 'teacher' ? 'End this class?' : 'Leave this class?'}
                </h3>
                <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {role === 'teacher' 
                    ? 'This will end the session for all participants. You can still access the recording later.' 
                    : 'You can rejoin the session as long as it is still live.'}
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={onLeave}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-600/20"
                  >
                    {role === 'teacher' ? 'Yes, End Class' : 'Yes, Leave Class'}
                  </button>
                  <button 
                    onClick={() => setShowLeaveConfirm(false)}
                    className={`w-full py-3 rounded-none font-bold text-xs uppercase tracking-widest transition-all ${
                      theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-gray-100'
                    }`}
                  >
                    Stay in Class
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
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
