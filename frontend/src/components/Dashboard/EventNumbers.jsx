import React from 'react';
import { FaPlayCircle, FaMicrophone, FaUsers, FaBriefcase, FaIdBadge, FaIdCard, FaStore } from 'react-icons/fa';

const StatItem = ({ icon, label, value }) => (
    <div className="flex flex-col items-center p-3 text-center">
        <span className="text-2xl text-indigo-500 mb-2">{icon}</span>
        <span className="text-sm text-gray-500 mb-1">{label}</span>
        <span className="text-xl font-bold text-gray-800">{value}</span>
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Event numbers</h3>
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
