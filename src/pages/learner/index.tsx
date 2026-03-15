import React from 'react';
import LearnerDashboardPage from './Dashboard';

interface LearnerDashboardProps {
  onLogout: () => void;
}

export default function LearnerDashboard({ onLogout }: LearnerDashboardProps) {
  return <LearnerDashboardPage onLogout={onLogout} />;
}
