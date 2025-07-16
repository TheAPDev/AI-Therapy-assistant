import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emotionalProfile?: {
    stressExpression: string;
    lifePhase: string;
    additionalInfo?: string;
  };
}

interface AIFriend {
  id: string;
  name: string;
  emotions: {
    empathy: boolean;
    humor: boolean;
    calm: boolean;
    playful: boolean;
    wisdom: boolean;
    energy: boolean;
    patience: boolean;
    creativity: boolean;
    supportive: boolean;
    analytical: boolean;
  };
  theme: string;
  conversations: Message[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
  isVoice?: boolean;
}

interface AppContextType {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  aiFriends: AIFriend[];
  setAiFriends: (friends: AIFriend[]) => void;
  currentAIFriend: AIFriend | null;
  setCurrentAIFriend: (friend: AIFriend | null) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  moodData: { date: string; mood: number; emotion: string }[];
  setMoodData: (data: { date: string; mood: number; emotion: string }[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const themesConfig: Record<string, { background: string; text: string; accent: string }> = {
  dark: {
    background: '#000000',
    text: '#e0e0e6',
    accent: '#4f46e5',
  },
  light: {
    background: '#f4f5f7', // much softer, off-white
    text: '#23272f', // deep gray for best contrast
    accent: '#7c3aed',
  },
  calm: {
    background: '#eaf6fa',
    text: '#1e293b',
    accent: '#00bfa5',
  },
  joyful: {
    background: '#fff7e6',
    text: '#2d1b00',
    accent: '#ff9800',
  },
  nature: {
    background: '#e8f5e9',
    text: '#003d2e',
    accent: '#00c853',
  },
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [aiFriends, setAiFriends] = useState<AIFriend[]>([]);
  const [currentAIFriend, setCurrentAIFriend] = useState<AIFriend | null>(null);
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [moodData, setMoodData] = useState<{ date: string; mood: number; emotion: string }[]>([]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        setUser,
        aiFriends,
        setAiFriends,
        currentAIFriend,
        setCurrentAIFriend,
        theme,
        setTheme,
        isLoading,
        setIsLoading,
        moodData,
        setMoodData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};