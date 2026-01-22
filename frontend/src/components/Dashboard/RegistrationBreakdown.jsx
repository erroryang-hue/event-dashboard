import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const RegistrationBreakdown = () => {
    const data = {
        labels: ['Sold', 'Available'],
        datasets: [
            {
                data: [11480, 2520],
                backgroundColor: [
                    'rgba(99, 102, 241, 1)', // Indigo 500
                    'rgba(52, 211, 153, 1)', // Green 400
                ],
                borderWidth: 0,
                cutout: '70%', // Thinner ring
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false // Custom tooltip or static text can be added
            }
        },
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Registrations</h3>
            </div>

            <div className="flex items-center">
                <div className="w-1/2 relative">
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                            <span className="text-xs text-white bg-green-400 px-1 rounded">18%</span>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 pl-4 space-y-4">
                    <div>
                        <div className="flex items-center mb-1">
                            <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                            <span className="text-sm text-gray-500">Sold</span>
                        </div>
                        <p className="text-lg font-bold">11,480 <span className="text-gray-400 text-sm font-normal">(82%)</span></p>
                    </div>
                    <div>
                        <div className="flex items-center mb-1">
                            <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                            <span className="text-sm text-gray-500">Available</span>
                        </div>
                        <p className="text-lg font-bold">2,520 <span className="text-gray-400 text-sm font-normal">(18%)</span></p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button className="w-full bg-indigo-50 text-indigo-700 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-100 transition-colors">
                    Manage Registrations
                </button>
            </div>
        </div>
    );
};

export default RegistrationBreakdown;
