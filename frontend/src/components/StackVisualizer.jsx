import React, { useState, useEffect } from 'react';
import { FaHistory, FaUndo, FaTicketAlt } from 'react-icons/fa';

const StackVisualizer = ({ stack }) => {
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');

    // Poll for changes or use a better state management method
    // Since we forceUpdate App.jsx, this component will re-render.
    // We just need to sync the local state with the stack prop.
    useEffect(() => {
        setHistory(stack.toArray());
    }, [stack, stack.items.length]); // stack.items.length is a hacky way to detect changes if the object ref doesn't change

    const handleUndo = () => {
        const removed = stack.pop();
        if (removed) {
            setMessage(`Undo: ${removed.title}`);
            setHistory(stack.toArray());
        } else {
            setMessage('Nothing to undo');
        }
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden">
            {/* Background Icon Removed */}

            <div className="flex flex-wrap justify-between items-center mb-4 gap-4 z-10">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        Stack Visualizer (History)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">LIFO Stack • Updates on "Book Ticket"</p>
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <button
                        onClick={handleUndo}
                        className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 whitespace-nowrap"
                        title="Undo Last Booking"
                    >
                        <FaUndo size={14} /> Undo Last
                    </button>
                    <div className="bg-purple-600/20 text-purple-400 text-xs font-bold px-2 py-1 rounded border border-purple-500/30 flex items-center whitespace-nowrap">
                        Size: {history.length}
                    </div>
                </div>
            </div>

            {/* Stack Visualizer */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 min-h-0 relative flex flex-col-reverse gap-2">
                {/* Empty State */}
                {history.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm italic">
                        No bookings yet. Book a ticket from the list!
                    </div>
                )}

                {/* List Items */}
                {history.map((item, index) => (
                    <div
                        key={item.id || index}
                        className="stack-item bg-slate-800/80 border-l-4 border-purple-500 p-3 rounded shadow-md flex justify-between items-center transform transition-all hover:translate-x-1 shrink-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-500/10 p-1.5 rounded text-purple-400">
                                <FaTicketAlt size={12} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-200">{item.title}</div>
                                <div className="text-[10px] text-slate-500">{new Date().toLocaleTimeString()}</div>
                            </div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-600">#{history.length - index}</div>
                    </div>
                ))}
            </div>

            {/* Status Message */}
            <div className="mt-4 h-6 text-center">
                {message && (
                    <span className="text-xs font-mono text-purple-400 animate-pulse">
                        {'>'} {message}
                    </span>
                )}
            </div>

            {/* LIFO Indicator */}
            <div className="mt-2 text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold border-t border-slate-800 pt-2">
                Top of Stack (Last In)
            </div>
        </div>
    );
};

export default StackVisualizer;
