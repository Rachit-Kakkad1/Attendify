import React, { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

interface BunkProps {
    stats: {
        present: number;
        total: number;
    }
}

export const BunkCalculator: React.FC<BunkProps> = ({ stats }) => {
    const [target, setTarget] = useState(75);
    
    // Logic: (Present + x) / (Total + x) >= Target/100  -> Need to attend x more
    // Logic: (Present) / (Total + x) >= Target/100 -> Can skip x more

    const calculateBunk = () => {
        const P = stats.present;
        const T = stats.total;
        const R = target / 100;

        const currentPct = T === 0 ? 0 : P/T;
        
        if (currentPct >= R) {
            // Can bunk
            // P / (T + x) = R  => P = R(T+x) => P/R = T + x => x = P/R - T
            const bunks = Math.floor((P / R) - T);
            return {
                type: 'safe',
                count: bunks,
                message: `You can safely bunk ${bunks} more lectures and stay above ${target}%.`
            };
        } else {
            // Need to attend
            // (P + x) / (T + x) = R => P + x = RT + Rx => x(1-R) = RT - P => x = (RT - P) / (1-R)
            const attend = Math.ceil(((R * T) - P) / (1 - R));
            return {
                type: 'danger',
                count: attend,
                message: `You must attend ${attend} consecutive lectures to reach ${target}%.`
            };
        }
    };

    const result = calculateBunk();

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
             <div className="glass-card p-8 rounded-3xl text-center border border-white/10">
                <div className="inline-flex p-4 rounded-full bg-neonPurple/20 text-neonPurple mb-6">
                    <Calculator size={48} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Bunk Calculator</h2>
                <p className="text-slate-400 mb-8">Plan your holidays without getting detained.</p>

                <div className="mb-8">
                    <label className="text-sm font-medium text-slate-300 block mb-3">Target Percentage</label>
                    <input 
                        type="range" 
                        min="60" 
                        max="90" 
                        value={target} 
                        onChange={(e) => setTarget(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neonBlue"
                    />
                    <div className="text-2xl font-bold text-neonBlue mt-4">{target}%</div>
                </div>

                <div className={`p-6 rounded-2xl border ${result.type === 'safe' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex flex-col items-center">
                        {result.type === 'safe' ? (
                            <CheckCircle size={40} className="text-green-400 mb-3" />
                        ) : (
                            <AlertTriangle size={40} className="text-red-400 mb-3" />
                        )}
                        <h3 className={`text-xl font-bold mb-2 ${result.type === 'safe' ? 'text-green-400' : 'text-red-400'}`}>
                            {result.type === 'safe' ? 'Safe Zone' : 'Warning Zone'}
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            {result.message}
                        </p>
                    </div>
                </div>
             </div>
        </div>
    );
};