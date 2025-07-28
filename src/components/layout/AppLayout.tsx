import { ReactNode } from "react";
import { FloatingTweetButton } from "@/components/twitter/FloatingTweetButton";
import { KnowledgeHubFAB } from "../knowledge/KnowledgeHubFAB";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const isTwitterRoute = location.pathname.startsWith("/twitter");

  return (
    <div className="min-h-screen bg-gradient-paper overflow-x-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-background shadow-xl">
        {location.pathname !== "/" && <Header />}
        {children}
        {isTwitterRoute && <FloatingTweetButton />}
        {!isTwitterRoute && <KnowledgeHubFAB />}
      </div>
    </div>
  );
}