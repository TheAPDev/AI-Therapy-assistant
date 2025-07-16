import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Send, Mic, MicOff, Volume2, VolumeX, MoreVertical, AlertCircle } from 'lucide-react';

const Chat: React.FC = () => {
  const { currentAIFriend, aiFriends, setAiFriends, user } = useAppContext();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergencyMode, setShowEmergencyMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentAIFriend?.conversations]);

  const handleSendMessage = () => {
    if (!message.trim() || !currentAIFriend) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    // Add user message to conversation
    const updatedFriends = aiFriends.map(friend =>
      friend.id === currentAIFriend.id
        ? { ...friend, conversations: [...friend.conversations, newMessage] }
        : friend
    );
    setAiFriends(updatedFriends);

    // Clear input
    setMessage('');

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai' as const,
        timestamp: new Date(),
      };

      const finalUpdatedFriends = updatedFriends.map(friend =>
        friend.id === currentAIFriend.id
          ? { ...friend, conversations: [...friend.conversations, aiMessage] }
          : friend
      );
      setAiFriends(finalUpdatedFriends);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string) => {
    if (!currentAIFriend) return "I'm here for you.";

    const activeEmotions = Object.entries(currentAIFriend.emotions)
      .filter(([_, active]) => active)
      .map(([emotion, _]) => emotion);

    // Emergency keywords detection
    const emergencyKeywords = ['suicide', 'kill myself', 'hurt myself', 'end it all', 'can\'t go on'];
    const isEmergency = emergencyKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    if (isEmergency) {
      return "I'm really concerned about you right now. What you're feeling is valid, but I want you to know that you don't have to go through this alone. Please consider reaching out to a crisis helpline or a trusted person in your life. Would you like me to help you find some resources?";
    }

    // Contextual responses based on emotions
    if (activeEmotions.includes('calm') && activeEmotions.includes('empathy')) {
      return `I hear you, ${user?.name}. That sounds really challenging. Take a deep breath with me - you're not alone in this. What would help you feel a bit more at peace right now? 🌊`;
    } else if (activeEmotions.includes('playful') && activeEmotions.includes('humor')) {
      return `Hey ${user?.name}! You know what? Life can be like a rollercoaster - lots of ups and downs, but that's what makes it interesting! Want to talk about what's been on your mind? I'm here to listen and maybe we can find some bright spots together! ✨`;
    } else if (activeEmotions.includes('wisdom') && activeEmotions.includes('analytical')) {
      return `${user?.name}, let's think through this together. What you're experiencing is part of the human condition. Sometimes stepping back and examining our thoughts can provide clarity. What specific aspect would you like to explore? 🧠`;
    } else if (activeEmotions.includes('supportive')) {
      return `I'm here for you, ${user?.name}. You've taken a brave step by sharing this with me. Remember, every feeling you have is valid, and you have more strength than you realize. What kind of support would feel most helpful right now? 💙`;
    } else {
      return `Thank you for sharing that with me, ${user?.name}. I'm here to listen and support you through whatever you're experiencing. How are you feeling right now? 🤗`;
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking);
    // Text-to-speech logic would go here
  };

  const handleEmergencyMode = () => {
    setShowEmergencyMode(true);
    // Emergency mode logic would go here
  };

  const getThemeClasses = () => {
    if (!currentAIFriend) return 'from-slate-800 to-slate-900';
    
    switch (currentAIFriend.theme) {
      case 'calm-empathy':
        return 'from-blue-800 to-blue-900';
      case 'playful-humor':
        return 'from-yellow-800 to-orange-900';
      case 'wise-analytical':
        return 'from-purple-800 to-purple-900';
      case 'energetic-creative':
        return 'from-green-800 to-teal-900';
      default:
        return 'from-slate-800 to-slate-900';
    }
  };

  if (!currentAIFriend) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-white mb-2">No AI Friend Selected</h2>
          <p className="text-slate-400">Choose a companion from the left panel to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="centre-panel flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {currentAIFriend.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-white">{currentAIFriend.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSpeakToggle}
              className={`modern-btn p-2 h-10 w-10 flex items-center justify-center ${isSpeaking ? 'ring-2 ring-[var(--accent-color)]' : ''}`}
              aria-label={isSpeaking ? 'Mute AI voice' : 'Enable AI voice'}
            >
              {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={handleEmergencyMode}
              className="modern-btn p-2 h-10 w-10 flex items-center justify-center border-red-400 text-red-400 hover:text-white hover:border-white"
              aria-label="Emergency mode"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
            <button className="modern-btn p-2 h-10 w-10 flex items-center justify-center" aria-label="More options">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 bg-gradient-to-b ${getThemeClasses()}`}>
        <div className="space-y-4">
          {/* Welcome message */}
          {currentAIFriend.conversations.length === 0 && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {currentAIFriend.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 border border-white/20">
                  <p className="text-white">
                    Hello {user?.name}! I'm {currentAIFriend.name}, and I'm here to support you on your emotional journey. How are you feeling today?
                  </p>
                </div>
                <p className="text-xs text-slate-400 mt-1">Just now</p>
              </div>
            </div>
          )}

          {/* Conversation messages */}
          {currentAIFriend.conversations.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-green-500 to-teal-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <span className="text-white text-sm font-bold">
                  {msg.sender === 'user' 
                    ? (user?.name?.charAt(0).toUpperCase() || 'U')
                    : currentAIFriend.name.charAt(0).toUpperCase()
                  }
                </span>
              </div>
              <div className="flex-1">
                <div className={`backdrop-blur-sm rounded-2xl p-4 border ${
                  msg.sender === 'user'
                    ? 'bg-green-500/20 rounded-tr-none border-green-500/30'
                    : 'bg-white/10 rounded-tl-none border-white/20'
                }`}>
                  <p className="text-white">{msg.text}</p>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {currentAIFriend.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 border border-white/20">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            />
            <button
              onClick={handleVoiceToggle}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-all duration-300 ${
                isRecording ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="button-primary px-4 py-3 rounded-2xl"
            type="button"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Emergency Mode Modal */}
      {showEmergencyMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-red-900/90 backdrop-blur-sm rounded-3xl border border-red-500/30 p-6 max-w-md w-full">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Emergency Support</h3>
              <p className="text-red-200 mb-6">
                If you're in immediate danger or having thoughts of self-harm, please reach out for professional help.
              </p>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition-all duration-300">
                  Call Crisis Helpline
                </button>
                <button className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition-all duration-300">
                  Find Local Resources
                </button>
                <button
                  onClick={() => setShowEmergencyMode(false)}
                  className="w-full px-4 py-3 text-red-200 hover:text-white transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;