import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = ({ title }) => {
    return (
        <header className="bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
            <div>
                <h2 className="text-xl font-bold text-slate-100">{title || 'Overview'}</h2>
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <FaSearch className="text-slate-500" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500 w-64 transition-colors"
                    />
                </div>

                <button className="relative text-slate-400 hover:text-indigo-400 transition-colors">
                    <FaBell className="text-xl" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-[#0f172a] bg-indigo-500 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></span>
                </button>

                <div className="flex items-center space-x-2 cursor-pointer">
                    <FaUserCircle className="text-2xl text-slate-400 hover:text-indigo-400 transition-colors" />
                </div>
            </div>
        </header>
    );
};

export default Header;
