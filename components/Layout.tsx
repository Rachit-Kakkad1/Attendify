import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  user: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, user }) => {
  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-slate-900 text-white font-sans">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neonPurple rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neonBlue rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      {/* Glass Sidebar */}
      <div className="hidden md:flex z-20">
        <Sidebar activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full z-10 relative overflow-hidden">
        <Topbar user={user} pageTitle={activePage} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};