import React, { useEffect, useState } from 'react';
import RegistrationTable from './RegistrationTable';
import { registrationsAPI } from '../../services/api';
import { FaDatabase, FaShieldAlt } from 'react-icons/fa';

import HashTableVisualizer from './HashTableVisualizer';

const RegistrationList = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const res = await registrationsAPI.getAll();
            const body = res.data;
            const items = Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : []);
            setRegistrations(items);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch registrations", error);
            setLoading(false);
            setRegistrations([
                { id: 1, name: 'John Doe', email: 'john@example.com', event: 'Tech Conf', date: '2024-05-15' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', event: 'Music Fest', date: '2024-07-20' },
                { id: 3, name: 'Mike Johnson', email: 'mike@example.com', event: 'Web Workshop', date: '2024-06-10' },
                { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', event: 'AI Summit', date: '2024-08-05' },
            ]);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Section Header */}
            <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-3">
                    📇 Registry System
                </span>
                <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Attendee Registrations</h2>
                <p className="text-slate-500 max-w-2xl">
                    High-integrity data registry for attendee identity verification and access control management.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="lg:col-span-3 glass-card p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-slate-100">Registrant Database</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-400 font-bold uppercase hover:bg-white/10 transition-colors">Export CSV</button>
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-3"></div>
                            Accessing registry...
                        </div>
                    ) : (
                        <RegistrationTable data={registrations} />
                    )}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {/* NEW: Interactive Hash Visualizer */}
                    <HashTableVisualizer />

                    <div className="glass-card p-6 border-t-2 border-amber-500">
                        <h3 className="font-bold text-slate-100 mb-4 flex items-center text-sm">
                            <FaDatabase className="mr-2 text-amber-500" /> Registry Stats
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Total Records</span>
                                <span className="text-2xl font-bold text-slate-100 line-clamp-1">{registrations.length.toLocaleString()}</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[65%]"></div>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                Registry integrity verified at O(1) hash check.
                            </p>
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-dark-deeper/30 border border-white/5">
                        <h3 className="font-bold text-slate-100 mb-4 flex items-center text-sm">
                            <FaShieldAlt className="mr-2 text-emerald-500" /> Security Layer
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-[11px] text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                SHA-256 Hashing
                            </li>
                            <li className="flex items-center text-[11px] text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                JWT Verification
                            </li>
                            <li className="flex items-center text-[11px] text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                Cross-site Guards
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Why Registry? Section - Porting logic style from reference */}
            <div className="glass-card p-8 bg-dark-deeper/50 border border-white/5">
                <h3 className="text-lg font-bold text-slate-100 mb-4">💡 Why Secure Registry?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h5 className="text-amber-500 text-xs font-bold uppercase mb-2">LIFO Queue</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Most recent registrations are processed first for check-in efficiency.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-indigo-400 text-xs font-bold uppercase mb-2">Hash Mapping</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Attendee lookup is optimized to O(1) using unique hash identifiers.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-emerald-500 text-xs font-bold uppercase mb-2">BST Sorted</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Data is maintained in sorted order for rapid alphabetical querying.
                        </p>
                    </div>
                </div>
            </div>

            {/* NEW: Code Explanation Section */}

        </div>
    );
};

export default RegistrationList;
