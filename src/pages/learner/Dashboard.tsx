import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  Trophy, 
  GraduationCap, 
  FileText,
  Clock,
  Volume2,
  PlayCircle,
  LucideIcon
} from 'lucide-react';
import DashboardLayout, { SidebarItem } from '../../components/DashboardLayout';
import CourseLibrary from './components/CourseLibrary';
import CourseDetail from './components/CourseDetail';
import TakeCourse from './components/TakeCourse';
import CourseList from './components/CourseList';
import MyCourses from './components/MyCourses';
import CourseForums from './components/CourseForums';
import CourseForumThread from './components/CourseForumThread';
import TakeQuiz from './components/TakeQuiz';
import AccountSettings from '../../components/AccountSettings';
import { useTheme } from '../../context/ThemeContext';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  color: string;
  icon: LucideIcon;
  iconColor: string;
  excerpt: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: string;
}

const recentCourses = [
  { name: 'Fun with Numbers', progress: 75, hasVideo: true },
  { name: 'Magic of Science', progress: 90, hasVideo: true },
  { name: 'Story Time: English', progress: 45, hasVideo: false },
];

const quizzes = [
  { title: 'What is 2 + 2?', course: 'Fun with Numbers', score: '5.8', grade: 'Good', voiceEnabled: true },
  { title: 'The Water Cycle Quiz', course: 'Magic of Science', score: '9.8', grade: 'Excellent', voiceEnabled: true },
];

const forumActivity = [
  { user: 'Adrian Demian', topic: 'Math Help', message: 'I love learning about shapes!', time: '1 hr ago' },
  { user: 'Adrian Demian', topic: 'Science Fun', message: 'The volcano experiment was so cool!', time: '2 hrs ago' },
];

interface LearnerDashboardProps {
  onLogout: () => void;
}

