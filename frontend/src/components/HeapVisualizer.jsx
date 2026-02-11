import React, { useState, useEffect } from 'react';
import { FaFire } from 'react-icons/fa';

const HeapVisualizer = ({ heap }) => {
    const [heapArray, setHeapArray] = useState([]);
    const [topEvent, setTopEvent] = useState(null);

    useEffect(() => {
        // Sync array view
        const currentHeap = [...heap.toArray()];
        setHeapArray(currentHeap);
        setTopEvent(currentHeap.length > 0 ? currentHeap[0] : null);
    }, [heap, heap.heap.length]); // dependency on length to trigger update

    const handleExtractMax = () => {
        // In a real app, this would remove the event entirely? Or just from "Trending"?
        // Let's say it removes it from Trending view only, or effectively "processes" it.
        // Since heap is shared state in App, modifying it here needs caution.
        // But heap instance is passed, so we can modify it.
        // BUT, if we extract max, we might desync from the main event list if we expect them to be 1:1.
        // For this demo, let's allow extraction to show how Heap works, 
        // even if it means the heap has fewer items than the list.
        const max = heap.extractMax();
        if (max) {
            setHeapArray([...heap.toArray()]);
            setTopEvent(heap.heap[0] || null);
        }
    };

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                        Heap Visualizer (Trending)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Max Heap • Sorted by Views</p>
                </div>
                <button
                    onClick={handleExtractMax}
                    className="px-3 py-1.5 rounded bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold transition-colors shadow-lg shadow-pink-500/20"
                >
                    Extract Max
                </button>
            </div>

            {/* Top Event Spotlight */}
            <div className="mb-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-xl border border-pink-500/20 shadow-inner">
                <div className="text-xs text-pink-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FaFire /> Highest Priority (Root)
                </div>
                {topEvent ? (
                    <div className="flex justify-between items-center animate-pulse-glow">
                        <span className="text-lg font-bold text-white truncate mr-2">{topEvent.title}</span>
                        <span className="text-xl font-mono text-pink-400 whitespace-nowrap">{(topEvent.views || 0).toLocaleString()} <span className="text-xs text-slate-500">views</span></span>
                    </div>
                ) : (
                    <div className="text-slate-500 italic">No events trending</div>
                )}
            </div>

            {/* Heap Array Visualization */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                    {heapArray.map((event, index) => (
                        <div key={event.id || index} className="flex items-center gap-3 p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition-colors border-l-2 border-transparent hover:border-pink-500">
                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-400">
                                {index}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-slate-300 font-medium truncate">{event.title}</div>
                                <div className="h-1 bg-slate-700 rounded-full mt-1 overflow-hidden w-full">
                                    <div
                                        className="h-full bg-pink-500 rounded-full"
                                        style={{ width: `${Math.min(100, (event.views / 20000) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="text-xs font-mono text-slate-400 text-right">
                                {event.views?.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeapVisualizer;
