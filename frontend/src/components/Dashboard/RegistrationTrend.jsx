import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const RegistrationTrend = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 10 },
                    color: '#64748b',
                }
            },
            y: {
                display: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    font: { size: 10 },
                    color: '#64748b',
                }
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
            point: {
                radius: 0,
                hoverRadius: 6,
                hoverBackgroundColor: '#818cf8',
            }
        },
    };

    const labels = ['Mar 19', 'Mar 22', 'Mar 25', 'Mar 28', 'Mar 30', 'Sat'];
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Registrations',
                data: [500, 1500, 1400, 2800, 800, 1500, 2600],
                borderColor: '#818cf8',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="glass-card p-6 h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-100">Registration Trend</h3>
            </div>
            <div className="h-48">
                <Line options={options} data={data} />
            </div>
            <div className="mt-4 text-center">
                <button className="text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500/20 transition-colors w-full">
                    View more
                </button>
            </div>
        </div>
    );
};

export default RegistrationTrend;
