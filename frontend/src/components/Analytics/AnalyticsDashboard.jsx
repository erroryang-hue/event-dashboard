import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsDashboard = () => {
    // Mock Data
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Data',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Revenue ($)',
                data: [12000, 19000, 3000, 5000, 2000, 30000, 45000],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
            <div className="h-96">
                <Bar options={options} data={data} />
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded">
                    <h3 className="font-bold mb-2">Top Selling Events</h3>
                    <ul className="list-disc pl-5">
                        <li>Tech Conference 2024</li>
                        <li>Summer Music Fest</li>
                    </ul>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-bold mb-2">User Growth</h3>
                    <p className="text-3xl font-bold text-green-600">+12%</p>
                    <p className="text-sm text-gray-500">Since last month</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
