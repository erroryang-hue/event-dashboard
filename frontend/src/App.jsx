import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fundamentals from './components/Fundamentals';
import ArrayVisualizer from './components/ArrayVisualizer';
import StackVisualizer from './components/StackVisualizer';
import HeapVisualizer from './components/HeapVisualizer';
import HashTableVisualizer from './components/HashTableVisualizer';
import BSTVisualizer from './components/BSTVisualizer';
import CodeExplanation from './components/CodeExplanation';
import Footer from './components/Footer';

// Import DSA Classes
import { Stack, MaxHeap, HashTable, BinarySearchTree, SortingAlgorithms, IntervalTree, Interval, Trie } from './utils/dsa';

function App() {
  // --- Central State ---
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Summit 2026', date: '2026-03-15', startTime: '09:00', endTime: '12:00', location: 'Convention Center', price: 299, views: 1200 },
    { id: 2, title: 'Music Festival', date: '2026-04-20', startTime: '18:00', endTime: '23:00', location: 'City Park', price: 150, views: 8500 },
    { id: 3, title: 'Startup Pitch', date: '2026-05-10', startTime: '14:00', endTime: '16:00', location: 'Innovation Hub', price: 0, views: 3200 },
  ]);

  // DSA Instances
  const [bookingStack] = useState(new Stack());
  const [trendingHeap] = useState(new MaxHeap());
  const [eventHashTable] = useState(new HashTable(20));
  const [eventBST] = useState(new BinarySearchTree());
  const [conflictTree] = useState(new IntervalTree());
  const [searchTrie] = useState(new Trie());

  // Force Update Helper
  const [, setTick] = useState(0);
  const forceUpdate = () => setTick(t => t + 1);

  // --- Initialization / Sync ---
  const rebuildDSAInstances = () => {
    // Heap
    trendingHeap.heap = [];
    events.forEach(e => trendingHeap.insert(e));

    // Hash Table
    eventHashTable.table = new Array(eventHashTable.size);
    events.forEach(e => eventHashTable.set(e.title, e)); // .set() now appends to list

    // BST
    eventBST.root = null;
    events.forEach(e => eventBST.insert(e));

    // Interval Tree (Conflict Detection)
    conflictTree.root = null;
    events.forEach(e => {
      if (e.date && e.startTime && e.endTime) {
        const start = new Date(`${e.date}T${e.startTime}`).getTime();
        const end = new Date(`${e.date}T${e.endTime}`).getTime();
        if (!isNaN(start) && !isNaN(end)) {
          conflictTree.insert(new Interval(start, end, { id: e.id, title: e.title, location: e.location }));
        }
      }
    });

    // Trie
    searchTrie.root = { children: {}, isEndOfWord: false, data: null }; // Reset manual for demo
    events.forEach(e => searchTrie.insert(e.title, e));

    forceUpdate();
  };

  useEffect(() => {
    rebuildDSAInstances();
  }, [events]);

  // --- Actions ---

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleBookEvent = (event) => {
    const booking = {
      id: Date.now(),
      title: event.title,
      timestamp: new Date().toLocaleTimeString(),
      type: 'BOOKING'
    };
    bookingStack.push(booking);
    forceUpdate();
  };

  const handleSortEvents = (algo = 'merge') => {
    let sorted;
    if (algo === 'merge') {
      sorted = SortingAlgorithms.mergeSort([...events]);
    } else {
      sorted = SortingAlgorithms.quickSort([...events]);
    }
    setEvents(sorted);
  };

  const handleReSyncEvents = () => {
    // Re-trigger build which mimics "Add all events again"
    rebuildDSAInstances();
    // To simulate "Action", we can maybe clear and rebuild with delay?
    // For now, instant rebuild ensures consistency if things got desynced or just to demonstrate.
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      <Navbar />
      <Hero />

      {/* Interactive Demos Section */}
      <section id="demos" className="py-20 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title">Live Integrated Data Structures</h2>
            <p className="text-slate-400">All components below share the same data. Change one, update all.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ArrayVisualizer
              events={events}
              onAddEvent={handleAddEvent}
              onBookEvent={handleBookEvent}
              onSortEvents={handleSortEvents}
              onReSyncEvents={handleReSyncEvents}
              conflictTree={conflictTree}
            />
            <StackVisualizer stack={bookingStack} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <HeapVisualizer heap={trendingHeap} />
            <HashTableVisualizer hashTable={eventHashTable} trie={searchTrie} />
            <BSTVisualizer bst={eventBST} />
          </div>
        </div>
      </section>

      {/* Fundamentals & Code moved to bottom as requested */}
      <div className="bg-slate-900 border-t border-slate-800">
        <Fundamentals />
        <CodeExplanation />
      </div>

      <Footer />
    </div>
  );
}

export default App;