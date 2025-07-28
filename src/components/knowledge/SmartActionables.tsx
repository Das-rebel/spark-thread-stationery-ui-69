import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Zap, 
  Calendar, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Star,
  Target
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

/**
 * Smart Actionables Component
 * 
 * This component provides AI-driven actionable suggestions based on user's recent bookmarks.
 * It analyzes saved content and generates personalized tasks, reminders, and learning paths.
 * 
 * Features:
 * - AI-generated actionable suggestions from bookmark content
 * - Task completion tracking with progress indicators
 * - Automated actions (calendar scheduling, reminders, follow-ups)
 * - Priority-based task organization
 * - Integration with user's learning goals and patterns
 */

interface Actionable {
  id: string;
  title: string;
  description: string;
  type: 'learn' | 'practice' | 'research' | 'create' | 'schedule' | 'follow-up';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'automated';
  estimatedTime: string;
  dueDate?: string;
  sourceBookmarks: string[];
  aiGenerated: boolean;
  automationType?: 'calendar' | 'reminder' | 'email' | 'research';
  progress: number;
  tags: string[];
}

export function SmartActionables() {
  // Demo actionables generated from user's bookmark patterns
  const [actionables, setActionables] = useState<Actionable[]>([
    {
      id: '1',
      title: 'Complete React Hooks deep dive tutorial',
      description: 'Based on your saved React resources, spend 2 hours going through advanced hooks patterns',
      type: 'learn',
      priority: 'high',
      status: 'in-progress',
      estimatedTime: '2 hours',
      dueDate: '2024-01-20',
      sourceBookmarks: ['React Hooks Tutorial', 'Advanced Patterns'],
      aiGenerated: true,
      progress: 65,
      tags: ['React', 'Frontend', 'Learning']
    },
    {
      id: '2',
      title: 'Schedule ML fundamentals review session',
      description: 'AI noticed you saved 5 ML articles. Create a focused study session this weekend',
      type: 'schedule',
      priority: 'medium',
      status: 'automated',
      estimatedTime: '3 hours',
      dueDate: '2024-01-21',
      sourceBookmarks: ['ML Basics', 'Neural Networks', 'Algorithms'],
      aiGenerated: true,
      automationType: 'calendar',
      progress: 100,
      tags: ['ML', 'Study', 'Weekend']
    },
    {
      id: '3',
      title: 'Research Japanese design principles',
      description: 'Follow up on minimalism bookmarks with specific research on Japanese aesthetics',
      type: 'research',
      priority: 'low',
      status: 'pending',
      estimatedTime: '1 hour',
      sourceBookmarks: ['Minimalism', 'Design Principles'],
      aiGenerated: true,
      progress: 0,
      tags: ['Design', 'Research', 'Japanese']
    },
    {
      id: '4',
      title: 'Practice AI safety concepts',
      description: 'Apply the theoretical knowledge from your AI safety bookmarks to practical scenarios',
      type: 'practice',
      priority: 'high',
      status: 'pending',
      estimatedTime: '90 minutes',
      dueDate: '2024-01-19',
      sourceBookmarks: ['AI Safety Research', 'Ethics in AI'],
      aiGenerated: true,
      progress: 0,
      tags: ['AI', 'Safety', 'Practice']
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  // Filter actionables based on selected status
  const filteredActionables = actionables.filter(actionable => 
    filter === 'all' || actionable.status === filter
  );

  // Get priority color for visual indicators
  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600 bg-red-50 border-red-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
      low: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  // Get type icon for actionable
  const getTypeIcon = (type: string) => {
    const icons = {
      learn: Star,
      practice: Target,
      research: AlertCircle,
      create: Zap,
      schedule: Calendar,
      'follow-up': ArrowRight
    };
    return icons[type as keyof typeof icons] || Star;
  };

  // Get status color for progress indicators
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-muted-foreground',
      'in-progress': 'text-bamboo',
      completed: 'text-green-600',
      automated: 'text-purple-600'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  // Toggle actionable completion status
  const toggleActionableStatus = (id: string) => {
    setActionables(actionables.map(actionable =>
      actionable.id === id
        ? { 
            ...actionable, 
            status: actionable.status === 'completed' ? 'pending' : 'completed',
            progress: actionable.status === 'completed' ? 0 : 100
          }
        : actionable
    ));
  };

  // Start/pause actionable progress
  const toggleActionableProgress = (id: string) => {
    setActionables(actionables.map(actionable =>
      actionable.id === id
        ? { 
            ...actionable, 
            status: actionable.status === 'in-progress' ? 'pending' : 'in-progress'
          }
        : actionable
    ));
  };

  return (
    <div className="space-y-6">
      {/* Smart Actionables Header */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Smart Actionables</h2>
          <Badge variant="secondary" className="ml-auto">
            <Target className="w-3 h-3 mr-1" />
            AI-Driven
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          AI analyzes your bookmarks to suggest actionable next steps. Complete tasks to unlock more personalized suggestions.
        </p>

        {/* Actionables Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-primary">{actionables.filter(a => a.status === 'pending').length}</div>
            <div className="text-sm text-muted-foreground">Pending Tasks</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-bamboo">{actionables.filter(a => a.status === 'in-progress').length}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-green-600">{actionables.filter(a => a.status === 'completed').length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-purple-600">{actionables.filter(a => a.automationType).length}</div>
            <div className="text-sm text-muted-foreground">Automated</div>
          </div>
        </div>
      </Card>

      {/* Filter Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-ink">Filter:</span>
        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status as any)}
            className={filter === status ? "bg-gradient-sakura text-white" : ""}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
          </Button>
        ))}
      </div>

      {/* Actionables List */}
      <div className="space-y-4">
        {filteredActionables.map((actionable) => {
          const TypeIcon = getTypeIcon(actionable.type);
          
          return (
            <Card key={actionable.id} className="paper-card p-6">
              <div className="space-y-4">
                {/* Actionable Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${getPriorityColor(actionable.priority)}`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-ink">{actionable.title}</h3>
                        {actionable.aiGenerated && (
                          <Badge variant="secondary" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                        {actionable.automationType && (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            Auto: {actionable.automationType}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{actionable.description}</p>
                      
                      {/* Progress Bar */}
                      {actionable.progress > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <Progress value={actionable.progress} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">{actionable.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className={`text-sm font-medium ${getStatusColor(actionable.status)}`}>
                    {actionable.status.replace('-', ' ')}
                  </div>
                </div>

                {/* Actionable Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {actionable.estimatedTime}
                  </div>
                  {actionable.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due {actionable.dueDate}
                    </div>
                  )}
                  <div>
                    {actionable.sourceBookmarks.length} source bookmark{actionable.sourceBookmarks.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {actionable.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {actionable.status !== 'completed' && (
                    <Button
                      size="sm"
                      onClick={() => toggleActionableProgress(actionable.id)}
                      className={actionable.status === 'in-progress' 
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" 
                        : "bg-gradient-bamboo text-white"
                      }
                    >
                      {actionable.status === 'in-progress' ? (
                        <>
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActionableStatus(actionable.id)}
                  >
                    {actionable.status === 'completed' ? (
                      <>
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reopen
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Complete
                      </>
                    )}
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    View Sources
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Suggestions Footer */}
      <Card className="paper-card p-4 bg-gradient-to-r from-washi to-background">
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">
            AI will generate new actionables as you save more bookmarks. 
            Complete tasks to improve suggestion accuracy.
          </span>
        </div>
      </Card>
    </div>
  );
}