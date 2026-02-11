import React from 'react';
import { FaDatabase, FaLayerGroup, FaNetworkWired, FaCode } from 'react-icons/fa';

const Hero = () => {
    return (
        <div id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-indigo-500/30 mb-8 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Interactive Learning Platform</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Master DSA with <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                        Real-World Events
                    </span>
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Explore how major tech companies handle millions of events using Arrays, Stacks, Heaps, Hash Tables, and Graphs. Visualized in real-time.
                </p>

                <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <a href="#demos" className="btn-primary flex items-center gap-2">
                        <FaCode /> Start Exploring
                    </a>
                    <a href="#fundamentals" className="px-6 py-3 rounded-lg font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-all">
                        Learn Concepts
                    </a>
                </div>

                {/* Feature Grid */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div className="glass-card p-6 flex flex-col items-center">
                        <FaLayerGroup className="text-3xl text-indigo-400 mb-3" />
                        <h3 className="font-bold text-white">Stack</h3>
                        <p className="text-xs text-slate-500 mt-1">Undo/Redo History</p>
                    </div>
                    <div className="glass-card p-6 flex flex-col items-center">
                        <FaNetworkWired className="text-3xl text-emerald-400 mb-3" />
                        <h3 className="font-bold text-white">BST</h3>
                        <p className="text-xs text-slate-500 mt-1">Timeline Scheduling</p>
                    </div>
                    <div className="glass-card p-6 flex flex-col items-center">
                        <FaDatabase className="text-3xl text-amber-400 mb-3" />
                        <h3 className="font-bold text-white">Hash Table</h3>
                        <p className="text-xs text-slate-500 mt-1">O(1) Search</p>
                    </div>
                    <div className="glass-card p-6 flex flex-col items-center">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-400 mb-3">O(n)</div>
                        <h3 className="font-bold text-white">Analysis</h3>
                        <p className="text-xs text-slate-500 mt-1">Complexity Metrics</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
