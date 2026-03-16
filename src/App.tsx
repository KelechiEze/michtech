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
import { ArrowLeft } from 'lucide-react';
import { Post, UserRole } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CourseDetailPage from './components/CourseDetailPage';
import EventDetailPage from './components/EventDetailPage';

import CoursesPage from './components/CoursesPage';
import EventsPage from './components/EventsPage';
import ContactPage from './components/ContactPage';

type View = 'landing' | 'login' | 'learner-dashboard' | 'teacher-dashboard' | 'courses' | 'events' | 'contact' | 'course-detail' | 'checkout' | 'event-detail';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    setSelectedCourse(null);
    setSelectedEvent(null);
    setView('landing');
    window.scrollTo(0, 0);
  };

  const handleGetStarted = () => {
    setView('login');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (newView: View) => {
    setSelectedPost(null);
    setSelectedCourse(null);
    setSelectedEvent(null);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setView('course-detail');
    window.scrollTo(0, 0);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setView('event-detail');
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

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-white font-sans selection:bg-[#c5a070] selection:text-white">
          <AnimatePresence>
            {loading && <Preloader />}
          </AnimatePresence>

          {/* Dashboards don't show standard navbar/footer */}
          {view === 'learner-dashboard' ? (
            <LearnerDashboard onLogout={() => setView('login')} />
          ) : view === 'teacher-dashboard' ? (
            <TeacherDashboard onLogout={() => setView('login')} />
          ) : view === 'checkout' ? (
            <Checkout onBack={() => setView('landing')} onSuccess={() => setView('landing')} />
          ) : (
            <>
              <Navbar 
                onHomeClick={handleBackToHome} 
                onGetStartedClick={handleGetStarted} 
                onNavigate={handleNavigate}
                onCartClick={() => setIsCartOpen(true)}
                activeView={view}
              />
              <main>
                {selectedPost ? (
                  <BlogPage post={selectedPost} onBack={() => setSelectedPost(null)} />
                ) : view === 'course-detail' ? (
                  <CourseDetailPage 
                    course={selectedCourse} 
                    onBack={() => setView('landing')} 
                    onLoginClick={handleGetStarted} 
                  />
                ) : view === 'event-detail' ? (
                  <EventDetailPage 
                    event={selectedEvent} 
                    onBack={() => setView('events')} 
                  />
                ) : view === 'login' ? (
                  <LoginPage onLogin={handleLogin} onBack={handleBackToHome} />
                ) : view === 'courses' ? (
                  <CoursesPage onNavigate={handleNavigate} />
                ) : view === 'events' ? (
                  <EventsPage onNavigate={handleNavigate} onEventClick={handleEventClick} />
                ) : view === 'contact' ? (
                  <ContactPage />
                ) : (
                  <>
                    <Hero />
                    <CourseSearch 
                      onSearch={() => setView('login')} 
                      onCategoryClick={() => setView('login')} 
                    />
                    <PopularCourses onCourseClick={handleCourseClick} />
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
              <Cart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                onCheckout={() => {
                  setIsCartOpen(false);
                  setView('checkout');
                }} 
              />
            </>
          )}
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
