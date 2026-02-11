import React from 'react';

const StatCard = ({ title, value, icon, subtext, color }) => {
    return (
        <div className="glass-card p-6 flex items-center group">
            <div className="p-4 rounded-xl mr-5 bg-white/5 group-hover:bg-white/10 transition-colors">
                <span className="text-2xl">{icon}</span>
            </div>
            <div>
                <p className="text-sm text-slate-400 font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-100">{value}</h3>
                {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
            </div>
        </div>
    );
};

export default StatCard;
