import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaArrowRight, FaArrowLeft, FaSortAmountDown, FaTicketAlt, FaEye, FaSync, FaClock } from 'react-icons/fa';

const ArrayVisualizer = ({ events = [], bookings = [], onAddEvent, onBookEvent, onSortEvents, onReSyncEvents, conflictTree }) => {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    // Pagination Logic
    const totalPages = Math.ceil(events.length / pageSize);
    const paginatedEvents = events.slice((page - 1) * pageSize, page * pageSize);

    const [newEvent, setNewEvent] = useState({
        title: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '11:00',
        price: '',
        capacity: ''
    });

    // Reset page if out of bounds (e.g. after filtering/sorting)
    useEffect(() => {
        if (page > totalPages && totalPages > 0) setPage(totalPages);
    }, [events.length, totalPages]);

    // Heat Map Logic: Find max capacity to normalize color intensity (or just use constant? using capacity)
    const maxCapacity = Math.max(...events.map(e => e.capacity || 0), 1);

    const [error, setError] = useState('');

    // Real-time Validation
    useEffect(() => {
        if (!newEvent.title) {
            setError('');
            return;
        }

        const start = new Date(`${newEvent.date}T${newEvent.startTime}`);
        const end = new Date(`${newEvent.date}T${newEvent.endTime}`);
        const now = new Date();

        if (start < now) {
            setError("Events cannot be scheduled in the past.");
        } else if (start >= end) {
            setError("End Time must be after Start Time.");
        } else {
            setError('');
        }
    }, [newEvent.date, newEvent.startTime, newEvent.endTime, newEvent.title]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final check before submit
        if (error || !newEvent.title) return;

        // Conflict Detection (Interval Tree)
        const start = new Date(`${newEvent.date}T${newEvent.startTime}`);
        const end = new Date(`${newEvent.date}T${newEvent.endTime}`);
        const startTs = start.getTime();
        const endTs = end.getTime();

        const potentialConflict = conflictTree ? conflictTree.checkOverlap({ start: startTs, end: endTs }) : null;

        if (potentialConflict) {
            if (potentialConflict.data.location === (newEvent.location || 'TBD')) {
                const cStart = new Date(potentialConflict.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const cEnd = new Date(potentialConflict.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setError(`Conflict: "${potentialConflict.data.title}" is at ${potentialConflict.data.location} (${cStart}-${cEnd}).`);
                return;
            }
        }

        onAddEvent({
            id: Date.now(),
            title: newEvent.title,
            location: newEvent.location || 'TBD',
            date: newEvent.date,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            price: parseInt(newEvent.price) || 0,
            capacity: parseInt(newEvent.capacity) || 0
        });

        // Reset
        setNewEvent({ ...newEvent, title: '', price: '', capacity: '' });
        setError('');
    };

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        Array Visualizer (Event List)
                        <span className="text-xs font-normal text-slate-500 ml-2 border border-slate-700 px-2 py-0.5 rounded">Array Source</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Single Source of Truth • O(n) Sort</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onReSyncEvents}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700"
                        title="Re-Sync / Build All Structures"
                    >
                        <FaSync /> Re-Sync
                    </button>
                    <button
                        onClick={() => onSortEvents('merge')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700"
                        title="Sort by Registrations (Descending)"
                    >
                        <FaSortAmountDown /> Sort by Registrations
                    </button>
                </div>
            </div>

            {/* Add Event Form */}
            <form onSubmit={handleSubmit} className="mb-6 bg-slate-900/50 p-4 rounded-lg border border-slate-800 grid grid-cols-2 gap-3">
                <input
                    type="text"
                    className="col-span-2 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="Event Title..."
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                    type="text"
                    className="col-span-2 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="Location (Conflict Check)"
                    value={newEvent.location}
                    onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                />

                {/* Date and Time Inputs */}
                <input
                    type="date"
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    value={newEvent.date}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                />

                <div className="flex gap-2">
                    <input
                        type="time"
                        className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        title="Start Time"
                        value={newEvent.startTime}
                        onChange={e => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    />
                    <input
                        type="time"
                        className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        title="End Time"
                        value={newEvent.endTime}
                        onChange={e => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    />
                </div>

                <input
                    type="number"
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="Price ($)"
                    value={newEvent.price}
                    onChange={e => setNewEvent({ ...newEvent, price: e.target.value })}
                />
                <input
                    type="number"
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="Capacity"
                    value={newEvent.capacity}
                    onChange={e => setNewEvent({ ...newEvent, capacity: e.target.value })}
                />
                <button
                    type="submit"
                    disabled={!newEvent.title || error}
                    className="col-span-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded font-bold text-sm transition-colors mt-2 shadow-lg shadow-blue-900/20"
                >
                    <FaPlus className="inline mr-1" size={10} /> Add Event
                </button>

                {error && (
                    <div className="col-span-2 text-xs text-red-400 bg-red-900/20 border border-red-500/30 p-2 rounded text-center font-bold animate-pulse">
                        {error}
                    </div>
                )}
            </form>

            {/* List */}
            <div className="flex-1 space-y-3 mb-6 min-h-[300px]">
                {events && events.length > 0 ? (
                    paginatedEvents.map((event, index) => {
                        // Calculate Stats
                        const registeredCount = bookings.filter(b => b.eventId === event.id).length;

                        // Use registered count for intensity? Or capacity utilization?
                        // Let's use capacity utilization for heat map intensity
                        const utilization = (registeredCount / (event.capacity || 1));
                        const intensity = Math.min(utilization, 1);
                        const hue = 200 - (intensity * 200); // Blue to Red
                        const borderColor = `hsl(${hue}, 70%, 50%)`;

                        const totalRevenue = registeredCount * (event.price || 0);

                        return (
                            <div
                                key={event?.id || index}
                                className="array-cell p-4 rounded-lg flex justify-between items-center group hover:scale-[1.01] transition-transform relative overflow-hidden border"
                                style={{ borderColor: borderColor, boxShadow: `0 0 ${intensity * 10}px ${borderColor}40` }}
                            >

                                <div className="flex-1">
                                    <div className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors flex justify-between">
                                        <span>{event.title}</span>
                                        <div className="flex flex-col items-end">
                                            <span className="text-blue-400 font-mono">${event.price}</span>
                                            <span className="text-[10px] text-slate-500">{event.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-xs text-slate-400 mb-2">
                                        <span className="flex items-center gap-1"><FaCalendarAlt /> {event.date}</span>
                                        {event.time && <span className="flex items-center gap-1"><FaClock /> {event.time}</span>}
                                        <span className="flex items-center gap-1" title="Max Capacity"><FaEye /> Cap: {event.capacity?.toLocaleString()}</span>
                                    </div>

                                    {/* Stats Display */}
                                    <div className="flex gap-4 text-xs font-mono text-emerald-400 mb-2 bg-slate-950/30 p-1.5 rounded border border-slate-800">
                                        <span>Registered: {registeredCount}</span>
                                        <span>Revenue: ₹{totalRevenue}</span>
                                    </div>

                                    <button
                                        onClick={() => onBookEvent(event)}
                                        className="text-[10px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                                    >
                                        <FaTicketAlt /> Book Ticket
                                    </button>
                                </div>

                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-slate-500 py-10">No events. Add one!</div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-auto">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                    <FaArrowLeft />
                </button>
                <div className="text-xs text-slate-500">
                    Page {page} of {Math.max(1, totalPages)}
                </div>
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || totalPages === 0}
                    className="text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                    <FaArrowRight />
                </button>
            </div>
        </div >
    );
};

export default ArrayVisualizer;
