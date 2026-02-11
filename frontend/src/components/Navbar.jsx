import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-card rounded-none border-x-0 border-t-0 bg-opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                            EventPro
                        </span>
                        <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            DSA EDITION
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#hero" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="#fundamentals" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Concepts</a>
                            <a href="#demos" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-bold transition-all shadow-lg shadow-indigo-500/30">
                                Live Demos
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
