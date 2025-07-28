import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Calendar, 
  Target, 
  TrendingUp, 
  Award, 
  Flame,
  BookOpen,
  Zap,
  Star,
  Trophy,
  ChevronRight,
  Brain,
  Coffee,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface LearningStreak {
  current: number;
  longest: number;
  lastActivity: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

interface DailyGoal {
  type: 'reading' | 'learning' | 'creating' | 'networking';
  target: number;
  current: number;
  unit: string;
  icon: React.ReactNode;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

export function EnhancedWelcomeScreen({ 
  userName = "Knowledge Explorer", 
  avatar = "🧠",
  className 
}: {
  userName?: string;
  avatar?: string;
  className?: string;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  
  const getGreeting = () => {
    if (currentHour < 6) return "Still up late";
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    if (currentHour < 22) return "Good evening";
    return "Working late";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Ready to expand your knowledge today?",
      "What brilliant insights await you?",
      "Time to turn curiosity into wisdom!",
      "Every bookmark is a step toward mastery.",
      "Your learning journey continues!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const learningStreak: LearningStreak = {
    current: 12,
    longest: 23,
    lastActivity: "2 hours ago"
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Knowledge Collector',
      description: 'Saved 100 bookmarks',
      icon: <BookOpen className="w-4 h-4" />,
      unlocked: true,
      unlockedAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintained 7-day learning streak',
      icon: <Flame className="w-4 h-4" />,
      unlocked: true,
      unlockedAt: 'yesterday'
    },
    {
      id: '3',
      title: 'AI Collaborator',
      description: 'Completed 10 AI-generated actionables',
      icon: <Zap className="w-4 h-4" />,
      unlocked: false,
      progress: 6,
      target: 10
    },
    {
      id: '4',
      title: 'Knowledge Sharer',
      description: 'Share knowledge with 5 collaborators',
      icon: <Trophy className="w-4 h-4" />,
      unlocked: false,
      progress: 2,
      target: 5
    }
  ];

  const dailyGoals: DailyGoal[] = [
    {
      type: 'reading',
      target: 30,
      current: 18,
      unit: 'minutes',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      type: 'learning',
      target: 3,
      current: 1,
      unit: 'actionables',
      icon: <Target className="w-4 h-4" />
    },
    {
      type: 'creating',
      target: 1,
      current: 0,
      unit: 'content piece',
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'Smart Search',
      description: 'Find anything in your knowledge',
      icon: <Brain className="w-5 h-5" />,
      action: () => {},
      color: 'bg-blue-500'
    },
    {
      title: 'Quick Capture',
      description: 'Save new bookmark',
      icon: <Sparkles className="w-5 h-5" />,
      action: () => {},
      color: 'bg-green-500'
    },
    {
      title: 'AI Assistant',
      description: 'Chat with your knowledge',
      icon: <Zap className="w-5 h-5" />,
      action: () => {},
      color: 'bg-purple-500'
    },
    {
      title: 'Today\'s Plan',
      description: 'View actionables',
      icon: <Calendar className="w-5 h-5" />,
      action: () => {},
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    { action: 'Completed', item: 'React Hooks tutorial', time: '2h ago', icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
    { action: 'Saved', item: 'AI Safety research paper', time: '4h ago', icon: <BookOpen className="w-4 h-4 text-blue-500" /> },
    { action: 'Created', item: 'ML learning roadmap', time: '1d ago', icon: <Target className="w-4 h-4 text-purple-500" /> }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Greeting Card */}
      <Card className="paper-card-floating p-8 bg-gradient-to-br from-sakura/20 via-washi to-bamboo/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-sakura rounded-full opacity-10 transform translate-x-8 -translate-y-8" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-ink rounded-2xl flex items-center justify-center text-2xl shadow-floating">
                {avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink mb-1">
                  {getGreeting()}, {userName}!
                </h2>
                <p className="text-muted-foreground">{getMotivationalMessage()}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
            
            {/* Weather/Status Widget */}
            <div className="text-center">
              <Coffee className="w-8 h-8 text-amber-600 mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Focus Mode</div>
            </div>
          </div>

          {/* Learning Streak Display */}
          <div className="bg-white/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink">{learningStreak.current} days</div>
                  <div className="text-sm text-muted-foreground">Learning streak</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-ink">Best: {learningStreak.longest} days</div>
                <div className="text-xs text-muted-foreground">Last: {learningStreak.lastActivity}</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-16 p-4 bg-white/50 hover:bg-white/80 transition-smooth border border-white/20"
                onClick={action.action}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-ink text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Daily Goals Progress */}
      <Card className="paper-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ink">Today's Goals</h3>
          <Badge variant="secondary" className="bg-gradient-bamboo text-white">
            <Target className="w-3 h-3 mr-1" />
            2/3 Active
          </Badge>
        </div>
        
        <div className="space-y-4">
          {dailyGoals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            const isCompleted = goal.current >= goal.target;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${isCompleted ? 'bg-green-100' : 'bg-muted'}`}>
                      {goal.icon}
                    </div>
                    <span className="text-sm font-medium text-ink capitalize">{goal.type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <Progress 
                  value={progress} 
                  className={`h-2 ${isCompleted ? 'bg-green-100' : ''}`}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Achievements */}
      <Card className="paper-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ink">Achievements</h3>
          <Button variant="ghost" size="sm">
            <span className="text-sm">View All</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {achievements.slice(0, 4).map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-smooth ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-gold/20 to-amber/20 border-gold/30' 
                  : 'bg-muted/50 border-muted'
              }`}
            >
              <div className="flex items-start gap-2">
                <div className={`p-1 rounded ${
                  achievement.unlocked ? 'bg-gold text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    achievement.unlocked ? 'text-ink' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.description}
                  </div>
                  {!achievement.unlocked && achievement.progress && achievement.target && (
                    <div className="mt-1">
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-1"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {achievement.progress}/{achievement.target}
                      </div>
                    </div>
                  )}
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-gold mt-1">
                      Unlocked {achievement.unlockedAt}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="paper-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ink">Recent Activity</h3>
          <div className="text-sm text-muted-foreground">Last 24 hours</div>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-washi rounded-lg">
              {activity.icon}
              <div className="flex-1">
                <span className="text-sm text-ink">
                  <span className="font-medium">{activity.action}</span> {activity.item}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}