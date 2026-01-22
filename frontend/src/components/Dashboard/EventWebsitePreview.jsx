import React from 'react';

const EventWebsitePreview = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Event website</h3>
            </div>

            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer">
                {/* Placeholder for website screenshot */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-6 text-white text-center">
                    <div>
                        <h4 className="font-bold text-xl mb-2">Bright Future</h4>
                        <p className="text-sm opacity-90">Conference Aug 19th, 2025</p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold shadow-lg">Preview Site</button>
                </div>
            </div>

            <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-indigo-50 text-indigo-700 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-100 transition-colors">
                    Edit website
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Preview
                </button>
            </div>
        </div>
    );
};

export default EventWebsitePreview;
