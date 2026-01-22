import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
    const data = {
        labels: ['Checked-in', 'Yet to Check-in'],
        datasets: [
            {
                data: [960, 540],
                backgroundColor: [
                    'rgba(16, 185, 129, 1)', // Green 500
                    'rgba(245, 158, 11, 1)', // Yellow 500
                ],
                borderWidth: 0,
                cutout: '70%',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            }
        },
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Attendance</h3>
            </div>

            <div className="flex items-center">
                <div className="w-1/2 relative">
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span className="text-xs bg-yellow-500 px-1 rounded absolute top-10 left-4">40%</span>
                        <span className="text-xs bg-green-500 px-1 rounded absolute bottom-10 right-4">60%</span>
                    </div>
                </div>

                <div className="w-1/2 pl-4 space-y-4">
                    <div>
                        <div className="flex items-center mb-1">
                            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                            <span className="text-sm text-gray-500">Checked-in</span>
                        </div>
                        <p className="text-lg font-bold">960</p>
                    </div>
                    <div>
                        <div className="flex items-center mb-1">
                            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                            <span className="text-sm text-gray-500">Yet to Check-in</span>
                        </div>
                        <p className="text-lg font-bold">540</p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button className="w-full bg-indigo-50 text-indigo-700 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-100 transition-colors">
                    Manage Check-in
                </button>
            </div>
        </div>
    );
};

export default AttendanceChart;
