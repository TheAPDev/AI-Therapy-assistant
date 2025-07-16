import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Chat from './Chat';
import { Menu, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentAIFriend, theme } = useAppContext();
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const getThemeClasses = () => {
    if (!currentAIFriend) return 'from-slate-900 to-slate-800';
    
    switch (currentAIFriend.theme) {
      case 'calm-empathy':
        return 'from-blue-900 to-slate-800';
      case 'playful-humor':
        return 'from-yellow-900 to-orange-800';
      case 'wise-analytical':
        return 'from-purple-900 to-slate-800';
      case 'energetic-creative':
        return 'from-green-900 to-teal-800';
      default:
        return 'from-slate-900 to-slate-800';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeClasses()} transition-all duration-1000`}>
      <div className="flex h-screen">
        {/* Mobile menu buttons */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            {leftPanelOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="lg:hidden fixed top-4 right-4 z-50">
          <button
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            {rightPanelOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Left Panel */}
        <div className={`
          ${leftPanelOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative absolute z-40 w-80 h-full
          transition-transform duration-300 ease-in-out
        `}>
          <LeftPanel />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <Chat />
        </div>

        {/* Right Panel */}
        <div className={`
          ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0 lg:relative absolute z-40 w-80 h-full right-0
          transition-transform duration-300 ease-in-out
        `}>
          <RightPanel />
        </div>

        {/* Mobile overlay */}
        {(leftPanelOpen || rightPanelOpen) && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={() => {
              setLeftPanelOpen(false);
              setRightPanelOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;