export default function LearnerDashboardPage({ onLogout }: LearnerDashboardProps) {
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<'dashboard' | 'courses' | 'course-list' | 'my-courses' | 'course-detail' | 'take-course' | 'course-forums' | 'course-forum-thread' | 'take-quiz' | 'account'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedThread, setSelectedThread] = useState<ForumTopic | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['courses']);

  const user = {
    name: 'Kelechi Eze',
    role: 'Junior Learner',
    avatar: 'https://i.pravatar.cc/150?u=student'
  };

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
    { 
      name: 'My Lessons', 
      view: 'courses', 
      icon: BookOpen,
      submenu: [
        { name: 'Lesson Grid', view: 'courses' },
        { name: 'Lesson List', view: 'course-list' },
        { name: 'Lesson Page', view: 'course-detail' },
        { name: 'My Progress', view: 'my-courses' },
        { name: 'Start Lesson', view: 'take-course' },
        { name: 'Kids Forum', view: 'course-forums' },
        { name: 'Forum Chat', view: 'course-forum-thread' },
        { name: 'Fun Quiz', view: 'take-quiz' }
      ]
    },
    { name: 'My Profile', view: 'account', icon: User }
  ];

  const notifications = [
    { id: 1, title: 'New Lesson Added', message: 'Miss Sarah added "Multiplication Fun"', time: '5 mins ago', unread: true },
    { id: 2, title: 'Quiz Graded', message: 'Your Science Quiz was graded: 9.8/10', time: '1 hour ago', unread: true },
    { id: 3, title: 'Forum Reply', message: 'Mr. James replied to your question', time: '2 hours ago', unread: false },
  ];

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveView('course-detail');
  };

  const handleStartCourse = () => {
    setActiveView('take-course');
  };

  const handleSelectThread = (topic: ForumTopic) => {
    setSelectedThread(topic);
    setActiveView('course-forum-thread');
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.title.includes('Lesson')) {
      setActiveView('courses');
    } else if (notification.title.includes('Quiz')) {
      setActiveView('take-quiz');
    } else if (notification.title.includes('Forum')) {
      setActiveView('course-forums');
    }
  };

  return (
    <DashboardLayout
      user={user}
      sidebarItems={sidebarItems}
      notifications={notifications}
      activeView={activeView}
      setActiveView={(view) => {
        if (view === 'course-detail' && !selectedCourse) return;
        if (view === 'take-course' && !selectedCourse) return;
        if (view === 'course-forum-thread' && !selectedThread) return;
        if (view === 'take-quiz' && !selectedCourse) return;
        setActiveView(view);
      }}
      onLogout={onLogout}
      expandedMenus={expandedMenus}
      setExpandedMenus={setExpandedMenus}
      onNotificationClick={handleNotificationClick}
    >
      {activeView === 'dashboard' && (
        <div className="space-y-10 pb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h2 className={`text-4xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Welcome back, <span className="text-blue-400">{user.name.split(' ')[0]}</span>! 👋
              </h2>
              <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>You've completed 85% of your weekly goals. Keep it up!</p>
            </div>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-none border backdrop-blur-md ${
              theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
            }`}>
              <div className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
              <span className={`text-xs font-bold uppercase tracking-widest ${
                theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
              }`}>Online Now</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Progress & Courses */}
            <div className="lg:col-span-2 space-y-10">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Courses Done', value: '12', icon: Trophy, color: 'from-amber-400 to-orange-500', shadow: 'shadow-orange-500/20' },
                  { label: 'Total Points', value: '2,450', icon: GraduationCap, color: 'from-blue-400 to-indigo-600', shadow: 'shadow-blue-500/20' },
                  { label: 'Study Hours', value: '48h', icon: Clock, color: 'from-emerald-400 to-teal-600', shadow: 'shadow-emerald-500/20' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={theme === 'dark' ? { y: -10, rotateX: 5, rotateY: 5 } : {}}
                    className={`backdrop-blur-xl p-6 rounded-none border shadow-2xl relative overflow-hidden group cursor-default transition-colors duration-500 ${
                      theme === 'dark' ? 'bg-[#1a1d23]/60 border-white/5' : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl -mr-8 -mt-8 group-hover:opacity-20 transition-opacity`} />
                    <div className={`w-12 h-12 rounded-none bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg ${stat.shadow}`}>
                      <stat.icon size={24} className="text-white" />
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

              {/* Recent Courses */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className={`backdrop-blur-xl rounded-none border shadow-2xl overflow-hidden transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`p-8 border-b flex justify-between items-center ${
                  theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
                }`}>
                  <h3 className={`text-xl font-bold tracking-tight ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>Continue Learning</h3>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveView('my-courses')} 
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                      theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    View All Lessons
                  </motion.button>
                </div>
                <div className="p-8 space-y-8">
                  {recentCourses.map((course, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="group cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-none flex items-center justify-center transition-all duration-300 border ${
                            theme === 'dark' ? 'bg-white/5 text-gray-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 border-white/5' : 'bg-gray-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 border-gray-100'
                          }`}>
                            {course.hasVideo ? <PlayCircle size={24} /> : <FileText size={24} />}
                          </div>
                          <div>
                            <h4 className={`text-sm font-bold transition-colors ${
                              theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                            }`}>{course.name}</h4>
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${
                              theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                            }`}>Next: Module {i + 2}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-black ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{course.progress}%</span>
                        </div>
                      </div>
                      <div className={`h-2.5 rounded-none overflow-hidden border ${
                        theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-gray-200'
                      }`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 + (i * 0.1) }}
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-none shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Quizzes & Activity */}
            <div className="space-y-10">
              {/* Recent Quizzes */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className={`backdrop-blur-xl rounded-none border shadow-2xl overflow-hidden ${
                  theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`p-8 border-b ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                  <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recent Quizzes</h3>
                </div>
                <div className="p-8 space-y-8">
                  {quizzes.map((quiz, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={theme === 'dark' ? { x: 5 } : {}}
                      className="flex items-start gap-5 group cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                        theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white' : 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white'
                      }`}>
                        <FileText size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-bold truncate transition-colors ${
                          theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                        }`}>{quiz.title}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                          theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                        }`}>{quiz.course}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs font-black text-emerald-500">{quiz.score}/10</span>
                          <span className={`text-[10px] px-2.5 py-1 rounded-none uppercase font-black border ${
                            theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>{quiz.grade}</span>
                          {quiz.voiceEnabled && <Volume2 size={14} className="text-gray-400 animate-pulse" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Forum Activity */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`backdrop-blur-xl rounded-none border shadow-2xl overflow-hidden ${
                  theme === 'dark' ? 'bg-[#1a1d23]/40 border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`p-8 border-b ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                  <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Forum Activity</h3>
                </div>
                <div className="p-8 space-y-8">
                  {forumActivity.map((activity, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={theme === 'dark' ? { x: 5 } : {}}
                      className={`space-y-3 p-4 rounded-none transition-all cursor-pointer border ${
                        theme === 'dark' ? 'hover:bg-white/5 border-transparent hover:border-white/5' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-500">{activity.user}</span>
                        <span className="text-[10px] text-gray-500 font-medium">{activity.time}</span>
                      </div>
                      <p className={`text-xs italic leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>"{activity.message}"</p>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-none" />
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>In: {activity.topic}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'courses' && <CourseLibrary onSelectCourse={handleSelectCourse} />}
      {activeView === 'course-list' && <CourseList onSelectCourse={handleSelectCourse} onSwitchToGrid={() => setActiveView('courses')} />}
      {activeView === 'my-courses' && <MyCourses onSelectCourse={handleSelectCourse} />}
      {activeView === 'course-detail' && selectedCourse && (
        <CourseDetail 
          course={selectedCourse} 
          onBack={() => setActiveView('courses')} 
          onStartCourse={handleStartCourse}
        />
      )}
      {activeView === 'take-course' && selectedCourse && (
        <TakeCourse 
          course={selectedCourse} 
          onBack={() => setActiveView('course-detail')} 
          onTakeQuiz={() => setActiveView('take-quiz')}
        />
      )}
      {activeView === 'course-forums' && <CourseForums onSelectThread={handleSelectThread} />}
      {activeView === 'course-forum-thread' && selectedThread && (
        <CourseForumThread 
          topic={selectedThread} 
          onBack={() => setActiveView('course-forums')} 
        />
      )}
      {activeView === 'take-quiz' && selectedCourse && (
        <TakeQuiz 
          course={selectedCourse} 
          onBack={() => setActiveView('take-course')} 
        />
      )}
      {activeView === 'account' && <AccountSettings />}
    </DashboardLayout>
  );
}
