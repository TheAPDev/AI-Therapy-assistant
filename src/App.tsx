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
    // Set global CSS variables for each theme
    const root = document.documentElement;
    let config = themesConfig[theme] || themesConfig['dark'];
    switch (theme) {
      case 'dark':
        root.style.setProperty('--background-main', '#000');
        root.style.setProperty('--background-chat', '#000');
        root.style.setProperty('--background-panel', '#000');
        root.style.setProperty('--background-glass', '#000');
        root.style.setProperty('--text-main', '#fff');
        root.style.setProperty('--text-secondary', '#fff');
        root.style.setProperty('--accent-blue', '#000');
        root.style.setProperty('--accent-purple', '#000');
        root.style.setProperty('--accent-turquoise', '#000');
        break;
      case 'light':
        root.style.setProperty('--background-main', '#fff');
        root.style.setProperty('--background-chat', '#fff');
        root.style.setProperty('--background-panel', '#fff');
        root.style.setProperty('--background-glass', '#fff');
        root.style.setProperty('--text-main', '#000');
        root.style.setProperty('--text-secondary', '#000');
        root.style.setProperty('--accent-blue', '#fff');
        root.style.setProperty('--accent-purple', '#fff');
        root.style.setProperty('--accent-turquoise', '#fff');
        break;
      case 'calm':
        root.style.setProperty('--background-main', '#5f8bff');
        root.style.setProperty('--background-chat', '#5f8bff');
        root.style.setProperty('--background-panel', '#5f8bff');
        root.style.setProperty('--background-glass', '#5f8bff');
        root.style.setProperty('--text-main', '#fff');
        root.style.setProperty('--text-secondary', '#fff');
        root.style.setProperty('--accent-blue', '#5f8bff');
        root.style.setProperty('--accent-purple', '#5f8bff');
        root.style.setProperty('--accent-turquoise', '#5f8bff');
        break;
      case 'joyful':
        root.style.setProperty('--background-main', '#ff9900');
        root.style.setProperty('--background-chat', '#ff9900');
        root.style.setProperty('--background-panel', '#ff9900');
        root.style.setProperty('--background-glass', '#ff9900');
        root.style.setProperty('--text-main', '#fff');
        root.style.setProperty('--text-secondary', '#fff');
        root.style.setProperty('--accent-blue', '#ff9900');
        root.style.setProperty('--accent-purple', '#ff9900');
        root.style.setProperty('--accent-turquoise', '#ff9900');
        break;
      case 'nature':
        root.style.setProperty('--background-main', '#00c853');
        root.style.setProperty('--background-chat', '#00c853');
        root.style.setProperty('--background-panel', '#00c853');
        root.style.setProperty('--background-glass', '#00c853');
        root.style.setProperty('--text-main', '#fff');
        root.style.setProperty('--text-secondary', '#fff');
        root.style.setProperty('--accent-blue', '#00c853');
        root.style.setProperty('--accent-purple', '#00c853');
        root.style.setProperty('--accent-turquoise', '#00c853');
        break;
      default:
        // fallback to dark
        root.style.setProperty('--background-main', '#000');
        root.style.setProperty('--background-chat', '#000');
        root.style.setProperty('--background-panel', '#000');
        root.style.setProperty('--background-glass', '#000');
        root.style.setProperty('--text-main', '#fff');
        root.style.setProperty('--text-secondary', '#fff');
        root.style.setProperty('--accent-blue', '#000');
        root.style.setProperty('--accent-purple', '#000');
        root.style.setProperty('--accent-turquoise', '#000');
        break;
    }
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