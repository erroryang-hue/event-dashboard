import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = ({ title }) => {
    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{title || 'Overview'}</h2>
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <FaSearch className="text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 bg-gray-50 w-64"
                    />
                </div>

                <button className="relative text-gray-500 hover:text-indigo-600">
                    <FaBell className="text-xl" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
                </button>

                <div className="flex items-center space-x-2 cursor-pointer">
                    <FaUserCircle className="text-2xl text-gray-600" />
                </div>
            </div>
        </header>
    );
};

export default Header;
