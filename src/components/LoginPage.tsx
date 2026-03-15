import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ArrowRight, User, BookOpen, ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle, Mail, Calendar, Hash } from 'lucide-react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
  onBack: () => void;
}

type AuthView = 'login' | 'request-access' | 'forgot-password';

// Mock School Database for Verification
const schoolDatabase = {
  learners: [
    { id: 'STU001', name: 'Kelechi Eze', dob: '2015-05-15' },
    { id: 'STU002', name: 'Jane Doe', dob: '2016-08-20' }
  ],
  teachers: [
    { id: 'EMP001', name: 'Sarah Smith', dob: '1985-03-10' },
    { id: 'EMP002', name: 'James Wilson', dob: '1990-11-25' }
  ]
};

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [view, setView] = useState<AuthView>('login');
  const [role, setRole] = useState<UserRole>('learner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Request Access State
  const [fullName, setFullName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [dob, setDob] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verification Logic
    const database = role === 'learner' ? schoolDatabase.learners : schoolDatabase.teachers;
    const match = database.find(u => 
      u.id.toLowerCase() === schoolId.toLowerCase() && 
      u.name.toLowerCase() === fullName.toLowerCase() && 
      u.dob === dob
    );

    if (match) {
      setRequestStatus('success');
    } else {
      setRequestStatus('error');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotStatus('success');
  };

  const resetForms = () => {
    setView('login');
    setRequestStatus('idle');
    setForgotStatus('idle');
    setFullName('');
    setSchoolId('');
    setDob('');
    setForgotEmail('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side: Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1a1f2c] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
            alt="Learning" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-transparent to-[#c5a070]/20"></div>
        </div>
        
        <div className="relative z-10 p-20 flex flex-col justify-between h-full w-full">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onBack}
          >
            <GraduationCap className="w-12 h-12 text-[#c5a070]" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-tight">Michtec<span className="text-[#c5a070]">Study</span></span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">Academy</span>
            </div>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-serif text-white mb-8 leading-tight">
              Unlock Your <span className="text-[#c5a070]">Potential</span> with Interactive Learning.
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Join thousands of students and teachers in our modern digital classroom. Experience education like never before.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-white">10k+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Active Students</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-white">500+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Expert Teachers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
        {/* Mobile Logo */}
        <div 
          className="lg:hidden absolute top-8 left-8 flex items-center gap-2 cursor-pointer"
          onClick={onBack}
        >
          <GraduationCap className="w-8 h-8 text-[#c5a070]" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-800 leading-tight">Michtec<span className="text-[#c5a070]">Study</span></span>
            <span className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">Academy</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-12">
                  <h2 className="text-4xl font-serif text-slate-800 mb-4">Welcome Back</h2>
                  <p className="text-gray-500 font-light">Please enter your details to sign in to your account.</p>
                </div>

                {/* Role Selector */}
                <div className="flex p-1 bg-gray-100 rounded-xl mb-10">
                  <button
                    onClick={() => setRole('learner')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                      role === 'learner' ? 'bg-white text-[#c5a070] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <BookOpen size={16} />
                    Learner
                  </button>
                  <button
                    onClick={() => setRole('teacher')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                      role === 'teacher' ? 'bg-white text-[#c5a070] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <ShieldCheck size={16} />
                    Teacher
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                      />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Password</label>
                      <button 
                        type="button"
                        onClick={() => setView('forgot-password')}
                        className="text-[10px] uppercase tracking-widest font-bold text-[#c5a070] hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 ml-1">
                    <input type="checkbox" id="remember" className="rounded border-gray-300 text-[#c5a070] focus:ring-[#c5a070]" />
                    <label htmlFor="remember" className="text-xs text-gray-500">Remember me for 30 days</label>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#1a1f2c] text-white py-5 rounded-xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Sign In to Dashboard
                    <ArrowRight size={16} />
                  </motion.button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Don't have an account? <button onClick={() => setView('request-access')} className="text-[#c5a070] font-bold hover:underline">Request Access</button>
                </p>
              </motion.div>
            ) : view === 'request-access' ? (
              <motion.div 
                key="request"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  onClick={resetForms}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#c5a070] transition-colors mb-8"
                >
                  <ArrowLeft size={14} />
                  Back to Login
                </button>

                <div className="mb-10">
                  <h2 className="text-4xl font-serif text-slate-800 mb-4">Request Access</h2>
                  <p className="text-gray-500 font-light">Verify your school credentials to activate your account.</p>
                </div>

                {requestStatus === 'success' ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900">Access Granted!</h3>
                    <p className="text-emerald-700 text-sm leading-relaxed">
                      Your credentials have been verified. Your account is now active. You can now sign in using your school email.
                    </p>
                    <button 
                      onClick={resetForms}
                      className="w-full bg-emerald-600 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all"
                    >
                      Go to Login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRequestAccess} className="space-y-6">
                    {/* Role Selector */}
                    <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                      <button
                        type="button"
                        onClick={() => setRole('learner')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                          role === 'learner' ? 'bg-white text-[#c5a070] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        Learner
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('teacher')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                          role === 'teacher' ? 'bg-white text-[#c5a070] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        Teacher
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="As registered in school"
                          className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                        {role === 'learner' ? 'Admission Number' : 'Employee ID'}
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          value={schoolId}
                          onChange={(e) => setSchoolId(e.target.value)}
                          placeholder={role === 'learner' ? 'e.g. STU001' : 'e.g. EMP001'}
                          className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                        />
                        <Hash className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Date of Birth</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          required
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                      </div>
                    </div>

                    {requestStatus === 'error' && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs">
                        <AlertCircle size={16} />
                        Credentials not found in our records. Please contact school admin.
                      </div>
                    )}

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-[#c5a070] text-white py-5 rounded-xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-[#b38f5f] transition-all shadow-lg"
                    >
                      Verify Credentials
                      <ArrowRight size={16} />
                    </motion.button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  onClick={resetForms}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#c5a070] transition-colors mb-8"
                >
                  <ArrowLeft size={14} />
                  Back to Login
                </button>

                <div className="mb-10">
                  <h2 className="text-4xl font-serif text-slate-800 mb-4">Forgot Password</h2>
                  <p className="text-gray-500 font-light">Enter your email to request a password reset from administration.</p>
                </div>

                {forgotStatus === 'success' ? (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">Request Sent</h3>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      A complaint message has been sent to the administrative department. Your password will be sent to your email after verification.
                    </p>
                    <button 
                      onClick={resetForms}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-all"
                    >
                      Return to Login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                      <div className="relative">
                        <input 
                          type="email" 
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-[#c5a070] outline-none transition-all"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-[#1a1f2c] text-white py-5 rounded-xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg"
                    >
                      Next
                      <ArrowRight size={16} />
                    </motion.button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
