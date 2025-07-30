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
  Target,
  FileText,
  Users,
  Bell,
  TrendingUp,
  BookOpen,
  Share2,
  Filter,
  Plus,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Actionable {
  id: string;
  title: string;
  description: string;
  type: 'learn' | 'create' | 'research' | 'network' | 'reminder' | 'habit' | 'practice' | 'schedule' | 'follow-up';
  category: 'content-creation' | 'learning-path' | 'research-project' | 'networking' | 'productivity' | 'collaboration';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'automated';
  estimatedTime: string;
  dueDate?: string;
  sourceBookmarks: string[];
  aiGenerated: boolean;
  automationType?: 'calendar' | 'reminder' | 'email' | 'research' | 'notification';
  progress: number;
  tags: string[];
  template?: string;
  milestones?: string[];
  collaborators?: string[];
  completedMilestones?: number;
}

const actionableTemplates = {
  'content-creation': [
    'Blog Post from Research',
    'Presentation Builder',
    'Summary Generator',
    'Newsletter Compilation'
  ],
  'learning-path': [
    'Progressive Skill Building',
    'Topic Deep Dive',
    'Certification Track',
    'Practice Regimen'
  ],
  'research-project': [
    'Literature Review',
    'Competitive Analysis',
    'Market Research',
    'Technical Investigation'
  ],
  'networking': [
    'Expert Outreach',
    'Community Engagement',
    'Follow-up Sequences',
    'Connection Building'
  ],
  'productivity': [
    'Habit Formation',
    'Routine Optimization',
    'Goal Tracking',
    'Time Management'
  ],
  'collaboration': [
    'Team Knowledge Share',
    'Group Project',
    'Peer Review',
    'Mentorship Program'
  ]
};

