import React, { useState } from 'react';
import { FaUndo, FaRedo, FaHistory, FaLayerGroup } from 'react-icons/fa';

const StackVisualizer = () => {
    const [stack, setStack] = useState(['Init Dashboard', 'Load Modules']);
    const [redoStack, setRedoStack] = useState([]);
    const [message, setMessage] = useState('');

    const actions = ['Update Profile', 'Check Events', 'Review Stats', 'Export Data', 'Sync Calendar'];

    const pushAction = () => {
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        setStack(prev => [...prev, randomAction]);
        setRedoStack([]); // Clear redo stack on new action
        setMessage(`Pushed: "${randomAction}"`);
        setTimeout(() => setMessage(''), 2000);
    };

    const popAction = () => {
        if (stack.length === 0) {
            setMessage('Stack Underflow! Nothing to undo.');
            setTimeout(() => setMessage(''), 2000);
            return;
        }
        const newStack = [...stack];
        const action = newStack.pop();
        setStack(newStack);
        setRedoStack(prev => [...prev, action]);
        setMessage(`Popped (Undo): "${action}"`);
        setTimeout(() => setMessage(''), 2000);
    };

    const redoAction = () => {
        if (redoStack.length === 0) {
            setMessage('Redo Stack Empty!');
            setTimeout(() => setMessage(''), 2000);
            return;
        }
        const newRedo = [...redoStack];
        const action = newRedo.pop();
        setRedoStack(newRedo);
        setStack(prev => [...prev, action]);
        setMessage(`Redo: "${action}"`);
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    <div className="p-2 rounded-lg mr-3 bg-indigo-500/20 text-indigo-400">
                        <FaLayerGroup />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-100">Action Stack</h3>
                        <p className="text-xs text-slate-500">LIFO Data Structure Visualization</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button onClick={popAction} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300" title="Undo (Pop)">
                        <FaUndo />
                    </button>
                    <button onClick={redoAction} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300" title="Redo">
                        <FaRedo />
                    </button>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="flex-1 bg-dark-deeper/50 rounded-xl border border-white/5 p-4 relative overflow-hidden flex flex-col-reverse justify-start space-y-2 space-y-reverse min-h-[200px]">
                {stack.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 italic text-sm">
                        Empty Stack
                    </div>
                )}
                {stack.map((item, index) => (
                    <div
                        key={index}
                        className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-mono flex justify-between items-center animate-slide-up"
                    >
                        <span>{item}</span>
                        <span className="text-[10px] opacity-50">Index: {index}</span>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="mt-4 space-y-3">
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>Stack Size: {stack.length}</span>
                    <span>Top: {stack.length > 0 ? stack.length - 1 : -1}</span>
                </div>
                <button
                    onClick={pushAction}
                    className="w-full btn-gradient py-2 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-500/20"
                >
                    Simulate New Action (Push)
                </button>
                <div className="h-6 text-center">
                    {message && (
                        <span className="text-xs text-emerald-400 font-mono animate-fade-in">{message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StackVisualizer;
