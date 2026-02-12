import React, { useState } from 'react';
import { FaTicketAlt, FaTimes } from 'react-icons/fa';

const BookingModal = ({ isOpen, onClose, onConfirm, eventName, price }) => {
    const [participantName, setParticipantName] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!participantName.trim()) {
            setError('Please enter a participant name.');
            return;
        }
        onConfirm(participantName);
        setParticipantName('');
        setError('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <FaTimes />
                </button>

                {/* Header */}
                <div className="mb-6 text-center">
                    <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaTicketAlt size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Book Ticket</h2>
                    <p className="text-slate-400 text-sm mt-1">
                        {eventName} <span className="text-slate-600 mx-2">•</span> <span className="text-emerald-400 font-mono">₹{price}</span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Participant Name
                        </label>
                        <input
                            type="text"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                            placeholder="Enter your name..."
                            autoFocus
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
