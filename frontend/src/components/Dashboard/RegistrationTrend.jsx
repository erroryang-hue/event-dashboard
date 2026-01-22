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
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                display: true,
                grid: {
                    color: '#f3f4f6',
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
        },
        elements: {
            line: {
                tension: 0.4, // Smooth curves
            },
            point: {
                radius: 0,
                hoverRadius: 6,
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
                borderColor: 'rgb(99, 102, 241)', // Indigo 500
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Registration Trend</h3>
            </div>
            <div className="h-48">
                <Line options={options} data={data} />
            </div>
            <div className="mt-4 text-center">
                <button className="text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors w-full">
                    View more
                </button>
            </div>
        </div>
    );
};

export default RegistrationTrend;
