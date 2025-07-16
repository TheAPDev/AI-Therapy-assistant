import React, { useEffect } from 'react';
import { AppProvider, useAppContext, themesConfig } from './context/AppContext';
import Landing from './components/Landing';
import Signup from './components/Signup';
import AISetup from './components/AISetup';
import Dashboard from './components/Dashboard';
import './App.css';

function AppContent() {
  const { currentScreen, theme } = useAppContext();

  useEffect(() => {
    // Set global CSS variables for dark theme
    const root = document.documentElement;
    const config = themesConfig[theme] || themesConfig['dark'];
    root.style.setProperty('--background-main', '#0c0c0c');
    root.style.setProperty('--background-chat', '#0d0d0d');
    root.style.setProperty('--background-panel', 'rgba(20,22,30,0.82)');
    root.style.setProperty('--background-glass', 'rgba(30,32,40,0.55)');
    root.style.setProperty('--text-main', '#fff');
    root.style.setProperty('--text-secondary', '#cfcfcf');
    root.style.setProperty('--accent-blue', '#5f8bff');
    root.style.setProperty('--accent-purple', '#b48eff');
    root.style.setProperty('--accent-turquoise', '#00c6ff');
    root.classList.add('theme-fade');
    setTimeout(() => root.classList.remove('theme-fade'), 350);
  }, [theme]);

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