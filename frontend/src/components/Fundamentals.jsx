import React from 'react';

const Fundamentals = () => {
    const concepts = [
        {
            title: 'Arrays & Pagination',
            description: 'Used for main event listings. Contiguous memory allocation allows O(1) random access but O(n) shifting for insertion/deletion.',
            complexity: 'O(1) / O(n)',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Stacks (LIFO)',
            description: 'Powers the "Undo Booking" feature. Last-In-First-Out principle ensures the most recent action is reversible first.',
            complexity: 'O(1)',
            color: 'from-indigo-500 to-purple-500',
        },
        {
            title: 'Heaps (Priority Queue)',
            description: 'Manages "Trending Events". A binary heap ensures we always have quick access to the maximum (most viewed) element.',
            complexity: 'O(log n)',
            color: 'from-pink-500 to-rose-500',
        },
        {
            title: 'Hash Tables',
            description: 'Enables O(1) event search. Uses a hashing function to map keys to indices, handling collisions via chaining.',
            complexity: 'O(1) avg',
            color: 'from-amber-500 to-orange-500',
        },
        {
            title: 'Binary Search Trees',
            description: 'Organizes the event timeline. Allows efficient range queries and ordered traversal for schedule views.',
            complexity: 'O(log n)',
            color: 'from-emerald-500 to-teal-500',
        },
    ];

    return (
        <section id="fundamentals" className="py-20 relative bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Core Concepts</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Understanding the building blocks of efficient software. Each structure is chosen for specific performance characteristics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {concepts.map((concept, index) => (
                        <div key={index} className="glass-card p-8 group relative overflow-hidden transition-all hover:scale-[1.02]">
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${concept.color}`}></div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                {concept.title}
                            </h3>
                            <div className={`inline-block px-2 py-1 rounded text-xs font-bold bg-white/5 mb-4 border border-white/10`}>
                                Complexity: <span className="text-indigo-400">{concept.complexity}</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {concept.description}
                            </p>

                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fundamentals;
