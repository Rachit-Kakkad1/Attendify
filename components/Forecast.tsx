import React from 'react';
import { CloudSun } from 'lucide-react';

export const Forecast: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-96 text-center">
            <CloudSun size={64} className="text-slate-600 mb-4" />
            <h2 className="text-2xl font-bold text-slate-500">Coming Soon</h2>
            <p className="text-slate-600">The attendance prediction engine is training...</p>
        </div>
    );
};