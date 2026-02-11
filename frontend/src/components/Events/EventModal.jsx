import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../../services/api';
import { FaTimes } from 'react-icons/fa';

const EventModal = ({ isOpen, onClose, onSave, event }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        capacity: 0,
        status: 'draft'
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name || '',
                description: event.description || '',
                start_date: event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : '',
                end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : '',
                location: event.location || '',
                capacity: event.capacity || 0,
                status: event.status || 'draft'
            });
        } else {
            setFormData({
                name: '',
                description: '',
                start_date: '',
                end_date: '',
                location: '',
                capacity: 0,
                status: 'draft'
            });
        }
    }, [event]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (event) {
                await eventsAPI.update(event.id, formData);
            } else {
                await eventsAPI.create(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/10"
                style={{ background: 'var(--bg-card)' }}>
                {/* Header */}
                <div className="px-6 py-4 flex justify-between items-center text-white"
                    style={{ background: 'var(--gradient-primary)' }}>
                    <h3 className="text-xl font-bold">{event ? 'Edit Event' : 'Create New Event'}</h3>
                    <button onClick={onClose} className="hover:text-white/70 transition-colors"><FaTimes /></button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Event Name</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="dark-input"
                                placeholder="e.g. Annual Tech Summit"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Start Date & Time</label>
                            <input
                                required
                                type="datetime-local"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                className="dark-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">End Date & Time</label>
                            <input
                                required
                                type="datetime-local"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                className="dark-input"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Location</label>
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="dark-input"
                                placeholder="Physical address or Online Link"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                className="dark-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="dark-input"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="dark-input resize-none"
                                placeholder="Provide a brief overview of the event..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-white/10 rounded-lg text-slate-400 hover:bg-white/5 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-gradient px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
