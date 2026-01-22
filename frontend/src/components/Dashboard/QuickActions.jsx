import React from 'react';
import {
    FaStore, FaBullhorn, FaCalendarAlt, FaTicketAlt,
    FaList, FaGlobe, FaAddressBook, FaChartPie
} from 'react-icons/fa';

const QuickActionItem = ({ icon, label, color }) => (
    <button className={`flex items-center p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow bg-blue-50 hover:bg-white text-indigo-600`}>
        <span className="mr-3 text-lg">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
    </button>
);

const QuickActions = () => {
    const actions = [
        { label: 'Exhibitors', icon: <FaStore /> },
        { label: 'Promote', icon: <FaBullhorn /> },
        { label: 'Sponsors', icon: <FaAddressBook /> },
        { label: 'Event Library', icon: <FaList /> },
        { label: 'Agenda', icon: <FaCalendarAlt /> },
        { label: 'Custom Domain', icon: <FaGlobe /> },
        { label: 'Tickets', icon: <FaTicketAlt /> },
        { label: 'Reports', icon: <FaChartPie /> },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex items-start mb-6">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <FaBullhorn className="text-indigo-600 text-xl" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
                    <p className="text-sm text-gray-500">Streamline your event experience with shortcuts to our features</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {actions.map((action, index) => (
                    <QuickActionItem key={index} {...action} />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <div className="flex space-x-1">
                    <span className="w-6 h-1 bg-indigo-500 rounded-full"></span>
                    <span className="w-2 h-1 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-1 bg-gray-300 rounded-full"></span>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;
