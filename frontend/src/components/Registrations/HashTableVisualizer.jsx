import React, { useState } from 'react';
import { FaSearch, FaHashtag } from 'react-icons/fa';

const HashTableVisualizer = () => {
    const [key, setKey] = useState('');
    const [hash, setHash] = useState(null);
    const [buckets, setBuckets] = useState(Array(10).fill(null));
    const [message, setMessage] = useState('');

    const simpleHash = (str) => {
        let hashVal = 0;
        for (let i = 0; i < str.length; i++) {
            hashVal += str.charCodeAt(i);
        }
        return hashVal % 10;
    };

    const handleInsert = () => {
        if (!key) return;
        const index = simpleHash(key);
        setHash(index);

        const newBuckets = [...buckets];
        // Linked list collision simulation (simple array of strings)
        if (!newBuckets[index]) {
            newBuckets[index] = [key];
        } else {
            newBuckets[index] = [...newBuckets[index], key];
        }

        setBuckets(newBuckets);
        setMessage(`Key "${key}" → Hash(${key}) % 10 = ${index}`);
        setKey('');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="glass-card p-6 border-t-2 border-emerald-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="p-2 rounded-lg mr-3 bg-emerald-500/20 text-emerald-400">
                        <FaHashtag />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-100">Hash Table Viz</h3>
                        <p className="text-xs text-slate-500">O(1) Lookup Simulation</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter Name..."
                    className="dark-input flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                />
                <button
                    onClick={handleInsert}
                    className="btn-gradient px-4 py-2 rounded-lg font-bold text-xs"
                >
                    Insert
                </button>
            </div>

            <div className="bg-dark-deeper/50 p-2 rounded-lg border border-white/5 mb-2 font-mono text-[10px] text-emerald-400 h-6 overflow-hidden">
                {message || "Waiting for input..."}
            </div>

            <div className="grid grid-cols-5 gap-2">
                {buckets.map((bucket, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded border transition-colors duration-300 min-h-[50px] flex flex-col items-center justify-center text-[10px] ${hash === i
                                ? 'bg-emerald-500/20 border-emerald-500 text-slate-100 scale-105'
                                : 'bg-white/5 border-white/5 text-slate-500'
                            }`}
                    >
                        <span className="absolute top-1 left-1 text-[8px] opacity-50">{i}</span>
                        {bucket ? (
                            <div className="flex flex-col gap-1 w-full">
                                {bucket.map((val, idx) => (
                                    <span key={idx} className="bg-slate-700 px-1 rounded text-white truncate w-full text-center">{val}</span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-slate-600">-</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HashTableVisualizer;
