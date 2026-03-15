import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseSearch from './components/CourseSearch';
import PopularCourses from './components/PopularCourses';
import WhyChooseUs from './components/WhyChooseUs';
import YouCanLearn from './components/YouCanLearn';
import BlogNews from './components/BlogNews';
import HistoryContact from './components/HistoryContact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BlogPage from './components/BlogPage';
import LoginPage from './components/LoginPage';
import LearnerDashboard from './pages/learner';
import TeacherDashboard from './pages/teacher';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'motion/react';
import { Post, UserRole } from './types';
import { ThemeProvider } from './context/ThemeContext';

import CoursesPage from './components/CoursesPage';
import EventsPage from './components/EventsPage';
import ContactPage from './components/ContactPage';

type View = 'landing' | 'login' | 'learner-dashboard' | 'teacher-dashboard' | 'courses' | 'events' | 'contact';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleReadMore = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedPost(null);
    setView('landing');
    window.scrollTo(0, 0);
  };

  const handleGetStarted = () => {
    setView('login');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (newView: View) => {
    setSelectedPost(null);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: UserRole) => {
    if (role === 'learner') {
      setView('learner-dashboard');
    } else if (role === 'teacher') {
      setView('teacher-dashboard');
    } else {
      setView('learner-dashboard');
    }
    window.scrollTo(0, 0);
  };

  // If in dashboard view, we don't show the standard navbar/footer
  if (view === 'learner-dashboard') {
    return (
      <ThemeProvider>
        <LearnerDashboard onLogout={() => setView('login')} />
      </ThemeProvider>
    );
  }

  if (view === 'teacher-dashboard') {
    return (
      <ThemeProvider>
        <TeacherDashboard onLogout={() => setView('login')} />
      </ThemeProvider>
    );
  }

  if (view === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#c5a070] selection:text-white">
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      <Navbar 
        onHomeClick={handleBackToHome} 
        onGetStartedClick={handleGetStarted} 
        onNavigate={handleNavigate}
        activeView={view}
      />
      <main>
        {selectedPost ? (
          <BlogPage post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : view === 'courses' ? (
          <CoursesPage />
        ) : view === 'events' ? (
          <EventsPage />
        ) : view === 'contact' ? (
          <ContactPage />
        ) : (
          <>
            <Hero />
            <CourseSearch />
            <PopularCourses />
            <WhyChooseUs />
            <YouCanLearn />
            <BlogNews onReadMore={handleReadMore} />
            <HistoryContact />
            {/* Extra content to make it feel like a landing page */}
            <section className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6">Fun Learning for Every Child</h2>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                  We provide a safe and happy place where children can learn through play and discovery. 
                  Our fun lessons and friendly teachers help every child reach for the stars!
                </p>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer onNavigate={handleNavigate} onLogin={handleGetStarted} />
      <ScrollToTop />
    </div>
  );
}
