import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Landing from './components/Landing';
import Signup from './components/Signup';
import AISetup from './components/AISetup';
import Dashboard from './components/Dashboard';
import './App.css';

function AppContent() {
  const { currentScreen, theme } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <Landing />;
      case 'signup':
        return <Signup />;
      case 'ai-setup':
        return <AISetup />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Landing />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="min-h-screen">
        {renderScreen()}
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;