import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock,
  LucideIcon,
  X,
  ArrowRight,
  ArrowLeft,
  Star
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  type: 'video' | 'quiz';
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  color: string;
}

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

interface TakeCourseProps {
  course: Course;
  onBack: () => void;
  onTakeQuiz?: () => void;
}

const getChaptersForCourse = (courseId: number): Chapter[] => {
  switch (courseId) {
    case 1: // Fun with Numbers
      return [
        {
          id: 1,
          title: 'Counting Adventures',
          description: 'Let\'s learn how to count from 1 to 20 with fun games!',
          color: 'bg-[#42a5f5]',
          lessons: [
            { id: 101, title: 'Counting 1 to 10', duration: '2:03 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 102, title: 'Counting 11 to 20', duration: '3:15 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 103, title: 'The Number Song', duration: '4:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
          ]
        },
        {
          id: 2,
          title: 'Adding & Subtracting',
          description: 'Learn how to put numbers together and take them away.',
          color: 'bg-[#66bb6a]',
          lessons: [
            { id: 104, title: 'Adding with Apples', duration: '5:01 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 105, title: 'Subtracting with Balloons', duration: '4:10 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 106, title: 'Math Fun Quiz', duration: '10:00 min', videoUrl: '', type: 'quiz' },
          ]
        }
      ];
    case 2: // Magic of Science
      return [
        {
          id: 3,
          title: 'Nature Explorers',
          description: 'Discover the magic of plants and animals.',
          color: 'bg-[#66bb6a]',
          lessons: [
            { id: 201, title: 'How Plants Grow', duration: '6:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 202, title: 'Animal Friends', duration: '8:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
          ]
        },
        {
          id: 4,
          title: 'Weather Wonders',
          description: 'Learn about sun, rain, and snow!',
          color: 'bg-[#42a5f5]',
          lessons: [
            { id: 203, title: 'The Water Cycle', duration: '5:30 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 204, title: 'Science Fun Quiz', duration: '10:00 min', videoUrl: '', type: 'quiz' },
          ]
        }
      ];
    case 3: // Story Time: English
      return [
        {
          id: 5,
          title: 'Reading Magic',
          description: 'Let\'s read some wonderful stories together!',
          color: 'bg-[#ffa726]',
          lessons: [
            { id: 301, title: 'The Brave Little Lion', duration: '7:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 302, title: 'Phonics Fun: A to Z', duration: '10:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
          ]
        },
        {
          id: 6,
          title: 'Writing Fun',
          description: 'Learn how to write your first words.',
          color: 'bg-[#ec407a]',
          lessons: [
            { id: 303, title: 'Alphabet Writing', duration: '5:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 304, title: 'English Fun Quiz', duration: '10:00 min', videoUrl: '', type: 'quiz' },
          ]
        }
      ];
    case 4: // Art & Colors
      return [
        {
          id: 7,
          title: 'Color Mixing',
          description: 'Discover what happens when you mix colors!',
          color: 'bg-[#ec407a]',
          lessons: [
            { id: 401, title: 'Primary Colors', duration: '4:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 402, title: 'Making Orange & Green', duration: '5:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
          ]
        },
        {
          id: 8,
          title: 'Drawing Shapes',
          description: 'Learn to draw animals using simple shapes.',
          color: 'bg-[#9575cd]',
          lessons: [
            { id: 403, title: 'Drawing a Cat', duration: '8:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 404, title: 'Art Fun Quiz', duration: '10:00 min', videoUrl: '', type: 'quiz' },
          ]
        }
      ];
    case 5: // Musical Adventure
      return [
        {
          id: 9,
          title: 'Rhythm & Beats',
          description: 'Clap along to the music!',
          color: 'bg-[#9575cd]',
          lessons: [
            { id: 501, title: 'Keeping the Beat', duration: '4:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 502, title: 'Drums & Shakers', duration: '6:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
          ]
        },
        {
          id: 10,
          title: 'Sing Along',
          description: 'Learn some fun new songs.',
          color: 'bg-[#42a5f5]',
          lessons: [
            { id: 503, title: 'The Melody Song', duration: '5:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 504, title: 'Music Fun Quiz', duration: '10:00 min', videoUrl: '', type: 'quiz' },
          ]
        }
      ];
    case 6: // Healthy Habits
      return [
        {
          id: 11,
          title: 'Healthy Eating',
          description: 'Learn about fruits and vegetables.',
          color: 'bg-[#ef5350]',
          lessons: [
            { id: 601, title: 'The Rainbow Plate', duration: '5:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 602, title: 'Why Water is Good', duration: '3:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
          ]
        },
        {
          id: 12,
          title: 'Stay Active',
          description: 'Fun exercises to do at home.',
          color: 'bg-[#66bb6a]',
          lessons: [
            { id: 603, title: 'Morning Stretch', duration: '4:00 min', videoUrl: 'https://www.youtube.com/embed/u0Vv_7U2p60', type: 'video' },
            { id: 604, title: 'Health Fun Quiz', duration: '10:00 min', videoUrl: '', type: 'quiz' },
          ]
        }
      ];
    default:
      return [];
  }
};

export default function TakeCourse({ course, onBack, onTakeQuiz }: TakeCourseProps) {
  const { theme } = useTheme();
  const chaptersData = getChaptersForCourse(course.id);
  const [openChapters, setOpenChapters] = useState<number[]>([chaptersData[0]?.id]);
  const [watchedLessons, setWatchedLessons] = useState<number[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const toggleChapter = (id: number) => {
    setOpenChapters(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson.type === 'quiz') {
      if (onTakeQuiz) onTakeQuiz();
      return;
    }
    setActiveLesson(lesson);
    setShowVideoModal(true);
  };

  const handleNextLesson = () => {
    if (!activeLesson) return;
    
    // Mark current as watched
    if (!watchedLessons.includes(activeLesson.id)) {
      setWatchedLessons(prev => [...prev, activeLesson.id]);
    }

    // Find next lesson
    let allLessons: Lesson[] = [];
    chaptersData.forEach(c => allLessons = [...allLessons, ...c.lessons]);
    
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      if (next.type === 'quiz') {
        setShowVideoModal(false);
        if (onTakeQuiz) onTakeQuiz();
      } else {
        setActiveLesson(next);
      }
    } else {
      setShowVideoModal(false);
    }
  };

  const handleCloseModal = () => {
    if (activeLesson && !watchedLessons.includes(activeLesson.id)) {
      setWatchedLessons(prev => [...prev, activeLesson.id]);
    }
    setShowVideoModal(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row gap-10 relative pb-12"
    >
      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && activeLesson && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className={`${theme === 'light' ? 'bg-white' : 'bg-[#1a1d23]'} rounded-none shadow-[0_0_100px_rgba(0,0,0,0.5)] w-full max-w-5xl overflow-hidden border ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}
            >
              <div className={`p-8 ${theme === 'light' ? 'bg-gray-50 border-b border-gray-200' : 'bg-white/5 border-b border-white/5'} flex justify-between items-center`}>
                <div>
                  <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'} tracking-tight`}>{activeLesson.title}</h3>
                  <p className={`text-[10px] ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'} font-black uppercase tracking-[0.2em] mt-1`}>Lesson Video</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseModal}
                  className={`w-12 h-12 rounded-lg ${theme === 'light' ? 'bg-gray-100 border-gray-200 text-gray-600' : 'bg-white/5 border-white/10 text-gray-400'} border flex items-center justify-center hover:text-red-400 transition-all shadow-xl`}
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              <div className="aspect-video bg-black relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={activeLesson.videoUrl} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="relative z-10"
                ></iframe>
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] pointer-events-none" />
              </div>

              <div className={`p-8 ${theme === 'light' ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center`}>
                <motion.button 
                  whileHover={{ x: -5 }}
                  onClick={handleCloseModal}
                  className={`text-xs font-black uppercase tracking-widest ${theme === 'light' ? 'text-gray-500 hover:text-black' : 'text-gray-500 hover:text-white'} transition-all flex items-center gap-3`}
                >
                  <ArrowLeft size={18} />
                  Back to Lessons
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextLesson}
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-10 py-4 rounded-lg text-xs font-black uppercase tracking-widest hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all flex items-center gap-3"
                >
                  Next Lesson
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1">
        {/* Lesson Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-8 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-none shadow-2xl border border-white/10"
          >
            <Star size={32} className="drop-shadow-lg" />
          </motion.div>
          <div>
            <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'} tracking-tighter leading-tight`}>{course.title}</h1>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} font-medium opacity-80`}>Welcome to your learning adventure!</p>
          </div>
        </motion.div>

        {/* Curriculum Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className={`text-sm font-black uppercase tracking-[0.2em] ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>Your Lessons</h2>
          </div>
          
          {chaptersData.map((chapter, chapterIdx) => (
            <motion.div 
              key={chapter.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: chapterIdx * 0.1 }}
              className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1d23]/40 border-white/5'} backdrop-blur-xl border rounded-none shadow-2xl overflow-hidden group`}
            >
              <div className="p-8 flex items-start gap-8">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`w-14 h-14 ${chapter.color} rounded-none flex items-center justify-center text-white flex-shrink-0 shadow-2xl border border-white/10`}
                >
                  <GraduationCap size={28} />
                </motion.div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'} tracking-tight`}>{chapter.title}</h3>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleChapter(chapter.id)}
                      className={`${theme === 'light' ? 'bg-gray-100 border-gray-200 text-gray-600 hover:text-black hover:bg-gray-200' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'} border px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all`}
                    >
                      {openChapters.includes(chapter.id) ? 'Close' : 'Open'}
                    </motion.button>
                  </div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed mb-6 font-medium opacity-80`}>
                    {chapter.description}
                  </p>

                  <AnimatePresence>
                    {openChapters.includes(chapter.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className={`border-t ${theme === 'light' ? 'border-gray-100' : 'border-white/5'} pt-6 space-y-2`}>
                          {chapter.lessons.map((lesson, index) => (
                            <motion.div 
                              key={lesson.id} 
                              whileHover={theme === 'dark' ? { x: 10, backgroundColor: "rgba(255,255,255,0.05)" } : { x: 5 }}
                              onClick={() => handleSelectLesson(lesson)}
                              className={`flex items-center justify-between p-4 rounded-none transition-all cursor-pointer group/lesson ${
                                watchedLessons.includes(lesson.id) 
                                  ? (theme === 'light' ? 'bg-emerald-50' : 'bg-emerald-500/5') 
                                  : (theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-white/5')
                              }`}
                            >
                              <div className="flex items-center gap-5">
                                <span className={`text-[10px] font-black ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} w-5`}>{index + 1}.</span>
                                {watchedLessons.includes(lesson.id) ? (
                                  <div className="w-8 h-8 rounded-none bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <CheckCircle2 size={18} />
                                  </div>
                                ) : (
                                  <div className={`w-8 h-8 rounded-none ${theme === 'light' ? 'bg-gray-100' : 'bg-white/5'} flex items-center justify-center ${theme === 'light' ? 'text-gray-400 group-hover/lesson:text-blue-600' : 'text-gray-500 group-hover/lesson:text-blue-400'} transition-colors`}>
                                    <Play size={18} />
                                  </div>
                                )}
                                <span className={`text-sm font-bold ${watchedLessons.includes(lesson.id) ? 'text-emerald-500' : (theme === 'light' ? 'text-gray-700 group-hover/lesson:text-black' : 'text-gray-300 group-hover/lesson:text-white')}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock size={14} className={theme === 'light' ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={`text-[10px] font-black ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-widest`}>{lesson.duration}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-72 space-y-10">
        {/* Tutor Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1d23]/40 border-white/5'} backdrop-blur-xl border rounded-none p-8 shadow-2xl group`}
        >
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-500 mb-6">Your Teacher</h4>
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className={`absolute inset-0 bg-blue-600 rounded-full blur-md ${theme === 'light' ? 'opacity-10' : 'opacity-20'} group-hover:opacity-40 transition-opacity`} />
              <img 
                src="https://i.pravatar.cc/150?u=teacher" 
                alt="Teacher" 
                className={`w-14 h-14 rounded-full border-2 ${theme === 'light' ? 'border-gray-100' : 'border-white/10'} relative z-10`}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h5 className={`text-base font-bold ${theme === 'light' ? 'text-black group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'} transition-colors`}>Miss Sarah</h5>
              <p className={`text-[10px] ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'} font-black uppercase tracking-widest mt-1`}>Primary Educator</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1d23]/40 border-white/5'} backdrop-blur-xl border rounded-none overflow-hidden shadow-2xl`}
        >
          {[
            { name: 'Lessons', active: true },
            { name: 'Fun Quiz' },
            { name: 'My Badges' }
          ].map((item, i) => (
            <motion.button 
              key={item.name}
              whileHover={theme === 'dark' ? { x: 5, backgroundColor: "rgba(255,255,255,0.05)" } : { x: 5 }}
              className={`w-full text-left px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b ${theme === 'light' ? 'border-gray-100' : 'border-white/5'} last:border-0 ${
                item.active 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : (theme === 'light' ? 'text-gray-500 hover:text-black' : 'text-gray-500 hover:text-white')
              }`}
            >
              {item.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className={`${theme === 'light' ? 'bg-blue-50 border-blue-100' : 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-white/10'} backdrop-blur-xl border rounded-none p-8 shadow-2xl`}
        >
          <h4 className={`text-[10px] uppercase tracking-[0.2em] font-black ${theme === 'light' ? 'text-blue-600' : 'text-white'} mb-4`}>Course Progress</h4>
          <div className="flex items-end justify-between mb-2">
            <span className={`text-3xl font-bold ${theme === 'light' ? 'text-blue-700' : 'text-white'} tracking-tighter`}>
              {Math.round((watchedLessons.length / chaptersData.reduce((acc, c) => acc + c.lessons.length, 0)) * 100)}%
            </span>
            <span className={`text-[10px] font-black ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} uppercase tracking-widest pb-1`}>Great Job!</span>
          </div>
          <div className={`h-2 ${theme === 'light' ? 'bg-blue-200' : 'bg-white/10'} rounded-full overflow-hidden`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(watchedLessons.length / chaptersData.reduce((acc, c) => acc + c.lessons.length, 0)) * 100}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-400"
            />
          </div>
        </motion.div>
      </aside>
    </motion.div>
  );
}
