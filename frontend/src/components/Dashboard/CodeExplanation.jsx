import React, { useState } from 'react';

const CodeExplanation = () => {
    const [activeTab, setActiveTab] = useState('arrays');

    const dsaInfo = {
        arrays: {
            title: 'Arrays / Lists',
            desc: 'Store a collection of events for simple iteration and display.',
            code: `const events = [
    { id: 1, name: "Tech Talk" },
    { id: 2, name: "Music Fest" }
];
// Iteration: O(n)
events.forEach(event => {
    console.log(event.name);
});`
        },
        hashtable: {
            title: 'Hash Tables',
            desc: 'Fast lookup of events by ID (O(1) average time).',
            code: `const eventMap = new Map();
eventMap.set("e1", { name: "Hackathon" });

// Lookup: O(1)
const event = eventMap.get("e1");`
        },
        bst: {
            title: 'Trees (BST)',
            desc: 'Maintain events sorted by time. Efficient range queries.',
            code: `class BST {
    findRange(start, end) {
        // Returns events within time window
        // optimizations using node bounds
    }
}`
        },
        heap: {
            title: 'Heap / Priority Queue',
            desc: 'Manage upcoming events and notifications.',
            code: `class MinHeap {
    // Returns next upcoming event
    peek() { return this.heap[0]; }
    
    insert(event) {
        this.heap.push(event);
        this.bubbleUp();
    }
}`
        },
        graph: {
            title: 'Graphs',
            desc: 'Model event dependencies and workflows.',
            code: `const graph = {
    "Workshop": ["Networking"],
    "Networking": ["Dinner"]
};
// Traversal (BFS/DFS) finds sequence`
        },
        search: {
            title: 'Searching',
            desc: 'Binary search for sorted events; Hash lookup for IDs.',
            code: `function binarySearch(events, targetDate) {
    let left = 0, right = events.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (events[mid].date === targetDate) return mid;
        if (events[mid].date < targetDate) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
        },
        sort: {
            title: 'Sorting',
            desc: 'Sort events by Date, Priority, or Start Time.',
            code: `events.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
});
// Time Complexity: O(n log n)`
        },
        interval: {
            title: 'Interval Logic',
            desc: 'Detect overlapping events to prevent double-booking.',
            code: `function isOverlapping(e1, e2) {
    // event1.start < event2.end AND event2.start < event1.end
    return e1.start < e2.end && e2.start < e1.end;
}`
        }
    };

    return (
        <section className="mt-12 animate-fade-in">
            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                                💻 Implementation Details
                            </span>
                            <h2 className="text-2xl font-bold text-slate-100">Data Structures in Action</h2>
                        </div>
                    </div>

                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
                        {Object.keys(dsaInfo).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeTab === key
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                                    }`}
                            >
                                {dsaInfo[key].title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">{dsaInfo[activeTab].title}</h3>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            {dsaInfo[activeTab].desc}
                        </p>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
                            <h4 className="text-amber-400 font-bold text-sm mb-2 flex items-center">
                                💡 Why this choice?
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-start text-xs text-slate-300">
                                    <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    Optimized performance for specific operation types (e.g., LIFO, O(1) lookup).
                                </li>
                                <li className="flex items-start text-xs text-slate-300">
                                    <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    Scalable architecture handling {activeTab === 'hashtable' ? 'millions of records' : 'complex relationships'}.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
                        <div className="relative bg-[#0f172a] rounded-lg border border-white/10 p-4 font-mono text-xs overflow-x-auto">
                            <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                                <span className="text-slate-500">implementation.js</span>
                                <span className="text-indigo-400">JS</span>
                            </div>
                            <pre className="text-emerald-400">
                                <code>{dsaInfo[activeTab].code}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodeExplanation;
