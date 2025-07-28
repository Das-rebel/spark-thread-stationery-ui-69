import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIChat } from "@/components/knowledge/AIChat";
import { SmartCollections } from "@/components/knowledge/SmartCollections";
import { SemanticSearch } from "@/components/knowledge/SemanticSearch";
import { SmartActionables } from "@/components/knowledge/SmartActionables";
import { OnboardingFlow } from "@/components/knowledge/OnboardingFlow";
import { PlatformIntegrationSimple } from "@/components/knowledge/PlatformIntegrationSimple";
import { FeatureCategories } from "@/components/knowledge/FeatureCategories";
import { QuickStats } from "@/components/knowledge/QuickStats";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Search, 
  Zap, 
  FolderOpen, 
  MessageSquare,
  Settings,
  ArrowLeft
} from "lucide-react";

export default function KnowledgeHub() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstTime] = useState(false); // Set to true for demo

  // Show onboarding for first-time users
  if (showOnboarding || isFirstTime) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  const handleCategorySelect = (category: string) => {
    setActiveTab(category);
  };

  return (
    <AppLayout>
      <div className="min-h-screen pb-8 safe-area-inset-bottom">
        {/* Minimal Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-washi to-background/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-sakura rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ink">Knowledge Hub</h1>
                <p className="text-xs text-muted-foreground">AI learning companion</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowOnboarding(true)}
              className="p-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Platform Integration at top */}
          <div className="px-4 pb-4">
            <PlatformIntegrationSimple />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Quick Stats */}
          <QuickStats />

          {/* Navigation Tabs - Mobile First */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 bg-washi h-12">
              <TabsTrigger value="overview" className="flex flex-col items-center gap-1 text-xs">
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex flex-col items-center gap-1 text-xs">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </TabsTrigger>
              <TabsTrigger value="actionables" className="flex flex-col items-center gap-1 text-xs">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="collections" className="flex flex-col items-center gap-1 text-xs md:flex">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Collections</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex flex-col items-center gap-1 text-xs md:flex">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab - Minimal Feature Categories */}
            <TabsContent value="overview" className="mt-0">
              <FeatureCategories onCategorySelect={handleCategorySelect} />
            </TabsContent>

            {/* Semantic Search Tab */}
            <TabsContent value="search" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveTab("overview")}
                    className="p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Semantic Search</h2>
                </div>
                <SemanticSearch />
              </div>
            </TabsContent>

            {/* Smart Actionables Tab */}
            <TabsContent value="actionables" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveTab("overview")}
                    className="p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Smart Actionables</h2>
                </div>
                <SmartActionables />
              </div>
            </TabsContent>

            {/* Collections Tab */}
            <TabsContent value="collections" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveTab("overview")}
                    className="p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Smart Collections</h2>
                </div>
                <SmartCollections />
              </div>
            </TabsContent>

            {/* AI Chat Tab */}
            <TabsContent value="chat" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveTab("overview")}
                    className="p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">AI Knowledge Chat</h2>
                </div>
                <AIChat />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}