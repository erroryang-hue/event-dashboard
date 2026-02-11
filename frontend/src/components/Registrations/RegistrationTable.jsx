import React from 'react';

const RegistrationTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b border-white/10">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-xs font-semibold text-indigo-400">Name</th>
                        <th scope="col" className="px-6 py-4 text-xs font-semibold text-indigo-400">Email</th>
                        <th scope="col" className="px-6 py-4 text-xs font-semibold text-indigo-400">Event</th>
                        <th scope="col" className="px-6 py-4 text-xs font-semibold text-indigo-400">Date</th>
                        <th scope="col" className="px-6 py-4 text-xs font-semibold text-indigo-400">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-200">{item.name}</td>
                            <td className="px-6 py-4 text-slate-400">{item.email}</td>
                            <td className="px-6 py-4 text-slate-400">{item.event_id || item.event || '—'}</td>
                            <td className="px-6 py-4 text-slate-400">{item.registration_date ? new Date(item.registration_date).toLocaleDateString() : (item.date || '—')}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'checked-in' ? 'text-emerald-400 bg-emerald-500/10' :
                                        item.status === 'registered' ? 'text-indigo-400 bg-indigo-500/10' :
                                            'text-amber-400 bg-amber-500/10'
                                    }`}>{item.status || 'Confirmed'}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistrationTable;
