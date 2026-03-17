import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  User, 
  Plus, 
  GraduationCap, 
  FileText,
  Clock,
  PlayCircle,
  Users,
  BarChart3,
  CheckCircle2,
  X,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import DashboardLayout, { SidebarItem } from '../../components/DashboardLayout';
import TeacherForums from './components/TeacherForums';
import TeacherForumThread from './components/TeacherForumThread';
import { useTheme } from '../../context/ThemeContext';

// Mock data for teachers
const studentProgress = [
  { name: 'Kelechi Eze', course: 'Fun with Numbers', progress: 75, status: 'Learning', avatar: 'https://i.pravatar.cc/150?u=student1' },
  { name: 'Bill Gates', course: 'Magic of Science', progress: 90, status: 'Learning', avatar: 'https://i.pravatar.cc/150?u=student2' },
  { name: 'Sarah Connor', course: 'Story Time: English', progress: 45, status: 'Learning', avatar: 'https://i.pravatar.cc/150?u=student3' },
  { name: 'John Doe', course: 'Art & Colors', progress: 100, status: 'Completed', avatar: 'https://i.pravatar.cc/150?u=student4' },
];

const teacherStats = [
  { label: 'Total Students', value: '124', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Active Courses', value: '6', icon: BookOpen, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Avg. Progress', value: '68%', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Quizzes Published', value: '12', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-50' },
];

interface TeacherDashboardProps {
  onLogout: () => void;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface NewLesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
}

interface NewChapter {
  id: string;
  title: string;
  description: string;
  lessons: NewLesson[];
}

