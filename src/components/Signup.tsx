import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Mail, Phone, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

const Signup: React.FC = () => {
  const { setCurrentScreen, setUser } = useAppContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    stressExpression: '',
    lifePhase: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stressOptions = [
    { id: 'talk', label: 'I like to talk it out with someone', emoji: '💬' },
    { id: 'alone', label: 'I prefer to process things alone', emoji: '🤔' },
    { id: 'physical', label: 'I need physical activity or movement', emoji: '🏃' },
    { id: 'creative', label: 'I express myself through creativity', emoji: '🎨' },
  ];

  const lifePhaseOptions = [
    { id: 'growth', label: 'Focused on personal growth', emoji: '🌱' },
    { id: 'transition', label: 'Going through major life changes', emoji: '🔄' },
    { id: 'stability', label: 'Seeking more stability and balance', emoji: '⚖️' },
    { id: 'exploration', label: 'Exploring new possibilities', emoji: '🗺️' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (currentStep === 2) {
      if (!formData.name) newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const user = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      emotionalProfile: {
        stressExpression: formData.stressExpression,
        lifePhase: formData.lifePhase,
      },
    };
    setUser(user);
    setCurrentScreen('ai-setup');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-slate-400">Let's get you started with AVA</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">What's Your Name?</h2>
              <p className="text-slate-400">Help us personalize your experience</p>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Tell Us About You</h2>
              <p className="text-slate-400">Help AVA understand your emotional needs (optional)</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">How do you usually express stress?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {stressOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleInputChange('stressExpression', option.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                        formData.stressExpression === option.id
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Which describes your current life phase?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {lifePhaseOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleInputChange('lifePhase', option.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                        formData.lifePhase === option.id
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentScreen('ai-setup')}
                className="text-slate-400 hover:text-white transition-colors duration-300"
              >
                Skip for now
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
          {renderStep()}

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : setCurrentScreen('landing')}
              className="flex items-center space-x-2 px-6 py-3 text-slate-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === step ? 'bg-blue-500' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="button-primary flex items-center space-x-2"
              type="button"
            >
              <span>{step === 3 ? 'Complete' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;