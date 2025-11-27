import React, { useState, useEffect } from 'react';
import { auth, isDemoMode } from './services/firebase';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Calendar } from './components/Calendar';
import { DayPanel } from './components/DayPanel';
import { Stats } from './components/Stats';
import { BunkCalculator } from './components/BunkCalculator';
import { Forecast } from './components/Forecast';
import { fetchAllRecords } from './services/storage';
import { DailyRecord } from './types';
import { format } from 'date-fns';

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0, percentage: 0, streak: 0 });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u: any) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      loadRecords();
    }
  }, [user]);

  const loadRecords = async () => {
    if (!user) return;
    const data = await fetchAllRecords(user.uid);
    setRecords(data);
    calculateStats(data);
  };

  const calculateStats = (data: DailyRecord[]) => {
    let present = 0;
    let absent = 0;
    let streak = 0;

    data.forEach(r => {
        r.lectures.forEach(l => {
            if (l.status === 'present') present++;
            if (l.status === 'absent') absent++;
        });
    });

    const total = present + absent;
    const percentage = total === 0 ? 0 : (present / total) * 100;
    
    // Simple streak logic (last consecutive days with at least 1 present and no absent)
    // This is a simplified version
    streak = present > 0 ? 5 : 0; // Mock streak for demo

    setStats({ present, absent, total, percentage, streak });
  };

  if (!user) {
    return <Login />;
  }

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayRecord = records.find(r => r.date === todayStr) || null;

  return (
    <Layout activePage={activePage} onNavigate={setActivePage} user={user}>
      {activePage === 'dashboard' && <Dashboard stats={stats} todayRecord={todayRecord} />}
      {activePage === 'calendar' && <Calendar records={records} onDateSelect={setSelectedDate} />}
      {activePage === 'stats' && <Stats stats={stats} records={records} />}
      {activePage === 'bunk' && <BunkCalculator stats={{ present: stats.present, total: stats.total }} />}
      {activePage === 'forecast' && <Forecast />}
      {activePage === 'achievements' && <Forecast />}

      {/* Slide-over Day Panel */}
      {selectedDate && (
        <DayPanel 
          date={selectedDate} 
          onClose={() => setSelectedDate(null)} 
          userId={user.uid}
          onUpdate={loadRecords}
        />
      )}
    </Layout>
  );
};

export default App;