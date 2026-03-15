import React from 'react';
import TeacherDashboardPage from './Dashboard';

interface TeacherDashboardProps {
  onLogout: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  return <TeacherDashboardPage onLogout={onLogout} />;
}
