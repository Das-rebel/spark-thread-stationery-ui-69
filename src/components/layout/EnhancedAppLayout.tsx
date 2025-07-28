import React from 'react';
import { Header } from './Header';
import { Toaster } from "@/components/ui/toaster";

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
}

export function EnhancedAppLayout({ children }: EnhancedAppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-washi/30 to-background">
      <Header />
      <main className="pb-safe-area-inset-bottom">
        {children}
      </main>
      <Toaster />
    </div>
  );
}