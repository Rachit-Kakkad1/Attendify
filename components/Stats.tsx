import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DailyRecord } from '../types';

interface StatsProps {
  stats: {
    present: number;
    absent: number;
    total: number;
    percentage: number;
  };
  records: DailyRecord[];
}

export const Stats: React.FC<StatsProps> = ({ stats, records }) => {
    // Process data for weekly chart
    const weeklyData = [
        { name: 'Mon', present: 0, absent: 0 },
        { name: 'Tue', present: 0, absent: 0 },
        { name: 'Wed', present: 0, absent: 0 },
        { name: 'Thu', present: 0, absent: 0 },
        { name: 'Fri', present: 0, absent: 0 },
        { name: 'Sat', present: 0, absent: 0 },
    ];

    records.forEach(r => {
        const date = new Date(r.date);
        const day = date.getDay(); // 0 is Sun
        if (day > 0) {
            const idx = day - 1;
            r.lectures.forEach(l => {
                if (l.status === 'present') weeklyData[idx].present++;
                if (l.status === 'absent') weeklyData[idx].absent++;
            });
        }
    });

  return (
    <div className="space-y-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">Deep Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border-l-4 border-neonBlue">
                <h3 className="text-slate-400 text-sm font-medium uppercase mb-2">Total Attendance</h3>
                <div className="flex items-end">
                    <span className="text-4xl font-bold text-white mr-2">{stats.percentage.toFixed(1)}%</span>
                    <span className="text-sm text-slate-500 mb-1">Target: 75%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                    <div 
                        className="bg-neonBlue h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${stats.percentage}%` }}
                    ></div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border-l-4 border-fuchsia-500">
                <h3 className="text-slate-400 text-sm font-medium uppercase mb-2">Lectures Missed</h3>
                <div className="flex items-end">
                    <span className="text-4xl font-bold text-white mr-2">{stats.absent}</span>
                    <span className="text-sm text-slate-500 mb-1">lectures</span>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                    Each absence reduces your percentage by approx {stats.total > 0 ? (100/stats.total).toFixed(1) : 0}%
                </p>
            </div>
        </div>

        <div className="glass-card p-6 rounded-2xl h-96">
            <h3 className="text-lg font-bold text-white mb-6">Weekly Performance Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="present" name="Present" fill="#00f3ff" radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};