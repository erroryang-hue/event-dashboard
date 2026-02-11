import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaStar } from 'react-icons/fa';

// Helper to render tree with SVG Bezier Curves
const TreeVisualizer = ({ root }) => {
    if (!root) return <div className="text-slate-500 italic mt-10 text-center">No events scheduled</div>;

    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (!root) return;

        const newNodes = [];
        const newLinks = [];

        // Hierarchical Layout Logic
        // Root is at 50% width. Children split available width.

        const traverse = (node, depth, x, availableWidth) => {
            if (!node) return;

            // X is percentage (0-100)
            const y = 10 + (depth * 20); // 20% height per level

            const visualNode = {
                x, y,
                val: node.value,
                id: node.value.id || Math.random() + depth // Fallback ID
            };

            newNodes.push(visualNode);

            // Child Offset: varies by depth. 
            // Level 0: +/- 25% (total 50 spread)
            // Level 1: +/- 12.5%
            // Level 2: +/- 6.25%
            const offset = availableWidth / 2;

            if (node.left) {
                const childX = x - offset;
                newLinks.push({ x1: x, y1: y, x2: childX, y2: y + 20 });
                traverse(node.left, depth + 1, childX, offset / 2);
            }
            if (node.right) {
                const childX = x + offset;
                newLinks.push({ x1: x, y1: y, x2: childX, y2: y + 20 });
                traverse(node.right, depth + 1, childX, offset / 2);
            }
        };

        // Start with Root at 50%, initial offset spread of 25%
        traverse(root, 0, 50, 25);

        setNodes(newNodes);
        setLinks(newLinks);
    }, [root]);

    // Calculate upcoming event (Node with date >= today and closest)
    const today = new Date().toISOString().split('T')[0];
    const upcomingNode = nodes
        .filter(n => n.val.date >= today)
        .sort((a, b) => new Date(a.val.date) - new Date(b.val.date))[0];

    return (
        <div className="relative w-full h-full min-h-[350px] border border-slate-800 rounded bg-slate-900/50 overflow-hidden">
            {/* SVG Layer for Edges */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {links.map((link, i) => {
                    // Coordinates are 0-100
                    const cpY = (link.y1 + link.y2) / 2;
                    const d = `M ${link.x1} ${link.y1} C ${link.x1} ${cpY}, ${link.x2} ${cpY}, ${link.x2} ${link.y2}`;

                    return (
                        <path
                            key={i}
                            d={d}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="0.5" // Thinner relative to 100x100 viewbox
                            strokeOpacity="0.5"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke" // Ensure stroke width stays constant despite scaling
                        />
                    );
                })}
            </svg>

            {nodes.map((node, i) => {
                const isUpcoming = upcomingNode && upcomingNode.id === node.id;
                return (
                    <div
                        key={i}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all duration-500 z-10`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        <div className={`
                            w-12 h-12 rounded-full border-2 flex items-center justify-center text-[10px] text-center font-bold bg-slate-900
                            ${isUpcoming ? 'border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-110' : 'border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'}
                            cursor-pointer hover:scale-110 transition-transform relative group-hover:border-white group-hover:text-white
                        `} title={node.val.title}>
                            <div className="leading-tight">
                                <div className="text-sm">{new Date(node.val.date).getDate()}</div>
                                <div className="opacity-70 text-[8px] uppercase">{new Date(node.val.date).toLocaleString('default', { month: 'short' })}</div>
                            </div>
                        </div>

                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute top-14 bg-slate-900/90 backdrop-blur text-white text-[10px] px-3 py-1.5 rounded border border-slate-700 whitespace-nowrap pointer-events-none transition-opacity shadow-xl z-50">
                            <span className="font-bold block text-emerald-400">{node.val.title}</span>
                            <span className="text-slate-400">{node.val.date}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const BSTVisualizer = ({ bst }) => {
    const [treeRoot, setTreeRoot] = useState(null);
    const [traversal, setTraversal] = useState([]);

    useEffect(() => {
        setTreeRoot({ ...bst.root });
        setTraversal(bst.inOrderTraversal());
    }, [bst, bst.root]);

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        Event Schedule (Binary Search Tree)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Binary Search Tree • Sorted by Date</p>
                </div>
            </div>

            {/* Improved Tree Visualization with SVG */}
            <div className="flex-1 mb-4">
                <TreeVisualizer root={treeRoot} />
            </div>

            {/* Traversal Result */}
            <div className="mt-auto">
                <div className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <FaCalendarAlt /> Timeline (In-Order)
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {traversal.length > 0 ? traversal.map((event, idx) => (
                        <div key={idx} className="flex-shrink-0 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded text-center min-w-[80px]">
                            <div className="text-xs font-bold text-emerald-300">{event.date}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[70px] mx-auto">{event.title}</div>
                        </div>
                    )) : <div className="text-xs text-slate-600">No events</div>}
                </div>
            </div>
        </div>
    );
};

export default BSTVisualizer;
