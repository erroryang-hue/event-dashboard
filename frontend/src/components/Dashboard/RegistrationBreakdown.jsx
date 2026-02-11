import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RegistrationBreakdown = ({ count = 0 }) => {
    const capacity = 15000;
    const sold = count;
    const available = Math.max(0, capacity - sold);
    const soldPercentage = Math.round((sold / capacity) * 100);

    const data = {
        labels: ['Sold', 'Available'],
        datasets: [{
            data: [sold, available],
            backgroundColor: ['#6366F1', '#10B981'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    const options = {
        cutout: '75%',
        plugins: {
            legend: { display: false },
        },
        maintainAspectRatio: false
    };

    return (
        <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-bold text-slate-100 mb-6">Registrations</h3>
            <div className="relative h-48 mb-6">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-slate-100">{soldPercentage}%</span>
                    <span className="text-xs text-slate-500 uppercase">Capacity</span>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                        <span className="text-sm text-slate-400">Sold</span>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-bold text-slate-200 block">{sold.toLocaleString()}</span>
                        <span className="text-xs text-slate-500">({soldPercentage}%)</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                        <span className="text-sm text-slate-400">Available</span>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-bold text-slate-200 block">{available.toLocaleString()}</span>
                        <span className="text-xs text-slate-500">({100 - soldPercentage}%)</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center">
                <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors">Manage Registrations</button>
            </div>
        </div>
    );
};

export default RegistrationBreakdown;
