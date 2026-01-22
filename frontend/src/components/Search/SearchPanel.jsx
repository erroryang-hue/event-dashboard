import React, { useState } from 'react';

const SearchPanel = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        // Implement Trie search logic call here if applicable via API
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Search Events & Users</h2>
            <form onSubmit={handleSearch} className="flex gap-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, email, or event..."
                    className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </form>
            <div className="mt-6">
                <p className="text-gray-500 italic">Enter a query to see results...</p>
            </div>
        </div>
    );
};

export default SearchPanel;
