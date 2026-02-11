import React, { useState, useEffect } from 'react';
import {
    FaStore, FaBullhorn, FaCalendarAlt, FaTicketAlt,
    FaList, FaGlobe, FaAddressBook, FaChartPie, FaChartLine, FaAward, FaBuilding, FaUsers
} from 'react-icons/fa';
import { analyticsAPI } from '../../services/api';

const iconMap = {
    'store': FaStore,
    'building': FaBuilding,
    'bullhorn': FaBullhorn,
    'trending-up': FaChartLine,
    'address-book': FaAddressBook,
    'list': FaList,
    'calendar': FaCalendarAlt,
    'globe': FaGlobe,
    'ticket': FaTicketAlt,
    'chart-pie': FaChartPie,
    'bar-chart': FaChartLine,
    'award': FaAward,
    'users': FaUsers,
    'user-check': FaUsers
};

const QuickActionItem = ({ icon, label, urgency }) => {
    const IconComponent = iconMap[icon] || FaChartLine;

    const urgencyColors = {
        high: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20',
        medium: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20',
        low: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/20'
    };

    const colorClass = urgencyColors[urgency] || 'bg-white/5 hover:bg-white/10 text-indigo-400 border-white/10';

    return (
        <button className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${colorClass}`}>
            <IconComponent className="mr-3 text-lg" />
            <span className="text-sm font-semibold">{label}</span>
        </button>
    );
};

const QuickActions = () => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const response = await analyticsAPI.getQuickActions();
                const body = response.data;
                const items = Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : []);
                setActions(items);
            } catch (error) {
                console.error('Error fetching actions:', error);
                setActions([
                    { name: 'View Exhibitors', icon: 'building', urgency: 'medium' },
                    { name: 'Promote Event', icon: 'bullhorn', urgency: 'high' },
                    { name: 'Manage Sponsors', icon: 'award', urgency: 'low' },
                    { name: 'Update Agenda', icon: 'calendar', urgency: 'low' },
                    { name: 'View Reports', icon: 'chart-pie', urgency: 'low' },
                    { name: 'Manage Tickets', icon: 'ticket', urgency: 'low' },
                    { name: 'Event Library', icon: 'list', urgency: 'low' },
                    { name: 'Custom Domain', icon: 'globe', urgency: 'low' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchActions();
    }, []);

    return (
        <div className="glass-card p-6 h-full">
            <div className="flex items-start mb-6">
                <div className="p-3 rounded-lg mr-4" style={{ background: 'var(--gradient-primary)' }}>
                    <FaBullhorn className="text-white text-xl" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-100">Quick Actions</h3>
                    <p className="text-sm text-slate-500">Priority Queue (Min Heap) - O(log n)</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="text-slate-500 text-sm mt-2">Loading actions...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {actions.slice(0, 8).map((action, index) => (
                        <QuickActionItem
                            key={index}
                            label={action.name}
                            icon={action.icon}
                            urgency={action.urgency}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuickActions;