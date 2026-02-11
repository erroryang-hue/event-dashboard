import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../../services/api';
import { FaPlus, FaPencilAlt, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCode, FaExclamationTriangle } from 'react-icons/fa';
import EventModal from './EventModal';


const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [conflictCount, setConflictCount] = useState(0);
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [lastConflictResult, setLastConflictResult] = useState(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await eventsAPI.getAll();
            const body = response.data;
            const items = Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : []);
            setEvents(items);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const [conflictRes, upcomingRes] = await Promise.all([
                eventsAPI.getConflicts(),
                eventsAPI.getUpcoming(10)
            ]);
            setConflictCount(conflictRes.data?.data?.count || 0);
            setUpcomingCount(upcomingRes.data?.data?.upcoming?.length || 0);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchStats();
    }, []);

    const handleAdd = () => {
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventsAPI.delete(id);
                fetchEvents();
                fetchStats();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setLastConflictResult(null);
    };

    const handleSave = async (conflictData) => {
        if (conflictData?.hasConflicts) {
            setLastConflictResult(conflictData);
        }
        fetchEvents();
        fetchStats();
        handleModalClose();
    };

    if (loading) return (
        <div className="p-8 text-center text-slate-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-3"></div>
            Loading events...
        </div>
    );

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            {/* Section Header - Matching Reference Style */}
            <div className="flex justify-between items-end">
                <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                        📅 Event Scheduler
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Event Life-cycle Management</h2>
                    <p className="text-slate-500 max-w-xl">
                        Sorted timeline management using Binary Search Tree principles for conflict detection and scheduling efficiency.
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="btn-gradient px-6 py-3 rounded-xl flex items-center font-bold text-sm shadow-lg shadow-indigo-500/20"
                >
                    <FaPlus className="mr-2" /> CREATE EVENT
                </button>
            </div>

            {/* Problem/Logic Stats Row - Live from Backend */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-indigo-400 mb-1">{events.length}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">BST Nodes</span>
                </div>
                <div className={`glass-card p-4 flex flex-col items-center justify-center text-center ${conflictCount > 0 ? 'border border-amber-500/30' : ''}`}>
                    <span className={`text-2xl font-bold mb-1 ${conflictCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {conflictCount}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                        {conflictCount > 0 ? '⚠️ Conflicts' : '✅ No Conflicts'}
                    </span>
                </div>
                <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-amber-400 mb-1">O(log n)</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Insertion speed</span>
                </div>
                <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-pink-400 mb-1">{upcomingCount}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Upcoming (Heap)</span>
                </div>
            </div>

            {/* Conflict Alert Banner */}
            {lastConflictResult && lastConflictResult.hasConflicts && (
                <div className="glass-card p-4 border border-amber-500/30 bg-amber-500/5 flex items-start gap-3">
                    <FaExclamationTriangle className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-amber-400">IntervalTree Conflict Detected!</p>
                        <p className="text-xs text-slate-400 mt-1">
                            The event you just created overlaps with: {lastConflictResult.conflicts.map(c => c.name).join(', ')}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="glass-card overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        <div className="h-1.5" style={{ background: 'var(--gradient-primary)' }}></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{event.name}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="text-slate-500 hover:text-indigo-400 p-1.5 bg-white/5 rounded-lg transition-colors"
                                    >
                                        <FaPencilAlt size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="text-slate-500 hover:text-red-400 p-1.5 bg-white/5 rounded-lg transition-colors"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10 leading-relaxed font-light">
                                {event.description || 'No description provided. Define the objective and constraints for this event node.'}
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-xs">
                                    <FaCalendarAlt className="mr-3 text-indigo-400" />
                                    <span className="text-slate-300 font-medium">Timeline:</span>
                                    <span className="ml-2 text-slate-400">{new Date(event.start_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-xs">
                                    <FaMapMarkerAlt className="mr-3 text-emerald-400" />
                                    <span className="text-slate-300 font-medium">Location:</span>
                                    <span className="ml-2 text-slate-400 line-clamp-1">{event.location || 'Distributed / Cloud'}</span>
                                </div>
                                <div className="flex items-center text-xs">
                                    <FaUsers className="mr-3 text-amber-400" />
                                    <span className="text-slate-300 font-medium">Capacity:</span>
                                    <span className="ml-2 text-slate-400">{event.capacity} Entities</span>
                                </div>
                            </div>

                            <div className="pt-5 border-t border-white/5 flex justify-between items-center">
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] ${event.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    event.status === 'draft' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' :
                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    }`}>
                                    {event.status}
                                </span>
                                <button className="flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                                    <FaCode className="mr-2 opacity-50" /> VIEW LOGIC
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {events.length === 0 && (
                <div className="glass-card p-16 text-center border-2 border-dashed border-white/5 bg-transparent">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaPlus className="text-slate-600 text-xl" />
                    </div>
                    <p className="text-slate-500 font-medium">No event nodes detected in the current tree structure.</p>
                    <button onClick={handleAdd} className="mt-4 text-indigo-400 text-sm font-bold hover:underline">Insert Root Node</button>
                </div>
            )}



            <EventModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSave}
                event={selectedEvent}
            />
        </div>
    );
};

export default EventList;