export function EnhancedSmartActionables() {
  const [actionables, setActionables] = useState<Actionable[]>([
    {
      id: '1',
      title: 'Create comprehensive React Hooks guide',
      description: 'Transform your saved React resources into a detailed blog post covering advanced patterns and best practices',
      type: 'create',
      category: 'content-creation',
      priority: 'high',
      status: 'in-progress',
      estimatedTime: '4 hours',
      dueDate: '2024-01-25',
      sourceBookmarks: ['React Hooks Deep Dive', 'Advanced Patterns', 'Performance Tips'],
      aiGenerated: true,
      progress: 65,
      tags: ['React', 'Content', 'Tutorial'],
      template: 'Blog Post from Research',
      milestones: ['Outline Creation', 'Content Writing', 'Code Examples', 'Review & Edit'],
      completedMilestones: 2
    },
    {
      id: '2',
      title: 'Build Machine Learning fundamentals roadmap',
      description: 'Create a structured 12-week learning path from your ML bookmarks with progressive difficulty',
      type: 'learn',
      category: 'learning-path',
      priority: 'high',
      status: 'pending',
      estimatedTime: '2 hours setup + 12 weeks',
      dueDate: '2024-04-15',
      sourceBookmarks: ['ML Basics', 'Neural Networks', 'Deep Learning Course'],
      aiGenerated: true,
      progress: 0,
      tags: ['ML', 'Learning', 'Roadmap'],
      template: 'Progressive Skill Building',
      milestones: ['Foundation', 'Intermediate', 'Advanced', 'Practical Projects'],
      completedMilestones: 0
    },
    {
      id: '3',
      title: 'Connect with AI safety researchers',
      description: 'Reach out to 5 experts mentioned in your saved articles about AI safety and ethics',
      type: 'network',
      category: 'networking',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '3 hours',
      sourceBookmarks: ['AI Safety Research', 'Ethics Papers', 'Expert Interviews'],
      aiGenerated: true,
      progress: 0,
      tags: ['AI', 'Networking', 'Safety'],
      template: 'Expert Outreach',
      milestones: ['Research Contacts', 'Craft Messages', 'Send Outreach', 'Follow Up'],
      collaborators: ['Research Community'],
      completedMilestones: 0
    },
    {
      id: '4',
      title: 'Daily design inspiration habit',
      description: 'Build a routine to review and catalog design patterns from your saved Japanese design bookmarks',
      type: 'habit',
      category: 'productivity',
      priority: 'low',
      status: 'automated',
      estimatedTime: '15 minutes daily',
      sourceBookmarks: ['Japanese Design', 'Minimalism', 'UI Patterns'],
      aiGenerated: true,
      automationType: 'reminder',
      progress: 85,
      tags: ['Design', 'Habit', 'Daily'],
      template: 'Habit Formation',
      milestones: ['Setup Routine', 'Week 1', 'Week 2', 'Month Review'],
      completedMilestones: 3
    },
    {
      id: '5',
      title: 'Compile AI tools comparison report',
      description: 'Research and compare AI tools from your bookmarks to create a comprehensive evaluation document',
      type: 'research',
      category: 'research-project',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '6 hours',
      dueDate: '2024-02-01',
      sourceBookmarks: ['GPT Tools', 'AI Assistants', 'Automation Software'],
      aiGenerated: true,
      progress: 0,
      tags: ['AI', 'Research', 'Tools'],
      template: 'Competitive Analysis',
      milestones: ['Tool Inventory', 'Feature Matrix', 'Testing', 'Report Writing'],
      completedMilestones: 0
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredActionables = actionables.filter(actionable => {
    const statusMatch = filter === 'all' || actionable.status === filter;
    const categoryMatch = categoryFilter === 'all' || actionable.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      learn: BookOpen,
      create: FileText,
      research: AlertCircle,
      network: Users,
      reminder: Bell,
      habit: TrendingUp,
      practice: Target,
      schedule: Calendar,
      'follow-up': ArrowRight
    };
    return icons[type as keyof typeof icons] || Star;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'content-creation': 'bg-purple-100 text-purple-700 border-purple-200',
      'learning-path': 'bg-blue-100 text-blue-700 border-blue-200',
      'research-project': 'bg-green-100 text-green-700 border-green-200',
      'networking': 'bg-orange-100 text-orange-700 border-orange-200',
      'productivity': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'collaboration': 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const toggleActionableStatus = (id: string) => {
    setActionables(actionables.map(actionable =>
      actionable.id === id
        ? { 
            ...actionable, 
            status: actionable.status === 'completed' ? 'pending' : 'completed',
            progress: actionable.status === 'completed' ? actionable.completedMilestones || 0 * 25 : 100,
            completedMilestones: actionable.status === 'completed' ? actionable.completedMilestones : actionable.milestones?.length
          }
        : actionable
    ));
  };

  const ActionableCard = ({ actionable }: { actionable: Actionable }) => {
    const TypeIcon = getTypeIcon(actionable.type);
    const isExpanded = expandedCard === actionable.id;
    const milestoneProgress = actionable.milestones ? 
      ((actionable.completedMilestones || 0) / actionable.milestones.length) * 100 : 0;

    return (
      <Card className="paper-card p-6 hover:shadow-floating transition-smooth">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className={`p-2 rounded-lg ${getCategoryColor(actionable.category)}`}>
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
                  {actionable.template && (
                    <Badge variant="outline" className="text-xs">
                      {actionable.template}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{actionable.description}</p>
                
                {/* Progress */}
                <div className="space-y-2">
                  {actionable.progress > 0 && (
                    <div className="flex items-center gap-2">
                      <Progress value={actionable.progress} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground">{actionable.progress}%</span>
                    </div>
                  )}
                  
                  {/* Milestones Progress */}
                  {actionable.milestones && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target className="w-3 h-3" />
                      {actionable.completedMilestones || 0} of {actionable.milestones.length} milestones
                      <Progress value={milestoneProgress} className="w-16 h-1" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedCard(isExpanded ? null : actionable.id)}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="space-y-4 border-t border-border pt-4">
              {/* Milestones */}
              {actionable.milestones && (
                <div>
                  <h4 className="text-sm font-medium text-ink mb-2">Milestones</h4>
                  <div className="space-y-1">
                    {actionable.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 
                          className={`w-4 h-4 ${
                            index < (actionable.completedMilestones || 0) 
                              ? 'text-green-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                        <span className={
                          index < (actionable.completedMilestones || 0) 
                            ? 'line-through text-muted-foreground' 
                            : 'text-foreground'
                        }>
                          {milestone}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Bookmarks */}
              <div>
                <h4 className="text-sm font-medium text-ink mb-2">Source Bookmarks</h4>
                <div className="flex flex-wrap gap-1">
                  {actionable.sourceBookmarks.map((bookmark, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {bookmark}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Collaborators */}
              {actionable.collaborators && (
                <div>
                  <h4 className="text-sm font-medium text-ink mb-2">Collaborators</h4>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {actionable.collaborators.join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Metadata */}
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
            <Badge className={getCategoryColor(actionable.category)} variant="outline">
              {actionable.category.replace('-', ' ')}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            {actionable.status !== 'completed' && (
              <Button size="sm" className="bg-gradient-bamboo text-white">
                <Play className="w-3 h-3 mr-1" />
                Start
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleActionableStatus(actionable.id)}
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {actionable.status === 'completed' ? 'Reopen' : 'Complete'}
            </Button>
            
            {actionable.collaborators && (
              <Button variant="ghost" size="sm">
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Stats */}
      <Card className="paper-card p-6 bg-gradient-to-r from-washi to-background">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-ink">Enhanced Smart Actionables</h2>
            <p className="text-muted-foreground">AI-powered workflows for maximum productivity</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-sakura text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Actionable
          </Button>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(actionableTemplates).map(([category, templates]) => (
            <div key={category} className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-primary">
                {actionables.filter(a => a.category === category).length}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {category.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Enhanced Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.keys(actionableTemplates).map(category => (
              <SelectItem key={category} value={category}>
                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories Tab View */}
      <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-washi">
          <TabsTrigger value="all">All</TabsTrigger>
          {Object.keys(actionableTemplates).map(category => (
            <TabsTrigger key={category} value={category} className="text-xs">
              {category.split('-')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={categoryFilter} className="space-y-4">
          {filteredActionables.map((actionable) => (
            <ActionableCard key={actionable.id} actionable={actionable} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Template Suggestions */}
      <Card className="paper-card p-4 bg-gradient-to-br from-bamboo/10 to-sakura/10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-medium text-ink">Available Templates</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(actionableTemplates).map(([category, templates]) => (
            <div key={category} className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {category.replace('-', ' ')}
              </div>
              {templates.map(template => (
                <div key={template} className="text-xs text-foreground bg-white/50 px-2 py-1 rounded">
                  {template}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}