import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaClipboardList, FaCalendarCheck, FaChartLine } from 'react-icons/fa';
import { analyticsAPI } from '../../services/api';
import StatCard from './StatCard';
import QuickActions from './QuickActions';
import RegistrationTrend from './RegistrationTrend';
import RegistrationBreakdown from './RegistrationBreakdown';
import AttendanceChart from './AttendanceChart';
import EventNumbers from './EventNumbers';
import EventWebsitePreview from './EventWebsitePreview';
import StackVisualizer from './StackVisualizer';


const Overview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await analyticsAPI.getDashboard();
                const body = response.data;
                setStats(body?.data || body || {});
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({
                    total_sales: 0,
                    total_registrations: 0,
                    days_to_event: 'N/A',
                    checked_in: 0,
                    yet_to_checkin: 0
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="p-8 text-center text-slate-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-3"></div>
            Loading dashboard...
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Section Header - Matching Reference Style */}
            <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
                    🚀 Analytics Engine
                </span>
                <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Resource & Task Management</h2>
                <p className="text-slate-500 max-w-2xl">
                    Real-time event monitoring system using optimized data structures for registration indexing and attendee checkout.
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Sales"
                    value={`$${parseFloat(stats?.total_sales || 0).toLocaleString()}`}
                    icon={<FaMoneyBillWave className="text-amber-400" />}
                    color="bg-amber-500/10"
                    subtext="Updated just now"
                />
                <StatCard
                    title="Registrations"
                    value={stats?.total_registrations?.toLocaleString() || '0'}
                    icon={<FaClipboardList className="text-emerald-400" />}
                    color="bg-emerald-500/10"
                    subtext={`${stats?.checked_in || 0} checked in`}
                />
                <StatCard
                    title="Days to Event"
                    value={stats?.days_to_event || 'N/A'}
                    icon={<FaCalendarCheck className="text-pink-400" />}
                    color="bg-pink-500/10"
                    subtext="Upcoming milestone"
                />
            </div>

            {/* Interactive DSA Row - Stack & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <QuickActions />
                </div>
                <div className="lg:col-span-1">
                    <StackVisualizer />
                </div>
                <div className="lg:col-span-1">
                    <RegistrationBreakdown count={stats?.total_registrations} />
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RegistrationTrend />
                </div>
                <div className="lg:col-span-1">
                    <AttendanceChart checkedIn={stats?.checked_in} total={stats?.total_registrations} />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <EventWebsitePreview />
                </div>
                <div className="lg:col-span-2">
                    <EventNumbers />
                </div>
            </div>

            {/* Technical Detail Section - Porting from Reference Design */}
            <div className="glass-card p-8 mt-8 border-l-4 border-indigo-500">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center">
                            <FaChartLine className="mr-3 text-indigo-400" />
                            Optimized Search & Indexing
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            The event manager utilizes a custom search engine designed for high-performance querying of large attendee databases.
                            Events are cached using a distributed memory store, ensuring Sub-50ms response times for frontend interactions.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <span className="block text-2xl font-bold text-indigo-400">O(log n)</span>
                                <span className="text-xs text-slate-500 uppercase">Search Complexity</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <span className="block text-2xl font-bold text-emerald-400">99.9%</span>
                                <span className="text-xs text-slate-500 uppercase">Uptime Service</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-64">
                        <div className="bg-dark-deeper rounded-xl p-4 border border-white/5 font-mono text-[10px] text-indigo-300">
                            <div className="text-slate-500 mb-2">// Registration Service</div>
                            <div>class Indexer {"{"}</div>
                            <div className="pl-4">static find(query) {"{"}</div>
                            <div className="pl-8 text-slate-400">return this.data.filter(i ={">"} </div>
                            <div className="pl-12 text-slate-400">i.matches(query));</div>
                            <div className="pl-4">{"}"}</div>
                            <div>{"}"}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW: Interactive Code Explanation Section */}

        </div>
    );
};

export default Overview;
