import React from 'react';
import { LayoutDashboard, Calendar as CalendarIcon, PieChart, Calculator, CloudSun, Award, LogOut } from 'lucide-react';
import { auth } from '../services/firebase';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Attendance', icon: CalendarIcon },
    { id: 'stats', label: 'Analytics', icon: PieChart },
    { id: 'bunk', label: 'Bunk Calc', icon: Calculator },
    { id: 'forecast', label: 'Forecast', icon: CloudSun },
    { id: 'achievements', label: 'Trophies', icon: Award },
  ];

  return (
    <div className="w-64 h-full glass-panel flex flex-col border-r border-white/10">
      <div className="p-6 flex items-center justify-center border-b border-white/10">
        <div className="bg-gradient-to-r from-neonPurple to-neonBlue bg-clip-text text-transparent text-2xl font-bold tracking-tighter">
          Attendify
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-neonPurple/20 to-neonBlue/20 border border-white/10 text-white shadow-lg shadow-purple-500/10' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-neonBlue' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neonBlue shadow-[0_0_8px_#00f3ff]"></div>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => auth.signOut()}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};