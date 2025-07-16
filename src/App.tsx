import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Landing from './components/Landing';
import Signup from './components/Signup';
import AISetup from './components/AISetup';
import Dashboard from './components/Dashboard';
import './App.css';

function AppContent() {
  const { currentScreen, theme, user, aiFriends } = useAppContext();

  // User is logged in if user object exists and not on landing/signup
  const userIsLoggedIn = !!user && currentScreen !== 'landing' && currentScreen !== 'signup';
  // Emotional details filled if user has emotionalProfile (customize as needed)
  const emotionalDetailsFilled = !!user?.emotionalProfile;

  useEffect(() => {
    if (userIsLoggedIn && emotionalDetailsFilled) {
      const existingScript = document.getElementById('omnidimension-web-widget');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'omnidimension-web-widget';
        script.async = true;
        script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=52d0f9e312c4bec28ca984c015c22be4';
        document.body.appendChild(script);
        script.onload = () => {
          const style = document.createElement('style');
          style.innerHTML = `
            [id*="omnidim-widget-button"] span,
            [id*="omnidim-widget-button"] div:not(:has(svg)) {
              display: none !important;
            }
          `;
          document.head.appendChild(style);
        };
      }
    }
  }, [userIsLoggedIn, emotionalDetailsFilled]);

  const onboardingComplete =
    user &&
    currentScreen === 'dashboard' &&
    aiFriends &&
    aiFriends.length > 0;

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
        {/* The floating agent button is now handled by the Omni widget, so remove the old button */}
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