import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = ({ checkedIn = 0, total = 0 }) => {
    const yetToCheckIn = Math.max(0, total - checkedIn);
    const checkedInPercentage = total > 0 ? Math.round((checkedIn / total) * 100) : 0;

    const data = {
        labels: ['Checked-in', 'Yet to Check-in'],
        datasets: [{
            data: [checkedIn, yetToCheckIn],
            backgroundColor: ['#10B981', '#F59E0B'],
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
            <h3 className="text-lg font-bold text-slate-100 mb-6">Attendance</h3>
            <div className="relative h-48 mb-6">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-slate-100">{checkedInPercentage}%</span>
                    <span className="text-xs text-slate-500 uppercase">Tracked</span>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                        <span className="text-sm text-slate-400">Checked-in</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">{checkedIn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                        <span className="text-sm text-slate-400">Yet to Check-in</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">{yetToCheckIn.toLocaleString()}</span>
                </div>
            </div>
            <div className="mt-6 text-center">
                <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors">Manage Check-in</button>
            </div>
        </div>
    );
};

export default AttendanceChart;
