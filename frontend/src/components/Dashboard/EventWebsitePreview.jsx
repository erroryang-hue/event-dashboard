import React from 'react';

const EventWebsitePreview = () => {
    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-100">Event website</h3>
            </div>

            <div className="flex-1 rounded-lg overflow-hidden relative group cursor-pointer min-h-[160px]">
                {/* Gradient Preview */}
                <div className="absolute inset-0 flex items-center justify-center p-6 text-white text-center"
                    style={{ background: 'var(--gradient-primary)' }}>
                    <div>
                        <h4 className="font-bold text-xl mb-2">Bright Future</h4>
                        <p className="text-sm opacity-90">Conference Aug 19th, 2025</p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors">
                        Preview Site
                    </button>
                </div>
            </div>

            <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-indigo-500/10 text-indigo-400 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-500/20 transition-colors">
                    Edit website
                </button>
                <button className="flex-1 bg-white/5 text-slate-400 py-2 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
                    Preview
                </button>
            </div>
        </div>
    );
};

export default EventWebsitePreview;
