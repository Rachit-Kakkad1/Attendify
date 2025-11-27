import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface TopbarProps {
  user: any;
  pageTitle: string;
}

export const Topbar: React.FC<TopbarProps> = ({ user, pageTitle }) => {
  return (
    <header className="h-20 px-8 flex items-center justify-between glass-panel border-b border-white/10 sticky top-0 z-30">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-neonPurple/50 transition-colors">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-white ml-2 w-32 focus:w-48 transition-all placeholder:text-slate-500"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
        </button>

        <div className="flex items-center space-x-3 pl-6 border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">{user?.displayName || 'Student'}</p>
            <p className="text-xs text-slate-400">6th Semester</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neonPurple to-neonBlue p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
               {user?.photoURL ? (
                 <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <User size={20} className="text-white" />
               )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};