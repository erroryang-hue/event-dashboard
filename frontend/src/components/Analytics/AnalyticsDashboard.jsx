import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaBrain, FaSearchDollar, FaChartLine } from 'react-icons/fa';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsDashboard = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#94a3b8',
                    font: { family: 'Inter', weight: '500' }
                }
            },
            title: {
                display: false
            },
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                ticks: { color: '#64748b', font: { size: 11 } }
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                ticks: { color: '#64748b', font: { size: 11 } }
            }
        },
        maintainAspectRatio: false
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Revenue Growth',
                data: [12000, 19000, 3000, 5000, 2000, 30000, 45000],
                backgroundColor: 'rgba(99, 102, 241, 0.4)',
                borderColor: '#818cf8',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(99, 102, 241, 0.6)',
            },
        ],
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Section Header */}
            <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
                    📊 Data Intelligence
                </span>
                <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Performance Analytics</h2>
                <p className="text-slate-500 max-w-2xl">
                    Trend analysis and predictive resource allocation metrics using aggregate data modeling.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-slate-100">Revenue Stream Analysis</h3>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 outline-none">
                            <option>Last 7 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-[300px]">
                        <Bar options={options} data={data} />
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="font-bold text-slate-100 mb-4 flex items-center">
                            <FaBrain className="mr-2 text-pink-400" /> Insight Engine
                        </h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-white/5 rounded-lg border-l-2 border-indigo-500">
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    <span className="text-indigo-400 font-bold">Trend Alert:</span> Sales identified a 15% increase in Early Bird registrations compared to Q1.
                                </p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg border-l-2 border-emerald-500">
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    <span className="text-emerald-400 font-bold">Optimization:</span> Resource utilization is at peak capacity for upcoming July nodes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/5 to-transparent">
                        <h3 className="font-bold text-slate-100 mb-2">Conversion Rate</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black text-slate-100 italic">64.8%</span>
                            <span className="text-emerald-400 text-xs font-bold mb-2">+4.2% ↑</span>
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-2">Target Meta: 70.0%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                        <FaSearchDollar className="text-indigo-400" />
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm mb-2">Cost per Lead</h4>
                    <p className="text-2xl font-bold text-slate-200">$12.40</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Efficient</p>
                </div>
                <div className="glass-card p-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                        <FaChartLine className="text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm mb-2">Churn Rate</h4>
                    <p className="text-2xl font-bold text-slate-200">2.1%</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Lower than average</p>
                </div>
                <div className="glass-card p-6">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                        <FaBrain className="text-pink-400" />
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm mb-2">Retention</h4>
                    <p className="text-2xl font-bold text-slate-200">89%</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">High Loyalty</p>
                </div>
            </div>

            {/* Logic Block matching reference style */}
            <div className="glass-card p-8 bg-dark-deeper/50 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <FaBrain size={120} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center">
                        💡 Data Processing Logic
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Analytics are calculated using a rolling window aggregation algorithm.
                                Each data point represents an O(n) traversal of the temporal event log,
                                mapped across defined fiscal intervals.
                            </p>
                        </div>
                        <div className="bg-dark-deeper rounded-lg p-4 font-mono text-[11px] text-emerald-400 border border-white/5">
                            const calculateGrowth = (curr, prev) ={">"} {"{"} <br />
                            &nbsp;&nbsp;return ((curr - prev) / prev) * 100; <br />
                            {"}"};
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AnalyticsDashboard;
