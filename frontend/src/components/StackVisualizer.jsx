import React, { useState } from 'react';
import { FaUndo, FaTicketAlt, FaTrash, FaSearch } from 'react-icons/fa';

const StackVisualizer = ({ stack, bookings = [], onUndo, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Reverse bookings for visual stack representation (Top = Newest)
    // And Filter based on Search Term
    const history = [...bookings]
        .reverse()
        .filter(item =>
            item.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden">
            {/* Header with Search and Undo */}
            <div className="flex flex-col gap-4 mb-4 z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                            Stack Visualizer
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">LIFO Stack (Recent Top)</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onUndo}
                            className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 whitespace-nowrap text-xs flex items-center gap-1"
                            title="Undo Last Booking"
                        >
                            <FaUndo /> Undo Last
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-xs" />
                    <input
                        type="text"
                        placeholder="Search by participant or event..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>
            </div>

            {/* Stack Visualizer */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 min-h-0 relative flex flex-col">
                {/* Empty State */}
                {history.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-600 text-sm italic min-h-[100px]">
                        <p>{bookings.length === 0 ? "No bookings yet." : "No matches found."}</p>
                    </div>
                )}

                {/* List Items */}
                {history.map((item, index) => (
                    <div
                        key={item.id}
                        className="stack-item bg-slate-800/80 border-l-4 border-purple-500 p-3 rounded shadow-md flex justify-between items-center group transform transition-all hover:bg-slate-800 shrink-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-500/10 p-1.5 rounded text-purple-400">
                                <FaTicketAlt size={12} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-200">{item.title}</div>
                                <div className="text-[11px] text-emerald-400 font-medium">{item.participantName}</div>
                                <div className="text-[10px] text-slate-500">{item.timestamp}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => onDelete && onDelete(item.id)}
                            className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all p-1.5 rounded hover:bg-red-500/10"
                            title="Delete this booking"
                        >
                            <FaTrash size={12} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-2 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-800 pt-2 font-mono">
                <span>Total: {bookings.length}</span>
                <span>Showing: {history.length}</span>
            </div>
        </div>
    );
};

export default StackVisualizer;
