import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Brain, Sparkles, Heart, Shield } from 'lucide-react';

const Landing: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="onboarding-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Radial logo glow */}
      <div className="onboarding-logo-glow" aria-hidden="true"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Logo and brand */}
        <div className="mb-8 animate-fade-in relative flex flex-col items-center">
          <div className="flex items-center justify-center mb-4 relative">
            <div className="relative">
              <Brain className="w-20 h-20 text-[#00C6FF] onboarding-card-icon" />
              <Sparkles className="w-7 h-7 text-[#9D4EDD] absolute -top-3 -right-3 onboarding-card-icon animate-bounce" />
            </div>
          </div>
          <h1 className="onboarding-title mb-2 tracking-tight">AVA</h1>
          <p className="onboarding-subtext">Your AI Emotional Companion</p>
        </div>

        {/* Hero content */}
        <div className="mb-12 animate-fade-in delay-300">
          <h2 className="onboarding-title mb-4" style={{fontSize: '2.1rem', fontWeight: 700}}>
            Experience the future of<br />
            <span className="onboarding-gradient">emotional well-being</span>
          </h2>
          <p className="onboarding-subtext max-w-2xl mx-auto">
            AVA provides personalized AI therapy assistance, emotional support, and mindfulness guidance tailored to your unique needs and emotional journey.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in delay-500 w-full">
          <div className="onboarding-card p-7 flex flex-col items-center">
            <Heart className="w-10 h-10 text-[#00C6FF] onboarding-card-icon mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Emotional Intelligence</h3>
            <p className="text-cfcfcf text-sm">Advanced AI that understands and responds to your emotional state</p>
          </div>
          <div className="onboarding-card p-7 flex flex-col items-center">
            <Shield className="w-10 h-10 text-[#9D4EDD] onboarding-card-icon mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Safe Space</h3>
            <p className="text-cfcfcf text-sm">Complete privacy and confidentiality for your therapeutic journey</p>
          </div>
          <div className="onboarding-card p-7 flex flex-col items-center">
            <Sparkles className="w-10 h-10 text-[#00C6FF] onboarding-card-icon mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
            <p className="text-cfcfcf text-sm">Always available companion for your emotional needs</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-700 w-full">
          <button
            onClick={() => setCurrentScreen('signup')}
            onMouseEnter={() => setHoveredButton('signup')}
            onMouseLeave={() => setHoveredButton(null)}
            className="onboarding-btn w-full sm:w-auto"
            tabIndex={0}
          >
            Create New Account
          </button>
          <button
            onClick={() => setCurrentScreen('signup')}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
            className="onboarding-btn w-full sm:w-auto"
            tabIndex={0}
          >
            Log In
          </button>
        </div>

        {/* Subtle call to action */}
        <p className="onboarding-bottom animate-fade-in delay-1000">
          Join thousands who've found emotional balance with AVA
        </p>
      </div>
    </div>
  );
};

export default Landing;