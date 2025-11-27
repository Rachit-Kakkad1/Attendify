export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  department: string;
  semester: string;
  rollNumber: string;
  photoURL?: string;
}

export type LectureStatus = 'present' | 'absent' | 'cancelled' | 'none';

export interface Lecture {
  id: number;
  time: string;
  status: LectureStatus;
  note: string;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  lectures: Lecture[];
  updatedAt: number;
}

export interface StatsData {
  present: number;
  absent: number;
  total: number;
  percentage: number;
  streak: number;
}

export interface Holiday {
  date: string;
  title: string;
}