import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">EventPro DSA</h3>
                        <p className="text-slate-400 text-sm">
                            An educational project demonstrating the practical application of Data Structures and Algorithms in modern web development.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-200 mb-4">Algorithms Implemented</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>• Quicksort & Mergesort</li>
                            <li>• Binary Search Tree Traversal</li>
                            <li>• Max Heap Operations</li>
                            <li>• Hash Table Collision Handling</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-200 mb-4">Technologies</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>• React 18</li>
                            <li>• Tailwind CSS</li>
                            <li>• Vite</li>
                            <li>• Vanilla JS for Logic</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; 2026 EventPro. Built for learning.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
