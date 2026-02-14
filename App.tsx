
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { BuddyChat } from './pages/BuddyChat';
import { CrisisPage } from './pages/CrisisPage';
import { TherapistMatch } from './pages/TherapistMatch';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
import { UserSettings } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [settings, setSettings] = useState<UserSettings>({
    tone: 'Direct',
    avatarTheme: 'Ocean',
    checkInFrequency: 'Medium'
  });

  if (currentPage === 'landing') {
    return <Landing onStart={() => setCurrentPage('buddy')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'buddy':
        return <BuddyChat settings={settings} onNavigate={setCurrentPage} />;
      case 'crisis':
        return <CrisisPage />;
      case 'match':
        return <TherapistMatch />;
      case 'settings':
        return <Settings settings={settings} onUpdate={setSettings} />;
      default:
        return <BuddyChat settings={settings} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPath={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
