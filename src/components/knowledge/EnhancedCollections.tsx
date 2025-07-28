import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Sparkles, 
  Folder, 
  TrendingUp, 
  Clock, 
  Zap, 
  ChevronDown, 
  ChevronRight,
  Search,
  Grid,
  BookOpen,
  FolderTree,
  Network,
  Star
} from "lucide-react";

interface CollectionNode {
  id: string;
  name: string;
  type: "category" | "subcategory" | "collection";
  description?: string;
  itemCount: number;
  children?: CollectionNode[];
  tags?: string[];
  lastUpdated: string;
  isExpanded?: boolean;
  trending?: boolean;
  growthRate?: number;
}

const mockCollectionTree: CollectionNode[] = [
  {
    id: "tech",
    name: "Technology",
    type: "category",
    description: "All technology-related content",
    itemCount: 234,
    lastUpdated: "2 hours ago",
    isExpanded: true,
    children: [
      {
        id: "ai-ml",
        name: "AI & Machine Learning",
        type: "subcategory",
        description: "Artificial intelligence and ML resources",
        itemCount: 89,
        lastUpdated: "1 hour ago",
        children: [
          {
            id: "ai-research",
            name: "AI Research Papers",
            type: "collection",
            description: "Latest AI research and academic papers",
            itemCount: 34,
            lastUpdated: "30 minutes ago",
            tags: ["research", "academic"],
            trending: true,
            growthRate: 15
          }
        ]
      }
    ]
  }
];

export function EnhancedCollections() {
  const [collections] = useState<CollectionNode[]>(mockCollectionTree);
  const [viewMode, setViewMode] = useState<"tree" | "grid" | "network">("tree");
  const [searchQuery, setSearchQuery] = useState("");

  const getNodeTypeColor = (type: string) => {
    const colors = {
      category: 'bg-purple-100 text-purple-700',
      subcategory: 'bg-blue-100 text-blue-700',
      collection: 'bg-green-100 text-green-700'
    };
    return colors[type as keyof typeof colors] || colors.collection;
  };

  const getNodeTypeIcon = (type: string) => {
    const icons = {
      category: <FolderTree className="w-4 h-4" />,
      subcategory: <Folder className="w-4 h-4" />,
      collection: <BookOpen className="w-4 h-4" />
    };
    return icons[type as keyof typeof icons] || icons.collection;
  };

  const renderTreeNode = (node: CollectionNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-2">
        <Card className="paper-card p-4 hover:shadow-floating transition-smooth" style={{marginLeft: `${depth * 20}px`}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {hasChildren && (
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  {node.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              )}
              
              <div className={`p-2 rounded-lg ${getNodeTypeColor(node.type)}`}>
                {getNodeTypeIcon(node.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-ink">{node.name}</h3>
                  {node.trending && (
                    <Badge variant="secondary" className="bg-gradient-seal text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                {node.description && (
                  <p className="text-sm text-muted-foreground">{node.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-ink">{node.itemCount}</div>
                <div className="text-xs text-muted-foreground">items</div>
              </div>
              
              {node.growthRate && (
                <div className="flex items-center gap-1 text-bamboo">
                  <Zap className="w-3 h-3" />
                  <span className="text-xs">+{node.growthRate}%</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {hasChildren && node.isExpanded && (
          <div className="space-y-2">
            {node.children?.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">Enhanced Collections</h2>
          <p className="text-muted-foreground">Hierarchical knowledge organization with AI-powered connections</p>
        </div>
        <Button className="bg-gradient-sakura text-white hover:shadow-floating">
          <Plus className="w-4 h-4 mr-2" />
          Create Collection
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="paper-card p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search collections, categories, and content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "tree" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("tree")}
            >
              <FolderTree className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "network" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("network")}
            >
              <Network className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-lg font-bold text-primary">2</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-lg font-bold text-bamboo">4</div>
            <div className="text-xs text-muted-foreground">Subcategories</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-lg font-bold text-green-600">8</div>
            <div className="text-xs text-muted-foreground">Collections</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-lg font-bold text-purple-600">12</div>
            <div className="text-xs text-muted-foreground">Connections</div>
          </div>
        </div>
      </Card>

      {/* View Content */}
      {viewMode === "tree" && (
        <div className="space-y-2">
          {collections.map(node => renderTreeNode(node))}
        </div>
      )}

      {/* Collection Templates */}
      <Card className="paper-card p-4 bg-gradient-to-br from-bamboo/10 to-sakura/10">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-primary" />
          <span className="font-medium text-ink">Collection Templates</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'Research Library',
            'Learning Roadmap',
            'Tool Collection',
            'Reference Hub'
          ].map(template => (
            <Button
              key={template}
              variant="outline"
              size="sm"
              className="text-xs bg-white/50 hover:bg-white border-bamboo/30"
            >
              {template}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}