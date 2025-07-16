import React, { useState } from 'react';
import { useAppContext, themesConfig } from '../context/AppContext';
import { User, Palette, BookOpen, Calendar, Bell, TrendingUp, Mic, Shield, X } from 'lucide-react';

const RightPanel: React.FC = () => {
  const { user, theme, setTheme, moodData, setMoodData } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [dailyMood, setDailyMood] = useState(7);
  const [dailyEmotion, setDailyEmotion] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [showEntries, setShowEntries] = useState(false);
  const [entries, setEntries] = useState<{date: string, content: string}[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<{date: string, content: string} | null>(null);
  const [search, setSearch] = useState('');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'checkin', label: 'Check-In', icon: Calendar },
    { id: 'reminders', label: 'Reminders', icon: Bell },
  ];

  // Remove 'light' and rearrange the other 4 themes
  const themes = [
    { id: 'dark', name: 'Dark' },
    { id: 'calm', name: 'Calm' },
    { id: 'joyful', name: 'Joyful' },
    { id: 'nature', name: 'Nature' },
  ];

  const emotions = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'text-yellow-400' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'text-blue-400' },
    { id: 'excited', label: 'Excited', emoji: '🤗', color: 'text-orange-400' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'text-red-400' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: 'text-gray-400' },
    { id: 'grateful', label: 'Grateful', emoji: '🙏', color: 'text-purple-400' },
  ];

  const handleMoodSubmit = () => {
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: dailyMood,
      emotion: dailyEmotion,
    };
    setMoodData([...moodData, newEntry]);
    setDailyMood(7);
    setDailyEmotion('');
  };

  // Load entries from localStorage on mount and when journalEntry changes
  React.useEffect(() => {
    const allEntries: {date: string, content: string}[] = [];
    Object.keys(localStorage)
      .filter(key => key.endsWith('.txt'))
      .forEach(key => {
        allEntries.push({ date: key.replace('.txt', ''), content: localStorage.getItem(key) || '' });
      });
    allEntries.sort((a, b) => b.date.localeCompare(a.date));
    setEntries(allEntries);
  }, [journalEntry]);

  // Save journal entry as file
  const handleSaveEntry = () => {
    const date = new Date().toISOString().split('T')[0];
    if (journalEntry.trim()) {
      localStorage.setItem(`${date}.txt`, journalEntry);
      setJournalEntry('');
      setEntries(prev => [{date, content: journalEntry}, ...prev.filter(e => e.date !== date)]);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{user?.name}</h3>
        <p className="text-slate-400">{user?.email}</p>
      </div>

      <div className="glass-card p-4 rounded-2xl border border-white/10">
        <h4 className="font-semibold text-white mb-3">Your Progress</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Days Active</span>
            <span className="text-blue-400 font-semibold">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Sessions</span>
            <span className="text-green-400 font-semibold">28</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Mood Streak</span>
            <span className="text-purple-400 font-semibold">5 days</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 rounded-2xl border border-white/10">
        <h4 className="font-semibold text-white mb-3">Emotional Profile</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-slate-300 text-sm">Stress Expression: {user?.emotionalProfile?.stressExpression}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-slate-300 text-sm">Life Phase: {user?.emotionalProfile?.lifePhase}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThemesTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Choose Your Theme</h3>
      <div className="grid grid-cols-1 gap-3">
        {themes.map((themeOption) => {
          const isActive = theme === themeOption.id;
          const config = themesConfig[themeOption.id];
          return (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 flex items-center group relative overflow-hidden ${
                isActive
                  ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/20 animate-pulse-glow shadow-lg'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
              style={isActive ? { boxShadow: `0 0 0 3px ${config.accent}55, 0 0 16px 2px ${config.accent}55` } : {}}
            >
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1 relative">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      background:
                        themeOption.id === 'dark' ? '#000' :
                        themeOption.id === 'calm' ? '#5f8bff' :
                        themeOption.id === 'joyful' ? '#ff9900' :
                        themeOption.id === 'nature' ? '#00c853' :
                        '#000'
                    }}
                  ></div>
                  {isActive && (
                    <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[var(--accent-color)] animate-pulse-glow z-10 bg-[var(--accent-color)]/30">
                      <span className="block w-2 h-2 m-auto mt-1 rounded-full bg-white animate-ping"></span>
                    </span>
                  )}
                </div>
                <span className="text-white font-medium">{themeOption.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderJournalTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Private Journal</h3>
      <div className="space-y-4">
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="How are you feeling today? What's on your mind?"
          className="w-full h-32 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
        />
        <button className="modern-btn w-full mt-2" onClick={handleSaveEntry}>
          Save Entry
        </button>
      </div>
      {/* My Entries Collapsible */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 mt-4">
        <button
          className="w-full flex justify-between items-center text-white font-semibold text-base focus:outline-none transition-colors duration-200 hover:bg-white/5 rounded-xl px-2 py-2"
          onClick={() => setShowEntries(v => !v)}
        >
          <span>My Entries</span>
          <span className={`transition-transform duration-300 ${showEntries ? 'rotate-90' : ''}`}>▶</span>
        </button>
        {showEntries && (
          <div className="mt-3 max-h-56 overflow-y-auto transition-all duration-300">
            <input
              type="text"
              placeholder="Search entries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full mb-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
            />
            <ul className="divide-y divide-white/10">
              {entries.filter(e => e.date.includes(search)).length === 0 && (
                <li className="text-slate-400 py-4 text-center">No entries found.</li>
              )}
              {entries.filter(e => e.date.includes(search)).map(entry => (
                <li
                  key={entry.date}
                  className="py-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-blue-900/30 active:bg-blue-900/50 text-white flex items-center justify-between"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <span>{entry.date}.txt</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Entry Preview Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#181a20] rounded-2xl shadow-2xl p-6 max-w-lg w-full relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
              onClick={() => setSelectedEntry(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h4 className="text-lg font-bold text-white mb-2">{selectedEntry.date}.txt</h4>
            <pre className="whitespace-pre-wrap text-slate-200 bg-black/10 rounded-lg p-4 max-h-72 overflow-y-auto border border-white/10">
              {selectedEntry.content}
            </pre>
          </div>
        </div>
      )}
      <div className="glass-card p-4 rounded-2xl border border-white/10 mt-4">
        <h4 className="font-semibold text-white mb-3">AI Suggestions</h4>
        <div className="space-y-2">
          <p className="text-slate-300 text-sm">💭 "Reflect on a moment today that brought you joy"</p>
          <p className="text-slate-300 text-sm">🌟 "What are three things you're grateful for?"</p>
          <p className="text-slate-300 text-sm">🎯 "What would you like to accomplish tomorrow?"</p>
        </div>
      </div>
    </div>
  );

  const renderCheckinTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Daily Check-In</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            How are you feeling today? (1-10)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="10"
              value={dailyMood}
              onChange={(e) => setDailyMood(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Struggling</span>
              <span className="text-lg font-bold text-white">{dailyMood}</span>
              <span>Thriving</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            What emotion best describes today?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {emotions.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => setDailyEmotion(emotion.id)}
                className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  dailyEmotion === emotion.id
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{emotion.emoji}</div>
                  <div className="text-xs">{emotion.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleMoodSubmit}
          disabled={!dailyEmotion}
          className="modern-btn w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Check-In
        </button>
      </div>

      {moodData.length > 0 && (
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <h4 className="font-semibold text-white mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Recent Mood Trends
          </h4>
          <div className="space-y-2">
            {moodData.slice(-5).map((entry, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">{entry.date}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">{entry.mood}/10</span>
                  <span className="text-xs text-slate-400">{entry.emotion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRemindersTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Reminders</h3>
      
      <div className="space-y-4">
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <h4 className="font-semibold text-white mb-3">Daily Check-In</h4>
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Remind me daily at</span>
            <input
              type="time"
              defaultValue="09:00"
              className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <h4 className="font-semibold text-white mb-3">Journaling</h4>
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Remind me daily at</span>
            <input
              type="time"
              defaultValue="20:00"
              className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <h4 className="font-semibold text-white mb-3">Chat Session</h4>
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Remind me to chat</span>
            <select className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500/50">
              <option>Daily</option>
              <option>Every 2 days</option>
              <option>Weekly</option>
              <option>Never</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 rounded-2xl border border-white/10">
        <h4 className="font-semibold text-white mb-3">Emergency Contact</h4>
        <p className="text-slate-300 text-sm mb-3">
          If you're in crisis, AVA can help you connect with professional support
        </p>
        <button className="modern-btn w-full mt-2">
          <Shield className="w-4 h-4 inline mr-2" />
          Emergency Support
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'themes':
        return renderThemesTab();
      case 'journal':
        return renderJournalTab();
      case 'checkin':
        return renderCheckinTab();
      case 'reminders':
        return renderRemindersTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="right-panel h-full flex flex-col">
      {/* Vertical Tab Navigation */}
      <div className="vertical-nav">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'active' : ''}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <IconComponent className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default RightPanel;