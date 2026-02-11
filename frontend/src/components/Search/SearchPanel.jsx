import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaProjectDiagram, FaClock } from 'react-icons/fa';
import { eventsAPI, registrationsAPI } from '../../services/api';

const SearchPanel = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState('events');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [algorithmInfo, setAlgorithmInfo] = useState('');

    // Debounced live search as user types
    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            setHasSearched(false);
            setAlgorithmInfo('');
            return;
        }

        const timer = setTimeout(() => {
            performSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, searchType]);

    const performSearch = async (searchQuery) => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setHasSearched(true);
        try {
            let response;
            if (searchType === 'events') {
                response = await eventsAPI.search(searchQuery);
            } else {
                response = await registrationsAPI.search(searchQuery);
            }
            const body = response.data;
            const items = Array.isArray(body?.data) ? body.data : [];
            setResults(items);
            setAlgorithmInfo(body?.algorithm || 'Trie prefix search - O(m)');
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        performSearch(query);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
                    🔍 Search Engine
                </span>
                <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Trie-Powered Search</h2>
                <p className="text-slate-500 max-w-2xl">
                    Search events and registrations using an optimized Trie data structure for O(m) prefix matching, where m is the length of your query.
                </p>
            </div>

            {/* Search Form */}
            <div className="glass-card p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-3 mb-4">
                        <button
                            type="button"
                            onClick={() => setSearchType('events')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${searchType === 'events'
                                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                    : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            Events
                        </button>
                        <button
                            type="button"
                            onClick={() => setSearchType('registrations')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${searchType === 'registrations'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            Registrations
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={searchType === 'events' ? 'Type event name to search...' : 'Search by name or email...'}
                                className="dark-input pl-11 w-full"
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="btn-gradient px-6 py-2.5 rounded-lg font-semibold text-sm">
                            Search
                        </button>
                    </div>
                </form>

                {/* Algorithm Info */}
                {algorithmInfo && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                        <FaProjectDiagram className="text-indigo-400" />
                        <span>Algorithm: <span className="text-indigo-400 font-mono">{algorithmInfo}</span></span>
                        <span className="text-slate-600">|</span>
                        <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
                    </div>
                )}
            </div>

            {/* Results */}
            {loading && (
                <div className="text-center py-8 text-slate-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-3"></div>
                    Searching Trie nodes...
                </div>
            )}

            {!loading && hasSearched && results.length === 0 && (
                <div className="glass-card p-12 text-center">
                    <FaSearch className="text-4xl text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500">No matches found for "<span className="text-slate-300">{query}</span>"</p>
                    <p className="text-xs text-slate-600 mt-1">Trie traversal completed with 0 leaf nodes</p>
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((item) => (
                        <div key={item.id} className="glass-card p-5 hover:scale-[1.02] transition-transform duration-300">
                            {searchType === 'events' ? (
                                <>
                                    <div className="h-1 -mx-5 -mt-5 mb-4 rounded-t-lg" style={{ background: 'var(--gradient-primary)' }}></div>
                                    <h3 className="text-sm font-bold text-slate-100 mb-2 uppercase tracking-tight">{item.name}</h3>
                                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                                        {item.description || 'No description'}
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-xs text-slate-500">
                                            <FaCalendarAlt className="mr-2 text-indigo-400" />
                                            {new Date(item.start_date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <FaMapMarkerAlt className="mr-2 text-emerald-400" />
                                            {item.location || 'TBD'}
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <FaUsers className="mr-2 text-amber-400" />
                                            {item.capacity} capacity
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-white/5">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${item.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                                            }`}>{item.status}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="h-1 -mx-5 -mt-5 mb-4 rounded-t-lg bg-gradient-to-r from-amber-500 to-orange-500"></div>
                                    <h3 className="text-sm font-bold text-slate-100 mb-1">{item.name}</h3>
                                    <p className="text-xs text-slate-400 mb-2">{item.email}</p>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className={`px-2 py-0.5 rounded font-bold uppercase ${item.status === 'checked-in' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                            }`}>{item.status}</span>
                                        <span className="text-slate-500">{item.ticket_type}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!hasSearched && (
                <div className="glass-card p-8 text-center bg-dark-deeper/30 border border-white/5">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaSearch className="text-slate-600 text-xl" />
                    </div>
                    <p className="text-slate-500 font-medium mb-2">Enter a query to search</p>
                    <p className="text-xs text-slate-600">
                        Each character triggers a Trie traversal from root → matching prefix node → collect all leaf results
                    </p>
                </div>
            )}

            {/* How It Works */}
            <div className="glass-card p-6 bg-dark-deeper/50 border border-white/5">
                <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center">
                    <FaClock className="mr-2 text-indigo-400" /> How Trie Search Works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-white/5 rounded-lg">
                        <span className="text-indigo-400 text-xs font-bold uppercase block mb-1">Step 1: Insert</span>
                        <p className="text-[11px] text-slate-400">Each event name is inserted character-by-character into the Trie at O(m) time.</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                        <span className="text-emerald-400 text-xs font-bold uppercase block mb-1">Step 2: Traverse</span>
                        <p className="text-[11px] text-slate-400">Your query navigates the Trie from root, following edges matching each character.</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                        <span className="text-amber-400 text-xs font-bold uppercase block mb-1">Step 3: Collect</span>
                        <p className="text-[11px] text-slate-400">All leaf nodes below the prefix node are collected as autocomplete suggestions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPanel;
