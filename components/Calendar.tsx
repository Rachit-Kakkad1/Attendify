import React, { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay, isSunday } from 'date-fns';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { DailyRecord } from '../types';

interface CalendarProps {
  records: DailyRecord[];
  onDateSelect: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ records, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const getDayStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = records.find(r => r.date === dateStr);
    if (!record) return 'none';
    
    // Logic: If any absent, day is partially red. If all present, green.
    const presentCount = record.lectures.filter(l => l.status === 'present').length;
    const absentCount = record.lectures.filter(l => l.status === 'absent').length;
    const total = record.lectures.filter(l => l.status !== 'none' && l.status !== 'cancelled').length;

    if (total === 0) return 'none';
    if (absentCount > 0) return 'risk'; // Has an absent
    if (presentCount === total) return 'full';
    return 'partial';
  };

  return (
    <div className="glass-card rounded-2xl p-6 min-h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 flex-1">
        {/* Fill empty start slots */}
        {Array.from({ length: getDay(startOfMonth(currentMonth)) }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}

        {days.map((day) => {
            const isToday = isSameDay(day, new Date());
            const isSun = isSunday(day);
            const status = getDayStatus(day);
            
            let statusColor = 'bg-white/5 border-white/5';
            if (status === 'full') statusColor = 'bg-green-500/20 border-green-500/50 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
            if (status === 'risk') statusColor = 'bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
            if (status === 'partial') statusColor = 'bg-orange-500/20 border-orange-500/50 text-orange-300';
            if (isSun) statusColor = 'bg-slate-900/50 border-transparent opacity-50 cursor-not-allowed';

            return (
                <button
                    key={day.toISOString()}
                    disabled={isSun}
                    onClick={() => onDateSelect(day)}
                    className={`
                        aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300 border
                        ${statusColor}
                        ${!isSun && 'hover:scale-105 hover:bg-white/10 hover:border-white/30'}
                        ${isToday ? 'ring-2 ring-neonBlue ring-offset-2 ring-offset-slate-900' : ''}
                    `}
                >
                    <span className={`text-lg font-semibold ${isSun ? 'text-slate-600' : 'text-white'}`}>
                        {format(day, 'd')}
                    </span>
                    
                    {!isSun && status !== 'none' && (
                        <div className="mt-2 flex gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${status === 'full' ? 'bg-green-400' : status === 'risk' ? 'bg-red-400' : 'bg-orange-400'}`}></div>
                        </div>
                    )}
                    
                    {isSun && <Lock size={14} className="text-slate-600 mt-1" />}
                </button>
            )
        })}
      </div>
    </div>
  );
};