export default function TeacherDashboardPage({ onLogout }: TeacherDashboardProps) {
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<'dashboard' | 'create-course' | 'student-progress' | 'create-quiz' | 'profile' | 'my-courses' | 'student-detail' | 'teacher-forums' | 'teacher-forum-thread'>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['courses']);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedThread, setSelectedThread] = useState<any>(null);

  // Quiz Builder State
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    { id: '1', text: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  // Course Builder State
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('Math');
  const [courseChapters, setCourseChapters] = useState<NewChapter[]>([
    { id: '1', title: '', description: '', lessons: [{ id: '1', title: '', videoUrl: '', duration: '5:00 min' }] }
  ]);

  const user = {
    name: 'Miss Sarah',
    role: 'Primary Educator',
    avatar: 'https://i.pravatar.cc/150?u=teacher'
  };

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
    { 
      name: 'Course Management', 
      view: 'my-courses', 
      icon: BookOpen,
      submenu: [
        { name: 'My Courses', view: 'my-courses' },
        { name: 'Create Course', view: 'create-course' },
        { name: 'Student Progress', view: 'student-progress' },
        { name: 'Create Quiz', view: 'create-quiz' },
      ]
    },
    { name: 'Teachers Forum', view: 'teacher-forums', icon: MessageSquare },
    { name: 'Teacher Profile', view: 'profile', icon: User }
  ];

  const notifications = [
    { id: 1, title: 'New Enrollment', message: 'John Doe enrolled in "Art & Colors"', time: '10 mins ago', unread: true },
    { id: 2, title: 'Quiz Submission', message: 'Kelechi Eze finished "Math Fun Quiz"', time: '1 hour ago', unread: true },
    { id: 3, title: 'Course Feedback', message: 'New comment on "Magic of Science"', time: '3 hours ago', unread: false },
  ];

  const handlePublish = (type: 'quiz' | 'course') => {
    setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} published successfully!`);
    setTimeout(() => setSuccessMessage(null), 3000);
    setActiveView('dashboard');
    
    // Reset states
    if (type === 'quiz') {
      setQuizTitle('');
      setQuizDescription('');
      setQuizQuestions([{ id: '1', text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    } else {
      setCourseTitle('');
      setCourseDescription('');
      setCourseChapters([{ id: '1', title: '', description: '', lessons: [{ id: '1', title: '', videoUrl: '', duration: '5:00 min' }] }]);
    }
  };

  const addQuizQuestion = () => {
    setQuizQuestions([...quizQuestions, { 
      id: Date.now().toString(), 
      text: '', 
      options: ['', '', '', ''], 
      correctAnswer: 0 
    }]);
  };

  const updateQuizQuestion = (id: string, field: string, value: any) => {
    setQuizQuestions(quizQuestions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateQuizOption = (qId: string, optIndex: number, value: string) => {
    setQuizQuestions(quizQuestions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const removeQuizQuestion = (id: string) => {
    if (quizQuestions.length > 1) {
      setQuizQuestions(quizQuestions.filter(q => q.id !== id));
    }
  };

  const addChapter = () => {
    setCourseChapters([...courseChapters, {
      id: Date.now().toString(),
      title: '',
      description: '',
      lessons: [{ id: Date.now().toString() + '-1', title: '', videoUrl: '', duration: '5:00 min' }]
    }]);
  };

  const addLesson = (chapterId: string) => {
    setCourseChapters(courseChapters.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lessons: [...ch.lessons, { id: Date.now().toString(), title: '', videoUrl: '', duration: '5:00 min' }]
        };
      }
      return ch;
    }));
  };

  const updateChapter = (id: string, field: string, value: string) => {
    setCourseChapters(courseChapters.map(ch => ch.id === id ? { ...ch, [field]: value } : ch));
  };

  const updateLesson = (chapterId: string, lessonId: string, field: string, value: string) => {
    setCourseChapters(courseChapters.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lessons: ch.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      }
      return ch;
    }));
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.title.includes('Enrollment')) {
      setActiveView('student-progress');
    } else if (notification.title.includes('Quiz')) {
      setActiveView('student-progress');
    } else if (notification.title.includes('Feedback')) {
      setActiveView('my-courses');
    }
  };

  return (
    <DashboardLayout
      user={user}
      sidebarItems={sidebarItems}
      notifications={notifications}
      activeView={activeView}
      setActiveView={(view) => {
        if (view === 'teacher-forum-thread' && !selectedThread) return;
        if (view === 'student-detail' && !selectedStudent) return;
        setActiveView(view);
      }}
      onLogout={onLogout}
      expandedMenus={expandedMenus}
      setExpandedMenus={setExpandedMenus}
      onNotificationClick={handleNotificationClick}
    >
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-none flex items-center gap-3 border ${
            theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
          }`}
        >
          <CheckCircle2 size={20} />
          {successMessage}
        </motion.div>
      )}

      {activeView === 'dashboard' && (
        <div className="space-y-10 pb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div>
              <h2 className={`text-4xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Teacher <span className="text-indigo-400">Overview</span>
              </h2>
              <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Manage your students and courses with ease.</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('create-course')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all"
              >
                <Plus size={18} />
                New Course
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teacherStats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={theme === 'dark' ? { y: -10, rotateX: 5, rotateY: 5 } : {}}
                className={`backdrop-blur-xl p-8 rounded-none border shadow-2xl relative overflow-hidden group cursor-default transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-[#1a1d23]/60 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-blue-500 opacity-5 blur-2xl -mr-8 -mt-8 group-hover:opacity-10 transition-opacity`} />
                <div className={`w-14 h-14 rounded-none flex items-center justify-center mb-6 border transition-colors ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 group-hover:border-blue-500/50' : 'bg-gray-50 border-gray-100 group-hover:border-blue-400'
                }`}>
                  <stat.icon size={28} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                </div>
                <p className={`text-[10px] uppercase tracking-[0.2em] font-black mb-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                }`}>{stat.label}</p>
                <p className={`text-3xl font-bold tracking-tighter ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Student Progress Table */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`lg:col-span-2 backdrop-blur-xl rounded-none border shadow-2xl overflow-hidden transition-colors duration-500 ${
                theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
              }`}
            >
              <div className={`p-8 border-b flex justify-between items-center ${
                theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className={`text-xl font-bold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Student Progress</h3>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView('student-progress')} 
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  View Full Report
                </motion.button>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-[10px] uppercase tracking-widest font-black ${
                      theme === 'dark' ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-slate-500'
                    }`}>
                      <th className="px-8 py-5">Student</th>
                      <th className="px-8 py-5">Course</th>
                      <th className="px-8 py-5">Progress</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    theme === 'dark' ? 'divide-white/5' : 'divide-gray-100'
                  }`}>
                    {studentProgress.map((student, i) => (
                      <motion.tr 
                        key={i} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.05) }}
                        className={`transition-colors group ${
                          theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-none overflow-hidden border transition-colors ${
                              theme === 'dark' ? 'border-white/10 group-hover:border-blue-500/50' : 'border-gray-200 group-hover:border-blue-400'
                            }`}>
                              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                            </div>
                            <span className={`text-sm font-bold transition-colors ${
                              theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                            }`}>{student.name}</span>
                          </div>
                        </td>
                        <td className={`px-8 py-6 text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                        }`}>{student.course}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`flex-1 h-2 rounded-none overflow-hidden min-w-[100px] border ${
                              theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-gray-200'
                            }`}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${student.progress}%` }}
                                transition={{ duration: 1, delay: 0.7 + (i * 0.1) }}
                                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-none"
                              />
                            </div>
                            <span className={`text-xs font-black ${
                              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            }`}>{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] px-3 py-1.5 rounded-none uppercase font-black border ${
                            student.status === 'Completed' 
                              ? (theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100')
                              : (theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100')
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <motion.button 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedStudent(student);
                              setActiveView('student-detail');
                            }}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                              theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 border-white/5' : 'bg-gray-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border-gray-100'
                            }`}
                          >
                            <BarChart3 size={18} />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quick Actions / Recent Activity */}
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`backdrop-blur-xl rounded-none border shadow-2xl p-8 ${
                  theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <h3 className={`text-xl font-bold tracking-tight mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quick Actions</h3>
                <div className="grid grid-cols-1 gap-5">
                  {[
                    { label: 'Create New Quiz', sub: 'Add a fun test', icon: FileText, view: 'create-quiz' },
                    { label: 'Build Course', sub: 'New learning path', icon: BookOpen, view: 'create-course' },
                  ].map((action, i) => (
                    <motion.button 
                      key={i}
                      whileHover={theme === 'dark' ? { x: 10, scale: 1.02 } : { scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveView(action.view as any)}
                      className={`flex items-center gap-5 p-5 rounded-lg transition-all text-left group border ${
                        theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform border ${
                        theme === 'dark' ? 'bg-[#1a1d23] text-blue-400 border-white/5' : 'bg-white text-blue-600 border-gray-100'
                      }`}>
                        <action.icon size={24} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold transition-colors ${
                          theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                        }`}>{action.label}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                          theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                        }`}>{action.sub}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-none shadow-2xl p-8 text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-none -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">Teacher Tip</h3>
                  <p className="text-blue-100 text-sm leading-relaxed font-medium opacity-90">
                    Interactive quizzes increase student engagement by up to 40%. Try adding a voice-enabled quiz to your next lesson!
                  </p>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group"
                  >
                    Learn More <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'create-course' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-10 pb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-blue-600 rounded-none" />
              <h2 className="text-4xl font-bold text-white tracking-tighter">Create New Course</h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveView('dashboard')} 
              className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all shadow-xl ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400' : 'bg-white border-gray-200 text-slate-400 hover:text-red-500'
              }`}
            >
              <X size={24} />
            </motion.button>
          </div>

          <div className={`backdrop-blur-xl rounded-none border p-10 space-y-10 shadow-2xl ${
            theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className={`text-[10px] uppercase tracking-[0.2em] font-black ml-2 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Course Title</label>
                <input 
                  type="text" 
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. Fun with Fractions"
                  className={`w-full border px-6 py-5 rounded-none outline-none transition-all shadow-inner ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500/50' : 'bg-gray-50 border-gray-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                />
              </div>
              <div className="space-y-3">
                <label className={`text-[10px] uppercase tracking-[0.2em] font-black ml-2 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Category</label>
                <div className="relative">
                  <select 
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className={`w-full border px-6 py-5 rounded-none outline-none transition-all appearance-none cursor-pointer shadow-inner ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500/50' : 'bg-gray-50 border-gray-200 text-slate-900 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  >
                    <option className={theme === 'dark' ? 'bg-[#1a1d23]' : 'bg-white'}>Math</option>
                    <option className={theme === 'dark' ? 'bg-[#1a1d23]' : 'bg-white'}>Science</option>
                    <option className={theme === 'dark' ? 'bg-[#1a1d23]' : 'bg-white'}>English</option>
                    <option className={theme === 'dark' ? 'bg-[#1a1d23]' : 'bg-white'}>Art</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className={`text-[10px] uppercase tracking-[0.2em] font-black ml-2 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>Description</label>
              <textarea 
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="What will students learn?"
                className={`w-full border px-6 py-5 rounded-none outline-none transition-all h-40 resize-none shadow-inner ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500/50' : 'bg-gray-50 border-gray-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20'
                }`}
              ></textarea>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-purple-500 rounded-none" />
                  <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Course Content</h3>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addChapter}
                  className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2 hover:text-blue-300 transition-colors"
                >
                  <Plus size={16} /> Add Chapter
                </motion.button>
              </div>

              <div className="space-y-8">
                {courseChapters.map((chapter, chIndex) => (
                  <motion.div 
                    key={chapter.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-8 rounded-none border space-y-8 relative group ${
                      theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="absolute -left-3 top-8 w-1.5 h-12 bg-blue-500 rounded-none shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    
                    <div className="flex justify-between items-start gap-6">
                      <div className="flex-1 space-y-4">
                        <input 
                          type="text"
                          value={chapter.title}
                          onChange={(e) => updateChapter(chapter.id, 'title', e.target.value)}
                          placeholder={`Chapter ${chIndex + 1} Title`}
                          className={`w-full bg-transparent border-b px-0 py-2 text-xl font-bold outline-none transition-all ${
                            theme === 'dark' ? 'border-white/10 text-white focus:border-blue-500' : 'border-gray-200 text-slate-900 focus:border-blue-600'
                          }`}
                        />
                        <input 
                          type="text"
                          value={chapter.description}
                          onChange={(e) => updateChapter(chapter.id, 'description', e.target.value)}
                          placeholder="Short description of this chapter"
                          className={`w-full bg-transparent border-none px-0 py-1 text-sm outline-none focus:ring-0 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <PlayCircle size={14} className="text-blue-400" />
                        <p className={`text-[10px] uppercase tracking-[0.2em] font-black ${theme === 'dark' ? 'text-gray-600' : 'text-slate-500'}`}>Lessons</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {chapter.lessons.map((lesson, lIndex) => (
                          <motion.div 
                            key={lesson.id} 
                            whileHover={{ scale: 1.01, backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
                            className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-none border shadow-xl group/lesson ${
                              theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-white border-gray-100'
                            }`}
                          >
                            <div className="space-y-1">
                              <label className={`text-[8px] uppercase font-black tracking-widest ${theme === 'dark' ? 'text-gray-600' : 'text-slate-500'}`}>Title</label>
                              <input 
                                type="text"
                                value={lesson.title}
                                onChange={(e) => updateLesson(chapter.id, lesson.id, 'title', e.target.value)}
                                placeholder="Lesson Title"
                                className={`w-full bg-transparent text-sm font-bold outline-none border-b border-transparent focus:border-blue-500 transition-all ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-slate-800'
                                }`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className={`text-[8px] uppercase font-black tracking-widest ${theme === 'dark' ? 'text-gray-600' : 'text-slate-500'}`}>Video URL</label>
                              <input 
                                type="text"
                                value={lesson.videoUrl}
                                onChange={(e) => updateLesson(chapter.id, lesson.id, 'videoUrl', e.target.value)}
                                placeholder="YouTube/Vimeo URL"
                                className={`w-full bg-transparent text-xs outline-none border-b border-transparent focus:border-blue-500 transition-all ${
                                  theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                                }`}
                              />
                            </div>
                            <div className="flex items-center justify-between pt-4 md:pt-0">
                              <div className="flex flex-col">
                                <span className={`text-[8px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-gray-600' : 'text-slate-500'}`}>Lesson {lIndex + 1}</span>
                                <span className="text-[10px] text-blue-400 font-bold">{lesson.duration}</span>
                              </div>
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover/lesson:text-blue-400 transition-colors ${
                                theme === 'dark' ? 'bg-white/5 text-gray-600' : 'bg-gray-50 text-slate-400'
                              }`}>
                                <PlayCircle size={20} />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => addLesson(chapter.id)}
                        className={`text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-400 transition-colors mt-4 flex items-center gap-2 ${
                          theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                        }`}
                      >
                        <Plus size={14} /> Add Lesson to Chapter
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePublish('course')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 rounded-lg text-xs font-black uppercase tracking-[0.3em] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all mt-10"
            >
              Publish Course
            </motion.button>
          </div>
        </motion.div>
      )}

      {activeView === 'create-quiz' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-10 pb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-orange-500 rounded-none" />
              <h2 className={`text-4xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quiz Builder</h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveView('dashboard')} 
              className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all shadow-xl ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400' : 'bg-white border-gray-200 text-slate-400 hover:text-red-500'
              }`}
            >
              <X size={24} />
            </motion.button>
          </div>

          <div className={`backdrop-blur-xl rounded-none border p-10 space-y-10 shadow-2xl ${
            theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
          }`}>
            <div className="space-y-6">
              <input 
                type="text" 
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Quiz Title"
                className={`text-4xl font-bold w-full bg-transparent outline-none border-b pb-4 tracking-tight transition-all ${
                  theme === 'dark' ? 'text-white border-white/10 focus:border-orange-500' : 'text-slate-900 border-gray-200 focus:border-orange-600'
                }`}
              />
              <textarea 
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                placeholder="Quiz instructions..."
                className={`w-full border px-6 py-5 rounded-none outline-none transition-all h-28 resize-none shadow-inner ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-orange-500/50' : 'bg-gray-50 border-gray-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500/20'
                }`}
              ></textarea>
            </div>

            <div className="space-y-12">
              {quizQuestions.map((question, index) => (
                <motion.div 
                  key={question.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative p-10 rounded-none border space-y-8 group shadow-xl ${
                    theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <motion.button 
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => removeQuizQuestion(question.id)}
                    className={`absolute top-8 right-8 w-10 h-10 rounded-lg flex items-center justify-center transition-all border ${
                      theme === 'dark' ? 'bg-black/20 text-gray-500 hover:text-red-400 border-white/5' : 'bg-white text-slate-400 hover:text-red-500 border-gray-200'
                    }`}
                  >
                    <X size={20} />
                  </motion.button>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-none flex items-center justify-center text-lg font-black shadow-lg shadow-orange-600/20">
                      {index + 1}
                    </div>
                    <input 
                      type="text"
                      value={question.text}
                      onChange={(e) => updateQuizQuestion(question.id, 'text', e.target.value)}
                      placeholder="Enter your question here..."
                      className={`flex-1 bg-transparent border-none text-2xl font-bold focus:ring-0 outline-none tracking-tight ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {question.options.map((option, optIndex) => (
                      <motion.div 
                        key={optIndex} 
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-4 p-6 rounded-none border transition-all cursor-pointer ${
                          question.correctAnswer === optIndex 
                            ? 'bg-orange-600/10 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]' 
                            : (theme === 'dark' ? 'bg-black/20 border-white/5 hover:border-white/20' : 'bg-white border-gray-200 hover:border-orange-300')
                        }`}
                        onClick={() => updateQuizQuestion(question.id, 'correctAnswer', optIndex)}
                      >
                        <div className={`w-6 h-6 rounded-none border-2 flex items-center justify-center transition-all ${
                          question.correctAnswer === optIndex 
                            ? 'border-orange-500 bg-orange-500' 
                            : (theme === 'dark' ? 'border-white/20' : 'border-gray-300')
                        }`}>
                          {question.correctAnswer === optIndex && <div className="w-2 h-2 bg-white rounded-none" />}
                        </div>
                        <input 
                          type="text"
                          value={option}
                          onChange={(e) => updateQuizOption(question.id, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                          className={`flex-1 bg-transparent text-sm font-bold outline-none ${
                            theme === 'dark' ? 'text-gray-300 placeholder:text-gray-600' : 'text-slate-800 placeholder:text-slate-400'
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={addQuizQuestion}
                className={`flex-1 border-2 border-dashed py-6 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all bg-white/2 ${
                  theme === 'dark' ? 'border-white/10 text-gray-500 hover:border-orange-500/50 hover:text-orange-400' : 'border-gray-200 text-slate-500 hover:border-orange-400 hover:text-orange-600'
                }`}
              >
                + Add Question
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePublish('quiz')}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-6 rounded-lg text-xs font-black uppercase tracking-[0.3em] hover:shadow-[0_20px_40px_rgba(234,88,12,0.3)] transition-all shadow-xl"
              >
                Publish Quiz
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'student-progress' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10 pb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-emerald-500 rounded-none" />
              <h2 className={`text-4xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Student Progress Tracking</h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveView('dashboard')} 
              className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all shadow-xl ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400' : 'bg-white border-gray-200 text-slate-400 hover:text-red-500'
              }`}
            >
              <X size={24} />
            </motion.button>
          </div>
          <div className={`backdrop-blur-xl rounded-none border shadow-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
          }`}>
            <div className={`p-8 border-b flex flex-col md:flex-row justify-between items-center gap-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
            }`}>
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">All Students</button>
                <button className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10 border-white/5' : 'bg-gray-100 text-slate-500 hover:bg-gray-200 border-gray-200'
                }`}>Active</button>
                <button className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10 border-white/5' : 'bg-gray-100 text-slate-500 hover:bg-gray-200 border-gray-200'
                }`}>Completed</button>
              </div>
              <div className="relative w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  className={`w-full md:w-72 border pl-12 pr-6 py-3 rounded-none text-xs outline-none focus:ring-2 transition-all ${
                    theme === 'dark' ? 'bg-black/20 border-white/10 text-white focus:ring-blue-500/50' : 'bg-gray-50 border-gray-200 text-slate-900 focus:ring-blue-500/20'
                  }`} 
                />
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/20 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">
                    <th className="px-8 py-6">Student</th>
                    <th className="px-8 py-6">Enrolled Course</th>
                    <th className="px-8 py-6">Progress</th>
                    <th className="px-8 py-6">Last Activity</th>
                    <th className="px-8 py-6">Grade</th>
                    <th className="px-8 py-6">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-100'}`}>
                  {studentProgress.map((student, i) => (
                    <motion.tr 
                      key={i} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`transition-colors group ${
                        theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-none overflow-hidden border transition-all shadow-lg ${
                            theme === 'dark' ? 'border-white/10 group-hover:border-blue-500/50' : 'border-gray-200 group-hover:border-blue-400'
                          }`}>
                            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className={`text-sm font-bold transition-colors ${
                              theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                            }`}>{student.name}</p>
                            <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${
                              theme === 'dark' ? 'text-gray-600' : 'text-slate-400'
                            }`}>ID: STU-00{i+1}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`px-8 py-6 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                      }`}>{student.course}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`flex-1 h-2 rounded-none overflow-hidden min-w-[120px] border ${
                            theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-gray-100 border-gray-200'
                          }`}>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${student.progress}%` }}
                              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                            />
                          </div>
                          <span className={`text-xs font-black ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{student.progress}%</span>
                        </div>
                      </td>
                      <td className={`px-8 py-6 text-xs font-bold ${
                        theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                      }`}>2 hours ago</td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-emerald-500 tracking-tighter">A+</span>
                      </td>
                      <td className="px-8 py-6">
                        <motion.button 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedStudent(student);
                            setActiveView('student-detail');
                          }}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                            theme === 'dark' ? 'bg-white/5 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 border-white/5' : 'bg-gray-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border-gray-200'
                          }`}
                        >
                          <BarChart3 size={18} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'student-detail' && selectedStudent && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-10 pb-12"
        >
          <motion.button 
            whileHover={{ x: -5 }}
            onClick={() => setActiveView('student-progress')}
            className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
              theme === 'dark' ? 'text-gray-500 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            <ArrowLeft size={16} /> Back to List
          </motion.button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`backdrop-blur-xl rounded-none border p-10 text-center shadow-2xl relative overflow-hidden group ${
                  theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 bg-blue-600 rounded-none blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <img src={selectedStudent.avatar} alt={selectedStudent.name} className={`w-full h-full rounded-none object-cover border-4 relative z-10 ${
                      theme === 'dark' ? 'border-white/10' : 'border-gray-100'
                    }`} referrerPolicy="no-referrer" />
                  </div>
                  <h3 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedStudent.name}</h3>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                  }`}>Junior Learner</p>
                  <div className={`mt-10 pt-10 border-t grid grid-cols-2 gap-6 ${
                    theme === 'dark' ? 'border-white/5' : 'border-gray-100'
                  }`}>
                    <div>
                      <p className={`text-3xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>12</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                        theme === 'dark' ? 'text-gray-600' : 'text-slate-500'
                      }`}>Courses</p>
                    </div>
                    <div>
                      <p className={`text-3xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>450</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                        theme === 'dark' ? 'text-gray-600' : 'text-slate-500'
                      }`}>Points</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-2 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`backdrop-blur-xl rounded-none border p-10 shadow-2xl ${
                  theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-1 h-8 bg-blue-600 rounded-none" />
                  <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Learning Activity</h3>
                </div>
                <div className="space-y-8">
                  {[
                    { activity: 'Completed Lesson 4: Basic Addition', time: '2 hours ago', type: 'lesson', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { activity: 'Passed Quiz: The Water Cycle', time: 'Yesterday', type: 'quiz', score: '9.8/10', color: 'text-orange-400', bg: 'bg-orange-400/10' },
                    { activity: 'Started Course: Magic of Science', time: '2 days ago', type: 'course', color: 'text-purple-400', bg: 'bg-purple-400/10' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={theme === 'dark' ? { x: 10, backgroundColor: "rgba(255,255,255,0.03)" } : {}}
                      className={`flex gap-6 p-4 rounded-none transition-all group ${
                        theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-14 h-14 ${item.bg} rounded-none flex items-center justify-center ${item.color} flex-shrink-0 shadow-lg border group-hover:scale-110 transition-transform ${
                        theme === 'dark' ? 'border-white/5' : 'border-gray-100'
                      }`}>
                        {item.type === 'lesson' ? <PlayCircle size={24} /> : item.type === 'quiz' ? <FileText size={24} /> : <BookOpen size={24} />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-base font-bold transition-colors ${
                          theme === 'dark' ? 'text-gray-200 group-hover:text-white' : 'text-slate-800 group-hover:text-blue-600'
                        }`}>{item.activity}</p>
                        <div className="flex items-center gap-6 mt-2">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            theme === 'dark' ? 'text-gray-600' : 'text-slate-500'
                          }`}>{item.time}</span>
                          {item.score && (
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-emerald-500 rounded-none" />
                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Score: {item.score}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'teacher-forums' && (
        <TeacherForums onSelectThread={(thread: any) => {
          setSelectedThread(thread);
          setActiveView('teacher-forum-thread');
        }} />
      )}

      {activeView === 'teacher-forum-thread' && selectedThread && (
        <TeacherForumThread 
          topic={selectedThread} 
          onBack={() => setActiveView('teacher-forums')} 
        />
      )}

      {activeView === 'profile' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-10 pb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-blue-600 rounded-none" />
            <h2 className={`text-4xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Teacher Profile</h2>
          </div>

          <div className={`backdrop-blur-xl rounded-none border p-12 shadow-2xl ${
            theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
          }`}>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative group w-full lg:w-auto flex justify-center lg:block"
              >
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-blue-600 rounded-none blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                  <img src={user.avatar} alt={user.name} className={`w-full h-full rounded-none object-cover shadow-2xl border-4 relative z-10 ${
                    theme === 'dark' ? 'border-white/10' : 'border-gray-100'
                  }`} />
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-none flex items-center justify-center text-white text-[10px] font-black uppercase tracking-[0.2em] z-20 backdrop-blur-sm"
                  >
                    Change Photo
                  </motion.button>
                </div>
              </motion.div>

              <div className="flex-1 space-y-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className={`text-[10px] uppercase tracking-[0.2em] font-black ml-2 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                    }`}>Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name} 
                      className={`w-full border px-6 py-5 rounded-none focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-inner ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'
                      }`} 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className={`text-[10px] uppercase tracking-[0.2em] font-black ml-2 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                    }`}>Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="sarah@michtec.edu" 
                      className={`w-full border px-6 py-5 rounded-none focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-inner ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'
                      }`} 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className={`text-[10px] uppercase tracking-[0.2em] font-black ml-2 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                  }`}>Bio / Teaching Philosophy</label>
                  <textarea 
                    defaultValue="Passionate about early childhood education and making complex concepts simple and fun for young minds." 
                    className={`w-full border px-6 py-5 rounded-none focus:ring-2 focus:ring-blue-500/50 outline-none transition-all h-40 resize-none shadow-inner leading-relaxed ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'
                    }`}
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all shadow-xl"
                >
                  Save Profile
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
