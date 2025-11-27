import React, { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, Slash, MessageSquare } from 'lucide-react';
import { format, isSaturday } from 'date-fns';
import { DailyRecord, Lecture } from '../types';
import { saveDayRecord, fetchDayRecord } from '../services/storage';

interface DayPanelProps {
  date: Date | null;
  onClose: () => void;
  userId: string;
  onUpdate: () => void;
}

const DEFAULT_LECTURES: Lecture[] = [
  { id: 0, time: '09:00 AM', status: 'none', note: '' },
  { id: 1, time: '11:00 AM', status: 'none', note: '' },
  { id: 2, time: '02:00 PM', status: 'none', note: '' },
  { id: 3, time: '05:00 PM', status: 'none', note: '' },
];

export const DayPanel: React.FC<DayPanelProps> = ({ date, onClose, userId, onUpdate }) => {
  const [lectures, setLectures] = useState<Lecture[]>(DEFAULT_LECTURES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date) {
      loadData();
    }
  }, [date]);

  const loadData = async () => {
    if (!date) return;
    setLoading(true);
    const dateStr = format(date, 'yyyy-MM-dd');
    const existing = await fetchDayRecord(userId, dateStr);
    
    if (existing) {
      setLectures(existing.lectures);
    } else {
      // Init new structure
      const isSat = isSaturday(date);
      const initial = DEFAULT_LECTURES.map(l => {
         if (isSat && l.id === 3) return { ...l, status: 'cancelled' as const, note: 'Weekend' };
         return { ...l, status: 'none' as const };
      });
      setLectures(initial);
    }
    setLoading(false);
  };

  const handleStatusChange = (id: number, status: 'present' | 'absent' | 'none') => {
    setLectures(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleSave = async () => {
    if (!date) return;
    const record: DailyRecord = {
      date: format(date, 'yyyy-MM-dd'),
      lectures,
      updatedAt: Date.now()
    };
    await saveDayRecord(userId, record);
    onUpdate();
    onClose();
  };

  const markAll = (status: 'present' | 'absent') => {
      setLectures(prev => prev.map(l => l.status !== 'cancelled' ? { ...l, status } : l));
  }

  if (!date) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-md h-full bg-slate-900 border-l border-white/10 shadow-2xl p-6 flex flex-col animate-slide-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">{format(date, 'EEEE')}</h2>
            <p className="text-slate-400">{format(date, 'MMMM do, yyyy')}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
            <button onClick={() => markAll('present')} className="flex-1 py-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-colors text-sm font-semibold">
                Mark All Present
            </button>
            <button onClick={() => markAll('absent')} className="flex-1 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors text-sm font-semibold">
                Mark All Absent
            </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
          {lectures.map((lecture) => (
            <div key={lecture.id} className={`p-4 rounded-xl border transition-all ${lecture.status === 'present' ? 'bg-green-500/5 border-green-500/30' : lecture.status === 'absent' ? 'bg-red-500/5 border-red-500/30' : 'bg-white/5 border-white/5'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-white">{lecture.time}</span>
                {lecture.status === 'cancelled' && <span className="text-xs uppercase font-bold text-slate-500">No Class</span>}
              </div>
              
              {lecture.status !== 'cancelled' && (
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => handleStatusChange(lecture.id, 'present')}
                        className={`flex-1 flex items-center justify-center p-2 rounded-lg border transition-all ${lecture.status === 'present' ? 'bg-green-500 text-white border-green-400 shadow-[0_0_10px_#22c55e]' : 'bg-slate-800 border-white/10 text-slate-400 hover:bg-slate-700'}`}
                    >
                        <CheckCircle size={18} className="mr-2" /> Present
                    </button>
                    <button 
                        onClick={() => handleStatusChange(lecture.id, 'absent')}
                        className={`flex-1 flex items-center justify-center p-2 rounded-lg border transition-all ${lecture.status === 'absent' ? 'bg-red-500 text-white border-red-400 shadow-[0_0_10px_#ef4444]' : 'bg-slate-800 border-white/10 text-slate-400 hover:bg-slate-700'}`}
                    >
                        <XCircle size={18} className="mr-2" /> Absent
                    </button>
                </div>
              )}
              
              <div className="mt-3 flex items-center">
                  <MessageSquare size={14} className="text-slate-500 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Add a note (e.g. Late)"
                    value={lecture.note}
                    onChange={(e) => setLectures(prev => prev.map(l => l.id === lecture.id ? { ...l, note: e.target.value } : l))}
                    className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
                  />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 mt-6 border-t border-white/10">
          <button 
            onClick={handleSave}
            className="w-full py-4 bg-gradient-to-r from-neonPurple to-neonBlue text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};