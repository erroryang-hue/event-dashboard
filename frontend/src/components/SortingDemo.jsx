import React, { useState, useEffect, useRef } from 'react';
import { SortingGenerators } from '../utils/dsa';
import { FaPlay, FaStepForward, FaPause, FaRedo, FaFastForward } from 'react-icons/fa';

const SortingDemo = ({ events = [] }) => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [sorted, setSorted] = useState(false);
    const [currentStep, setCurrentStep] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(100);

    // Generator Reference
    const genRef = useRef(null);
    const sortingGens = new SortingGenerators();

    // Sync with global events (reset on change)
    useEffect(() => {
        if (!sorting && !sorted) {
            handleReset();
        }
    }, [events.length]); // Only reset if event count changes, to avoid resetting mid-sort if we were to change something unrelated

    // Auto-Play Logic
    useEffect(() => {
        let interval;
        if (isPlaying && sorting) {
            interval = setInterval(() => {
                handleNextStep();
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, sorting, speed, currentStep]);

    const handleReset = () => {
        setIsPlaying(false);
        setSorting(false);
        setSorted(false);
        setCurrentStep(null);
        genRef.current = null;

        // Map events to visual data
        const safeEvents = Array.isArray(events) ? events : [];
        const visualData = safeEvents.map(e => ({
            id: e.id,
            value: e.price || 0,
            label: e.title
        }));
        setArray(visualData);
    };

    const handleStart = () => {
        if (sorted) handleReset();

        // Initialize Generator
        const initialArray = [...array];
        genRef.current = sortingGens.mergeSort(initialArray);
        setSorting(true);
        setIsPlaying(true);
        handleNextStep();
    };

    const handleNextStep = () => {
        if (!genRef.current) return;

        const { value, done } = genRef.current.next();

        if (done) {
            setSorting(false);
            setSorted(true);
            setIsPlaying(false);
            setCurrentStep(null);
            // Ensure final array state is set (the generator yields final state in 'end' type usually, but 'done' might be after)
            // Our generator yields "end" as last value.
            return;
        }

        setCurrentStep(value);
        if (value.array) {
            setArray(value.array);
        }
    };

    const getBarColor = (index) => {
        if (sorted) return 'bg-green-500';
        if (!currentStep) return 'bg-cyan-500';

        const { type, indices, index: singleIndex, left, right } = currentStep;

        // Highlight the range being merged
        const inRange = (left !== undefined && right !== undefined) && (index >= left && index <= right);

        if (type === 'compare' && indices && indices.includes(index)) return 'bg-yellow-400 scale-110 shadow-lg shadow-yellow-500/50 z-10';
        if (type === 'swap' && singleIndex === index) return 'bg-red-500 scale-110 shadow-lg shadow-red-500/50 z-10';
        if (type === 'flush' && singleIndex === index) return 'bg-purple-500';
        if (type === 'merged' && inRange) return 'bg-green-400/50'; // Completed sub-array opacity

        return inRange ? 'bg-cyan-600' : 'bg-cyan-800/50'; // Active range vs Inactive
    };

    // Find max value for bar scaling
    const maxValue = Math.max(...(array.map(i => i.value) || [100]), 100);

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                        Merge Sort Visualization
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">O(n log n) • Step-by-Step • Visual Generator</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleReset} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700">
                        <FaRedo size={12} /> Reset
                    </button>
                </div>
            </div>

            {/* Bars Visualization */}
            <div className="flex-1 flex items-end justify-between gap-1 mb-4 h-40 pt-10 border-b border-slate-800 pb-4 relative">
                {array.length > 0 ? array.map((item, idx) => (
                    <div
                        key={idx} // Use index as key during sort as items move
                        className={`rounded-t w-full transition-all duration-200 ease-in-out relative group flex flex-col justify-end items-center ${getBarColor(idx)}`}
                        style={{ height: `${Math.max(5, (item.value / maxValue) * 100)}%` }}
                    >
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-[10px] text-white px-2 py-1 rounded pointer-events-none whitespace-nowrap z-20 border border-slate-700 transition-opacity">
                            ${item.value} - {item.label}
                        </div>
                    </div>
                )) : (
                    <div className="w-full text-center text-slate-500 text-sm italic self-center">Add events with prices to see visualization</div>
                )}

                {/* Step Info Overlay */}
                {currentStep && (
                    <div className="absolute top-0 left-0 right-0 text-center">
                        <span className="bg-slate-900/80 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 border border-cyan-500/30">
                            {currentStep.type === 'compare' ? `Comparing indices ${currentStep.indices[0]} & ${currentStep.indices[1]}` :
                                currentStep.type === 'swap' ? `Overwriting index ${currentStep.index}` :
                                    currentStep.type === 'flush' ? `Flushing remaining items to ${currentStep.index}` :
                                        currentStep.type === 'merged' ? `Merged range ${currentStep.left}-${currentStep.right}` :
                                            currentStep.type === 'split' ? `Splitting range ${currentStep.left}-${currentStep.right}` :
                                                currentStep.type === 'start' ? 'Starting Merge Sort...' : 'Sorted!'}
                        </span>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                    {!sorting ? (
                        <button
                            onClick={handleStart}
                            disabled={array.length < 2 || sorted}
                            className="flex-1 btn-primary py-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm bg-cyan-600 hover:bg-cyan-700"
                        >
                            <FaPlay size={10} /> Start Visualization
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors border border-slate-600"
                            >
                                {isPlaying ? <><FaPause size={10} /> Pause</> : <><FaPlay size={10} /> Play</>}
                            </button>
                            <button
                                onClick={handleNextStep}
                                disabled={isPlaying} // Disable manual step if auto-playing to avoid race
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors border border-slate-600 disabled:opacity-50"
                            >
                                <FaStepForward size={10} /> Step
                            </button>
                        </>
                    )}
                </div>

                {/* Speed Control */}
                <div className="flex items-center gap-2 bg-slate-900/50 px-3 rounded border border-slate-800">
                    <span className="text-xs text-slate-400">Speed:</span>
                    <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={1010 - speed} // Invert so right is faster
                        onChange={e => setSpeed(1010 - Number(e.target.value))}
                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <span className="text-xs font-mono text-cyan-400 w-12 text-right">{speed}ms</span>
                </div>
            </div>
        </div>
    );
};

export default SortingDemo;
