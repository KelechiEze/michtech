import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LiveClass {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: 'upcoming' | 'live' | 'ended';
  joinUrl: string;
}

interface LiveClassContextType {
  classes: LiveClass[];
  addClass: (newClass: LiveClass) => void;
  updateClass: (id: string, updatedClass: Partial<LiveClass>) => void;
  removeClass: (id: string) => void;
  getClassByUrl: (url: string) => LiveClass | undefined;
}

const LiveClassContext = createContext<LiveClassContextType | undefined>(undefined);

export function LiveClassProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<LiveClass[]>(() => {
    const saved = localStorage.getItem('michtec_live_classes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved live classes', e);
      }
    }
    return [
      { 
        id: '1', 
        title: 'Introduction to Fractions', 
        subject: 'Math', 
        teacher: 'Mr. James Wilson', 
        date: '2026-03-20', 
        startTime: '10:00 AM', 
        endTime: '10:45 AM', 
        duration: '45 mins', 
        status: 'upcoming', 
        joinUrl: 'https://michtec.edu/live/abc-123' 
      },
      { 
        id: '2', 
        title: 'The Solar System Adventure', 
        subject: 'Science', 
        teacher: 'Miss Sarah Parker', 
        date: '2026-03-18', 
        startTime: '02:00 PM', 
        endTime: '03:00 PM', 
        duration: '60 mins', 
        status: 'live', 
        joinUrl: 'https://michtec.edu/live/xyz-789' 
      },
      { 
        id: '3', 
        title: 'Creative Writing Workshop', 
        subject: 'English', 
        teacher: 'Mrs. Emily Brown', 
        date: '2026-03-21', 
        startTime: '11:30 AM', 
        endTime: '12:15 PM', 
        duration: '45 mins', 
        status: 'upcoming', 
        joinUrl: 'https://michtec.edu/live/def-456' 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('michtec_live_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'michtec_live_classes' && e.newValue) {
        try {
          setClasses(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Failed to parse storage update', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addClass = (newClass: LiveClass) => {
    setClasses(prev => [newClass, ...prev]);
  };

  const updateClass = (id: string, updatedClass: Partial<LiveClass>) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updatedClass } : c));
  };

  const removeClass = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const getClassByUrl = (url: string) => {
    return classes.find(c => c.joinUrl === url);
  };

  return (
    <LiveClassContext.Provider value={{ classes, addClass, updateClass, removeClass, getClassByUrl }}>
      {children}
    </LiveClassContext.Provider>
  );
}

export function useLiveClasses() {
  const context = useContext(LiveClassContext);
  if (context === undefined) {
    throw new Error('useLiveClasses must be used within a LiveClassProvider');
  }
  return context;
}
