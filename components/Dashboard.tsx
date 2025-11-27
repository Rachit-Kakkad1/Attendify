import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, Calendar, AlertTriangle } from 'lucide-react';
import { DailyRecord } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  stats: {
    present: number;
    absent: number;
    total: number;
    percentage: number;
    streak: number;
  };
  todayRecord: DailyRecord | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, todayRecord }) => {
  const data = [
    { name: 'Present', value: stats.present },
    { name: 'Absent', value: stats.absent },
  ];
  const COLORS = ['#00f3ff', '#ef4444'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Overall Attendance" 
          value={`${stats.percentage.toFixed(1)}%`}
          subtitle="Target: 75%"
          icon={Activity}
          trend={stats.percentage >= 75 ? 'up' : 'down'}
          color="blue"
        />
        <StatCard 
          title="Classes Attended" 
          value={stats.present.toString()}
          subtitle={`Out of ${stats.total} total`}
          icon={Calendar}
          color="purple"
        />
        <StatCard 
          title="Current Streak" 
          value={`${stats.streak} Days`}
          subtitle="Keep it up!"
          icon={ArrowUpRight}
          color="green"
        />
        <StatCard 
          title="Bunks Available" 
          value={Math.max(0, Math.floor((stats.present - 0.75 * stats.total) / 0.75)).toString()}
          subtitle="To stay above 75%"
          icon={AlertTriangle}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <span className="w-1 h-6 bg-neonBlue rounded-full mr-3"></span>
            Attendance Overview
          </h3>
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
             </ResponsiveContainer>
             <div className="ml-8 space-y-4">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-neonBlue mr-3 shadow-[0_0_8px_#00f3ff]"></div>
                    <div>
                        <p className="text-sm text-slate-400">Present</p>
                        <p className="text-xl font-bold">{stats.present}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-3 shadow-[0_0_8px_#ef4444]"></div>
                    <div>
                        <p className="text-sm text-slate-400">Absent</p>
                        <p className="text-xl font-bold">{stats.absent}</p>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Today's Schedule Preview */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calendar size={120} />
            </div>
          <h3 className="text-lg font-semibold mb-6 flex items-center z-10 relative">
            <span className="w-1 h-6 bg-neonPurple rounded-full mr-3"></span>
            Today's Status
          </h3>
          <div className="space-y-4 relative z-10">
             {!todayRecord ? (
                 <div className="text-center py-8 text-slate-400">
                     No data for today.
                     <br/>
                     <span className="text-xs">Go to Attendance to mark.</span>
                 </div>
             ) : (
                todayRecord.lectures.map((lec) => (
                    <div key={lec.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-sm font-medium text-slate-300">{lec.time}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            lec.status === 'present' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            lec.status === 'absent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            'bg-slate-700/50 text-slate-400'
                        }`}>
                            {lec.status}
                        </span>
                    </div>
                ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color }: any) => {
    return (
        <div className="glass-card p-6 rounded-2xl group hover:border-white/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${
                    color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                    color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                    color === 'green' ? 'bg-green-500/20 text-green-400' :
                    'bg-orange-500/20 text-orange-400'
                }`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                        trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                        {trend === 'up' ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                        {trend === 'up' ? 'Good' : 'Risk'}
                    </div>
                )}
            </div>
            <h4 className="text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">{value}</h4>
            <p className="text-sm text-slate-400 font-medium">{title}</p>
            <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
        </div>
    )
}
