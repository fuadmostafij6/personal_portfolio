import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Heart, 
  Code, 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  Zap,
  Target,
  Award,
  Gamepad2,
  Sparkles,
  Crown,
  Medal
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Skill {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  category: string;
}

function App() {
  const [playerLevel, setPlayerLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(100);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-visit',
      name: 'First Steps',
      description: 'Visit the portfolio for the first time',
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'skill-master',
      name: 'Skill Master',
      description: 'Reach level 5 in any skill',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'portfolio-explorer',
      name: 'Portfolio Explorer',
      description: 'Click on all sections',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      unlocked: false,
      progress: 0,
      maxProgress: 4
    },
    {
      id: 'social-butterfly',
      name: 'Social Butterfly',
      description: 'Connect on all social platforms',
      icon: <Heart className="w-6 h-6 text-red-500" />,
      unlocked: false,
      progress: 0,
      maxProgress: 3
    }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { name: 'React', level: 1, experience: 0, maxExperience: 100, category: 'Frontend' },
    { name: 'TypeScript', level: 1, experience: 0, maxExperience: 100, category: 'Frontend' },
    { name: 'Node.js', level: 1, experience: 0, maxExperience: 100, category: 'Backend' },
    { name: 'Python', level: 1, experience: 0, maxExperience: 100, category: 'Backend' },
    { name: 'UI/UX Design', level: 1, experience: 0, maxExperience: 100, category: 'Design' },
    { name: 'DevOps', level: 1, experience: 0, maxExperience: 100, category: 'Infrastructure' }
  ]);

  const [activeSection, setActiveSection] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);

  // Add experience and check for level up
  const addExperience = (amount: number) => {
    const newExp = experience + amount;
    setExperience(newExp);
    
    if (newExp >= maxExperience) {
      const newLevel = playerLevel + 1;
      setPlayerLevel(newLevel);
      setExperience(newExp - maxExperience);
      setMaxExperience(Math.floor(maxExperience * 1.5));
      showAchievementNotification(`🎉 Level Up! You're now level ${newLevel}!`);
      createParticles();
    }
  };

  // Show achievement notification
  const showAchievementNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Create particle effects
  const createParticles = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  // Unlock achievement
  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id && !achievement.unlocked) {
        showAchievementNotification(`🏆 Achievement Unlocked: ${achievement.name}!`);
        createParticles();
        return { ...achievement, unlocked: true, progress: achievement.maxProgress };
      }
      return achievement;
    }));
  };

  // Add skill experience
  const addSkillExperience = (skillName: string, amount: number) => {
    setSkills(prev => prev.map(skill => {
      if (skill.name === skillName) {
        const newExp = skill.experience + amount;
        if (newExp >= skill.maxExperience) {
          const newLevel = skill.level + 1;
          showAchievementNotification(`⚡ ${skill.name} leveled up to ${newLevel}!`);
          createParticles();
          return {
            ...skill,
            level: newLevel,
            experience: newExp - skill.maxExperience,
            maxExperience: Math.floor(skill.maxExperience * 1.2)
          };
        }
        return { ...skill, experience: newExp };
      }
      return skill;
    }));
  };

  // Handle section click
  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    addExperience(10);
    
    // Update portfolio explorer achievement
    const visitedSections = new Set(['home', 'about', 'skills', 'projects', 'contact']);
    const currentVisited = visitedSections.has(section) ? 1 : 0;
    
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === 'portfolio-explorer') {
        const newProgress = Math.min(achievement.progress + currentVisited, achievement.maxProgress);
        if (newProgress === achievement.maxProgress && !achievement.unlocked) {
          unlockAchievement('portfolio-explorer');
        }
        return { ...achievement, progress: newProgress };
      }
      return achievement;
    }));
  };

  // Handle social link click
  const handleSocialClick = (platform: string) => {
    addExperience(15);
    showAchievementNotification(`🔗 Connected on ${platform}!`);
    
    // Update social butterfly achievement
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === 'social-butterfly') {
        const newProgress = Math.min(achievement.progress + 1, achievement.maxProgress);
        if (newProgress === achievement.maxProgress && !achievement.unlocked) {
          unlockAchievement('social-butterfly');
        }
        return { ...achievement, progress: newProgress };
      }
      return achievement;
    }));
  };

  // Initialize first visit achievement
  useEffect(() => {
    unlockAchievement('first-visit');
    addExperience(20);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `translate(${particle.vx}px, ${particle.vy}px)`
          }}
        />
      ))}

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notificationMessage}
        </div>
      )}

      {/* Header with Player Stats */}
      <header className="bg-black/20 backdrop-blur-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Developer Quest
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">Level {playerLevel}</span>
              </div>
              <div className="w-32 bg-gray-700 rounded-full h-2 mt-1">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(experience / maxExperience) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-300">{experience}/{maxExperience} XP</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 backdrop-blur-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-center space-x-8">
          {[
            { id: 'home', name: '🏠 Home', icon: <Sparkles /> },
            { id: 'about', name: '👤 About', icon: <Heart /> },
            { id: 'skills', name: '⚡ Skills', icon: <Zap /> },
            { id: 'projects', name: '🚀 Projects', icon: <Code /> },
            { id: 'contact', name: '📧 Contact', icon: <Mail /> }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                activeSection === section.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {section.icon}
              <span>{section.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        {activeSection === 'home' && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome to Developer Quest!
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Embark on an epic journey through my portfolio. Click around to gain experience, 
                unlock achievements, and discover my skills and projects!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:scale-105 transition-transform">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Achievements</h3>
                <p className="text-gray-300">Unlock badges by exploring the portfolio</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:scale-105 transition-transform">
                <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Skill Tree</h3>
                <p className="text-gray-300">Level up your technical abilities</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:scale-105 transition-transform">
                <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Experience</h3>
                <p className="text-gray-300">Gain XP by interacting with content</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">👤 About the Developer</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">My Story</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm a passionate developer who loves creating amazing digital experiences. 
                  When I'm not coding, you can find me exploring new technologies, contributing 
                  to open source projects, or sharing knowledge with the developer community.
                </p>
                <button 
                  onClick={() => addExperience(25)}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Learn More (+25 XP)
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Achievements</h3>
                <div className="space-y-3">
                  {achievements.map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      {achievement.icon}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className={achievement.unlocked ? 'text-white' : 'text-gray-400'}>
                            {achievement.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">⚡ Skill Tree</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map(skill => (
                <div key={skill.name} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{skill.name}</h3>
                    <span className="text-sm bg-purple-600 px-2 py-1 rounded">{skill.category}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Level {skill.level}</span>
                      <span>{skill.experience}/{skill.maxExperience} XP</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(skill.experience / skill.maxExperience) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => addSkillExperience(skill.name, 20)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Train Skill (+20 XP)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">🚀 Epic Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', difficulty: 'Hard' },
                { name: 'Task Management App', tech: 'Vue.js, Express, PostgreSQL', difficulty: 'Medium' },
                { name: 'Weather Dashboard', tech: 'React, TypeScript, APIs', difficulty: 'Easy' },
                { name: 'Social Media Clone', tech: 'React Native, Firebase', difficulty: 'Hard' },
                { name: 'Portfolio Website', tech: 'React, Tailwind CSS', difficulty: 'Easy' },
                { name: 'AI Chat Bot', tech: 'Python, TensorFlow, Flask', difficulty: 'Hard' }
              ].map((project, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:scale-105 transition-transform">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.difficulty === 'Hard' ? 'bg-red-600' :
                      project.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{project.tech}</p>
                  <button 
                    onClick={() => addExperience(30)}
                    className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    View Project (+30 XP)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">📧 Let's Connect!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                <p className="text-gray-300 mb-6">
                  Ready to start a new quest together? Let's collaborate on amazing projects!
                </p>
                <button 
                  onClick={() => addExperience(40)}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors"
                >
                  Send Message (+40 XP)
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Social Links</h3>
                <div className="space-y-4">
                  {[
                    { name: 'GitHub', icon: <Github />, url: 'https://github.com' },
                    { name: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com' },
                    { name: 'Email', icon: <Mail />, url: 'mailto:contact@example.com' }
                  ].map(social => (
                    <button
                      key={social.name}
                      onClick={() => handleSocialClick(social.name)}
                      className="flex items-center space-x-3 w-full bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors"
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm p-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>🎮 Developer Quest - Level up your portfolio experience!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
