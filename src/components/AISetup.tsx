import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Bot, Sparkles, Heart, Smile, Wind, Lightbulb } from 'lucide-react';

const AISetup: React.FC = () => {
  const { setCurrentScreen, setAiFriends, setCurrentAIFriend, user } = useAppContext();
  const [aiName, setAiName] = useState('Ava');
  const [selectedEmotions, setSelectedEmotions] = useState({
    empathy: true,
    humor: false,
    calm: true,
    playful: false,
    wisdom: false,
    energy: false,
    patience: true,
    creativity: false,
    supportive: true,
    analytical: false,
  });

  const emotionOptions = [
    { key: 'empathy', label: 'Empathy', icon: Heart, color: 'text-red-400' },
    { key: 'humor', label: 'Humor', icon: Smile, color: 'text-yellow-400' },
    { key: 'calm', label: 'Calm', icon: Wind, color: 'text-blue-400' },
    { key: 'playful', label: 'Playful', icon: Sparkles, color: 'text-purple-400' },
    { key: 'wisdom', label: 'Wisdom', icon: Lightbulb, color: 'text-orange-400' },
    { key: 'energy', label: 'Energy', icon: Sparkles, color: 'text-green-400' },
    { key: 'patience', label: 'Patience', icon: Heart, color: 'text-teal-400' },
    { key: 'creativity', label: 'Creativity', icon: Sparkles, color: 'text-pink-400' },
    { key: 'supportive', label: 'Supportive', icon: Heart, color: 'text-indigo-400' },
    { key: 'analytical', label: 'Analytical', icon: Lightbulb, color: 'text-gray-400' },
  ];

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => ({
      ...prev,
      [emotion]: !prev[emotion as keyof typeof prev]
    }));
  };

  const getThemeFromEmotions = () => {
    const activeEmotions = Object.entries(selectedEmotions)
      .filter(([_, active]) => active)
      .map(([emotion, _]) => emotion);

    if (activeEmotions.includes('calm') && activeEmotions.includes('empathy')) {
      return 'calm-empathy';
    } else if (activeEmotions.includes('playful') && activeEmotions.includes('humor')) {
      return 'playful-humor';
    } else if (activeEmotions.includes('wisdom') && activeEmotions.includes('analytical')) {
      return 'wise-analytical';
    } else if (activeEmotions.includes('energy') && activeEmotions.includes('creativity')) {
      return 'energetic-creative';
    } else {
      return 'balanced';
    }
  };

  const handleComplete = () => {
    const newFriend = {
      id: Date.now().toString(),
      name: aiName,
      emotions: selectedEmotions,
      theme: getThemeFromEmotions(),
      conversations: [],
    };

    setAiFriends([newFriend]);
    setCurrentAIFriend(newFriend);
    setCurrentScreen('dashboard');
  };

  const getPreviewMessage = () => {
    const activeEmotions = Object.entries(selectedEmotions)
      .filter(([_, active]) => active)
      .map(([emotion, _]) => emotion);

    if (activeEmotions.includes('calm') && activeEmotions.includes('empathy')) {
      return `Hello ${user?.name || 'there'}, I'm ${aiName}. I'm here to listen and provide a peaceful space for you to share your thoughts. How are you feeling today? 🌊`;
    } else if (activeEmotions.includes('playful') && activeEmotions.includes('humor')) {
      return `Hey ${user?.name || 'friend'}! I'm ${aiName}, and I'm super excited to chat with you! I love bringing smiles and finding the bright side of things. What's making you happy today? ✨`;
    } else if (activeEmotions.includes('wisdom') && activeEmotions.includes('analytical')) {
      return `Greetings ${user?.name || 'seeker'}. I'm ${aiName}, and I'm here to help you think through challenges with clarity and insight. What would you like to explore together? 🧠`;
    } else {
      return `Hi ${user?.name || 'there'}! I'm ${aiName}, your AI companion. I'm here to support you on your emotional journey. How can I help you today? 💙`;
    }
  };

  return (
    <div className="dark-bg-gradient flex items-center justify-center p-6" style={{color: 'var(--text-primary)'}}>
      <div className="w-full max-w-4xl">
        <div className="glass-card p-8 rounded-3xl border border-white/10 backdrop-blur-sm" style={{background: 'var(--background-secondary)', color: 'var(--text-primary)'}}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Bot className="w-16 h-16" style={{color: 'var(--accent-color)'}} />
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{color: 'var(--text-primary)'}}>
              Let's Meet Your Emotional Companion
            </h1>
            <p className="text-lg" style={{color: 'var(--text-secondary)'}}>
              Customize your AI friend's personality to match your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Configuration */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  What would you like to call your AI companion?
                </label>
                <input
                  type="text"
                  value={aiName}
                  onChange={(e) => setAiName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Enter a name..."
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Choose their emotional traits:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {emotionOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isActive = selectedEmotions[option.key as keyof typeof selectedEmotions];
                    return (
                      <button
                        key={option.key}
                        onClick={() => toggleEmotion(option.key)}
                        className={`emotion-btn${isActive ? ' active' : ''}`}
                        data-emotion={option.key}
                        type="button"
                        tabIndex={0}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
                <div className="glass-card p-6 rounded-2xl border border-white/10 bg-[#181a22]">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{aiName}</h4>
                      <p className="text-xs text-slate-300">AI Companion</p>
                    </div>
                  </div>
                  <div className="bg-[#23243a] p-4 rounded-xl">
                    <p className="text-white text-sm leading-relaxed">
                      {getPreviewMessage()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Active Traits:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedEmotions)
                    .filter(([_, active]) => active)
                    .map(([emotion, _]) => {
                      const option = emotionOptions.find(opt => opt.key === emotion);
                      if (!option) return null;
                      
                      const IconComponent = option.icon;
                      return (
                        <div
                          key={emotion}
                          className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20 relative group"
                        >
                          <IconComponent className={`w-4 h-4 ${option.color}`} />
                          <span className="text-sm text-white">{option.label}</span>
                          <button
                            type="button"
                            aria-label={`Remove ${option.label}`}
                            className="ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-white/10 border border-white/30 text-white text-xs font-bold opacity-80 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 hover:bg-pink-500/80 hover:text-white hover:shadow-[0_0_8px_2px_rgba(236,72,153,0.7)] focus:ring-2 focus:ring-pink-400/60 focus:outline-none"
                            onClick={() => setSelectedEmotions(prev => ({ ...prev, [emotion]: false }))}
                            tabIndex={0}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentScreen('signup')}
              className="px-6 py-3 text-slate-400 hover:text-white transition-colors duration-300"
            >
              Back
            </button>

            <button
              onClick={handleComplete}
              className="button-primary px-8 py-4 meet-btn"
              type="button"
            >
              Meet {aiName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISetup;