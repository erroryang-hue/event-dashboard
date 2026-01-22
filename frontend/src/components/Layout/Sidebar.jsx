import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaThLarge, FaCalendarAlt, FapencilAlt, FaUsers,
    FaStore, FaBullhorn, FaChartBar, FaCog, FaVideo
} from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    const menuItems = [
        { name: 'Overview', icon: <FaThLarge />, path: '/' },
        { name: 'Manage', icon: <FaCalendarAlt />, path: '/manage' },
        { name: 'Design', icon: <FapencilAlt />, path: '/design' },
        { name: 'Registrations', icon: <FaUsers />, path: '/registrations' },
        { name: 'Exhibitors', icon: <FaStore />, path: '/exhibitors' },
        { name: 'Communicate', icon: <FaBullhorn />, path: '/communicate' },
        { name: 'Reports', icon: <FaChartBar />, path: '/analytics' },
        { name: 'Event day', icon: <FaVideo />, path: '/event-day' },
        { name: 'Settings', icon: <FaCog />, path: '/settings' },
    ];

    return (
        <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 flex flex-col z-10 border-r border-gray-100">
            <div className="p-6 flex items-center justify-center border-b border-gray-100">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-xl">E</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">EventFlow</h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200
                                        ${isActive
                                            ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600'
                                            : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-lg mr-4">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center p-2 rounded-lg bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">View Profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
