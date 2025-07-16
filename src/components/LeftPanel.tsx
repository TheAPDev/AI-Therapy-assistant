import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Bot, Plus, Heart, Smile, Wind, Lightbulb, Sparkles } from 'lucide-react';

const LeftPanel: React.FC = () => {
  const { aiFriends, currentAIFriend, setCurrentAIFriend, setAiFriends } = useAppContext();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendEmotions, setNewFriendEmotions] = useState({
    empathy: false,
    humor: false,
    calm: false,
    playful: false,
    wisdom: false,
    energy: false,
    patience: false,
    creativity: false,
    supportive: false,
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

  const getThemeFromEmotions = (emotions: typeof newFriendEmotions) => {
    const activeEmotions = Object.entries(emotions)
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

  const handleCreateFriend = () => {
    if (!newFriendName.trim()) return;

    const newFriend = {
      id: Date.now().toString(),
      name: newFriendName,
      emotions: newFriendEmotions,
      theme: getThemeFromEmotions(newFriendEmotions),
      conversations: [],
    };

    setAiFriends([...aiFriends, newFriend]);
    setNewFriendName('');
    setNewFriendEmotions({
      empathy: false,
      humor: false,
      calm: false,
      playful: false,
      wisdom: false,
      energy: false,
      patience: false,
      creativity: false,
      supportive: false,
      analytical: false,
    });
    setShowCreateForm(false);
  };

  const toggleEmotion = (emotion: string) => {
    setNewFriendEmotions(prev => ({
      ...prev,
      [emotion]: !prev[emotion as keyof typeof prev]
    }));
  };

  return (
    <div className="left-panel h-full p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{color: 'var(--text-primary)'}}>Your Companions</h2>
          <p className="text-sm" style={{color: 'var(--text-secondary)'}}>Choose your AI friend</p>
        </div>

        {/* AI Friends List */}
        <div className="space-y-3">
          {aiFriends.map((friend) => (
            <button
              key={friend.id}
              className={`modern-btn w-full text-left ${currentAIFriend?.id === friend.id ? 'ring-2 ring-[var(--accent-color)]' : ''}`}
              style={{background: 'var(--background-secondary)', color: 'var(--text-primary)'}}>
              <span className="font-semibold">{friend.name}</span>
            </button>
          ))}
        </div>

        {/* Create New Friend Button */}
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full p-4 rounded-2xl border-2 border-dashed border-white/30 bg-white/5 text-slate-300 hover:border-white/50 hover:bg-white/10 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create New Friend</span>
          </div>
        </button>

        {/* Create Friend Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-3xl border border-white/10 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Create New AI Friend</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Friend's Name
                  </label>
                  <input
                    type="text"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Enter a name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Emotional Traits
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {emotionOptions.map((option) => {
                      const IconComponent = option.icon;
                      const isActive = newFriendEmotions[option.key as keyof typeof newFriendEmotions];
                      
                      return (
                        <button
                          key={option.key}
                          onClick={() => toggleEmotion(option.key)}
                          className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                            isActive
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <IconComponent className={`w-4 h-4 ${option.color}`} />
                            <span className="text-xs font-medium">{option.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFriend}
                  disabled={!newFriendName.trim()}
                  className="button-primary px-6 py-3 font-semibold"
                  type="button"
                >
                  Create Friend
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;