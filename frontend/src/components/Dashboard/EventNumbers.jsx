import React from 'react';
import { FaPlayCircle, FaMicrophone, FaUsers, FaBriefcase, FaIdBadge, FaIdCard, FaStore } from 'react-icons/fa';

const StatItem = ({ icon, label, value }) => (
    <div className="flex flex-col items-center p-3 text-center group">
        <span className="text-2xl text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors">{icon}</span>
        <span className="text-sm text-slate-500 mb-1">{label}</span>
        <span className="text-xl font-bold text-slate-100">{value}</span>
    </div>
);

const EventNumbers = () => {
    const stats = [
        { icon: <FaPlayCircle />, label: 'Sessions', value: '24' },
        { icon: <FaMicrophone />, label: 'Speakers', value: '12' },
        { icon: <FaUsers />, label: 'Event Team', value: '4' },
        { icon: <FaBriefcase />, label: 'Sponsors', value: '20' },
        { icon: <FaStore />, label: 'Exhibitors', value: '18' },
        { icon: <FaIdBadge />, label: 'Badge', value: '8' },
    ];

    return (
        <div className="glass-card p-6 h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-100">Event numbers</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <StatItem key={index} {...stat} />
                ))}
            </div>
        </div>
    );
};

export default EventNumbers;
