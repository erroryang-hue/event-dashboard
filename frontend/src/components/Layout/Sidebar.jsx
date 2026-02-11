import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaThLarge, FaCalendarAlt, FaPencilAlt, FaUsers,
    FaStore, FaBullhorn, FaChartBar, FaCog, FaVideo
} from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Overview', icon: <FaThLarge />, path: '/' },
        { name: 'Manage', icon: <FaCalendarAlt />, path: '/manage' },
        { name: 'Registrations', icon: <FaUsers />, path: '/registrations' },
        { name: 'Reports', icon: <FaChartBar />, path: '/analytics' },
        { name: 'Implementation Action', icon: <FaCog />, path: '/implementation' },
    ];

    return (
        <div className="w-64 h-screen bg-[#0f172a]/95 backdrop-blur-xl fixed left-0 top-0 flex flex-col z-10 border-r border-white/5">
            {/* Logo */}
            <div className="p-6 flex items-center justify-center border-b border-white/5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2"
                    style={{ background: 'var(--gradient-primary)' }}>
                    <span className="text-white font-bold text-xl">E</span>
                </div>
                <h1 className="text-xl font-bold text-slate-100">EventFlow</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200
                                        ${isActive
                                            ? 'text-white bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border-r-4 border-indigo-500'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                        }`}
                                >
                                    <span className={`text-lg mr-4 ${isActive ? 'text-indigo-400' : ''}`}>{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center p-2 rounded-lg bg-white/5">
                    <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center"
                        style={{ background: 'var(--gradient-primary)' }}>
                        <span className="text-white font-semibold text-sm">A</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-200">Admin User</p>
                        <p className="text-xs text-slate-500">View Profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
