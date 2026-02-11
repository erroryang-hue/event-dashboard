import React, { useState, useEffect } from 'react';
import { FaSearch, FaHashtag, FaLightbulb, FaArrowRight } from 'react-icons/fa';

const HashTableVisualizer = ({ hashTable, trie }) => {
    const [searchKey, setSearchKey] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [probePath, setProbePath] = useState([]);
    const [currentProbeIndex, setCurrentProbeIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [hoveredBucket, setHoveredBucket] = useState(null);

    // Reset when hash table changes (e.g. re-sync)
    useEffect(() => {
        setSearchResult(null);
        setProbePath([]);
        setCurrentProbeIndex(-1);
        setIsAnimating(false);
    }, [hashTable]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchKey || isAnimating) return;

        // Get the probe path from the logic
        const path = hashTable.getProbePath(searchKey);
        setProbePath(path);
        setSearchResult(null); // Clear previous result
        setIsAnimating(true);
        setCurrentProbeIndex(0);

        // Animate probing
        let i = 0;
        const interval = setInterval(() => {
            setCurrentProbeIndex(i);

            // End of animation
            if (i >= path.steps.length - 1) {
                clearInterval(interval);
                setIsAnimating(false);
                if (path.found) {
                    const bucket = hashTable.table[path.index];
                    // Value is now the single event object
                    const item = bucket.value;
                    // Case insensitive check is already done in getProbePath
                    setSearchResult({ found: true, event: item, index: path.index, stats: path });
                } else {
                    setSearchResult({ found: false, index: path.index, stats: path });
                }
            }
            i++;
        }, 400); // 400ms per step
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchKey(val);

        if (val && trie) {
            const matches = trie.searchPrefix(val);
            setSuggestions(matches.map(m => m.title).slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (title) => {
        setSearchKey(title);
        setSuggestions([]);
    };

    // Helper to determine cell status
    const getCellStyle = (index) => {
        // Base style
        let style = "bg-slate-900/30 border-slate-800 text-slate-700";
        const bucket = hashTable.table[index];
        const hasContent = !!bucket;

        // If part of current probe animation
        if (probePath.steps && probePath.steps.includes(index)) {
            const stepIndex = probePath.steps.indexOf(index);
            // Provide visual feedback for visited nodes up to current animation step
            if (stepIndex <= currentProbeIndex) {
                if (stepIndex === currentProbeIndex && isAnimating) {
                    return "bg-yellow-500 text-black border-yellow-400 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)] z-20"; // Active Probe
                }
                return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"; // Visited
            }
        }

        // Final Result State
        if (!isAnimating && searchResult) {
            if (searchResult.found && index === searchResult.index) {
                return "bg-green-500 text-white border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)] scale-105 z-10"; // Found
            }
            if (!searchResult.found && index === searchResult.index) {
                return "bg-red-500/20 text-red-400 border-red-500 shadow-[0_0_15px_rgba(248,113,113,0.3)]"; // Not Found / Stop
            }
        }

        if (hasContent) return "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500";
        return style;
    };

    return (
        <div className="glass-card p-6 h-full flex flex-col relative overflow-visible">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                HashTable Visualizer
            </h3>
            <p className="text-xs text-slate-400 mb-6 flex flex-col gap-1">
                <span>Double Hashing • Open Addressing + Chaining</span>
                <span className="font-mono text-[10px] opacity-70">Size: {hashTable.size} • h1(k) = k % size • h2(k) = 1 + (k % (size-1))</span>
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6 relative z-30">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                        placeholder="Search Event..."
                        value={searchKey}
                        onChange={handleInputChange}
                    />
                    <button type="submit" disabled={isAnimating} className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 rounded font-bold transition-colors">
                        <FaSearch />
                    </button>
                </div>

                {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-slate-900 border border-slate-700 rounded-b-lg shadow-xl mt-1">
                        {suggestions.map((s, i) => (
                            <div
                                key={i}
                                onClick={() => handleSuggestionClick(s)}
                                className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 cursor-pointer flex items-center gap-2 border-b border-slate-800 last:border-0"
                            >
                                <FaLightbulb className="text-yellow-500 text-xs" />
                                {s}
                            </div>
                        ))}
                    </div>
                )}
            </form>

            {/* Grid Visualization */}
            <div className="flex-1 overflow-visible mb-4">
                <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {Array.from({ length: hashTable.size }).map((_, index) => {
                        const bucket = hashTable.table[index];
                        // Bucket is now { key, value: Array[Event], ... } if it exists
                        const chainLength = bucket && bucket.value ? bucket.value.length : 0;
                        const hasContent = chainLength > 0;

                        return (
                            <div
                                key={index}
                                className={`
                                    aspect-square rounded border flex flex-col items-center justify-center text-xs font-mono relative transition-all duration-300 cursor-help
                                    ${getCellStyle(index)}
                                `}
                                onMouseEnter={() => setHoveredBucket(bucket)}
                                onMouseLeave={() => setHoveredBucket(null)}
                            >
                                <span className="opacity-50 text-[10px] absolute top-0.5 left-1">{index}</span>
                                {hasContent && <span className="font-bold text-lg">{chainLength}</span>}
                                {chainLength > 1 && (
                                    <div className="absolute -bottom-1 -right-1 flex">
                                        {[...Array(Math.min(3, chainLength - 1))].map((_, i) => (
                                            <div key={i} className="w-2 h-2 rounded-full bg-slate-200 border border-slate-900 -ml-1"></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tooltip for Hovered Bucket */}
            {hoveredBucket && (
                <div className="absolute top-20 left-10 p-3 bg-slate-800 border-slate-600 rounded shadow-2xl z-40 max-w-[250px] pointer-events-none animate-fade-in border">
                    <div className="font-bold text-yellow-400 mb-2 border-b border-slate-700 pb-1 text-xs">{hoveredBucket.key}</div>

                    <div className="flex flex-col gap-2">
                        {hoveredBucket.value.map((event, idx) => (
                            <div key={idx} className="flex gap-2 items-center text-[10px] text-slate-300 p-1 bg-slate-700/50 rounded">
                                <div className="font-mono text-yellow-500 opacity-50">#{idx}</div>
                                <div>
                                    <div className="font-bold text-white">{event.title}</div>
                                    <div className="opacity-70">{event.startTime} - {event.endTime}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {hoveredBucket.value.length > 1 && (
                        <div className="mt-2 text-[9px] text-center text-slate-500 italic">
                            Linked List Chain ({hoveredBucket.value.length} items)
                        </div>
                    )}
                </div>
            )}

            {/* Status Panel */}
            <div className="mt-auto p-4 bg-slate-900/50 rounded border border-slate-800 min-h-[100px] flex items-center justify-center text-center">
                {isAnimating && (
                    <div className="text-yellow-400 animate-pulse text-sm">
                        Probing index {probePath.steps[currentProbeIndex]}... <br />
                        <span className="text-[10px] text-slate-500">Checking Slot...</span>
                    </div>
                )}

                {!isAnimating && searchResult && (
                    <div className="animate-slide-up">
                        {searchResult.found ? (
                            <>
                                <div className="text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                                    Found!
                                    <span className="text-sm font-normal text-slate-400">({searchResult.stats.attempts} attempts)</span>
                                </div>
                                <div className="text-slate-300 text-sm mt-1">{searchResult.event.title}</div>
                                <div className="text-[10px] text-slate-500 font-mono mt-1">
                                    h1: {searchResult.stats.h1} • h2: {searchResult.stats.h2} • Idx: {searchResult.index}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-red-400 font-bold text-lg">Not Found</div>
                                <div className="text-slate-400 text-sm mt-1">Key "{searchKey}" does not exist.</div>
                                <div className="text-[10px] text-slate-500 font-mono mt-1">
                                    Stopped at Index {searchResult.index} after {searchResult.stats.attempts} probes.
                                </div>
                            </>
                        )}
                    </div>
                )}

                {!isAnimating && !searchResult && (
                    <div className="text-slate-500 text-sm italic">
                        Enter a title to visualize Double Hashing probe sequence.
                    </div>
                )}
            </div>
        </div>
    );
};

export default HashTableVisualizer;
