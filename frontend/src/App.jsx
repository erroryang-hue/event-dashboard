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
import BookingModal from './components/BookingModal';

// Import DSA Classes
import { Stack, MaxHeap, HashTable, BinarySearchTree, SortingAlgorithms, IntervalTree, Interval, Trie } from './utils/dsa';

function App() {
  // --- Central State ---
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Summit 2026', date: '2026-03-15', startTime: '09:00', endTime: '12:00', location: 'Convention Center', price: 299, capacity: 100 },
    { id: 2, title: 'Music Festival', date: '2026-04-20', startTime: '18:00', endTime: '23:00', location: 'City Park', price: 150, capacity: 500 },
    { id: 3, title: 'Startup Pitch', date: '2026-05-10', startTime: '14:00', endTime: '16:00', location: 'Innovation Hub', price: 0, capacity: 50 },
  ]);

  // DSA Instances
  const [bookingStack] = useState(new Stack());
  const [trendingHeap] = useState(new MaxHeap());
  const [eventHashTable] = useState(new HashTable(20));
  const [eventBST] = useState(new BinarySearchTree());
  const [conflictTree] = useState(new IntervalTree());
  const [searchTrie] = useState(new Trie());

  // Reactivity State for Bookings (Fix for stats not updating)
  const [bookings, setBookings] = useState([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Force Update Helper
  const [, setTick] = useState(0);
  const forceUpdate = () => setTick(t => t + 1);

  // --- Initialization / Sync ---
  const rebuildDSAInstances = () => {
    // Heap
    trendingHeap.heap = [];
    events.forEach(e => {
      // Calculate registrations for Heap logic (if we are using registrations for "Trending")
      // In a real app we'd update this live, here we do it on sync
      const registrations = bookings.filter(b => b.eventId === e.id).length;
      trendingHeap.insert({ ...e, registrations });
    });

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
  }, [events, bookings]); // Added bookings dependency to update heap stats if needed

  // --- Actions ---

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  // Open Modal logic
  const handleInitiateBooking = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Confirm Booking Logic
  const handleConfirmBooking = (participantName) => {
    if (!selectedEvent) return;

    // Capacity Validation
    const currentRegistrations = bookings.filter(b => b.eventId === selectedEvent.id).length;
    if (currentRegistrations >= (selectedEvent.capacity || 0)) {
      alert(`Event Full! Capacity of ${selectedEvent.capacity} reached.`);
      setIsModalOpen(false);
      return;
    }

    const booking = {
      id: Date.now(),
      eventId: selectedEvent.id, // Store event ID for stats calculation
      title: selectedEvent.title,
      participantName: participantName, // Store participant name
      price: selectedEvent.price, // Store price for revenue calculation
      timestamp: new Date().toLocaleTimeString(),
      type: 'BOOKING'
    };

    // Push to DSA Stack
    bookingStack.push(booking);

    // Update React State (Crucial for Stats Reactivity)
    setBookings([...bookingStack.items]);

    // Close Modal and Reset
    setIsModalOpen(false);
    setSelectedEvent(null);
    forceUpdate();
  };

  const handleUndoBooking = () => {
    if (bookingStack.isEmpty()) return;
    bookingStack.pop();
    setBookings([...bookingStack.items]); // Update React state to trigger re-renders
    forceUpdate();
  };

  const handleDeleteBooking = (id) => {
    // 1. Remove from React State
    const updatedBookings = bookings.filter(b => b.id !== id);
    setBookings(updatedBookings);

    // 2. Sync with DSA Stack (For visualization limits/logic)
    // We rebuild the stack items from the filtered list to keep them in sync
    // This is a bit "hacky" for a pure Stack but necessary for random access delete in this UI
    bookingStack.items = updatedBookings;

    forceUpdate();
  };

  const handleSortEvents = (algo = 'merge') => {
    // Pre-calculate registrations for sorting
    const eventsWithStats = events.map(e => ({
      ...e,
      registrations: bookings.filter(b => b.eventId === e.id).length
    }));

    let sorted;
    if (algo === 'merge') {
      sorted = SortingAlgorithms.mergeSort([...eventsWithStats]);
    } else {
      sorted = SortingAlgorithms.quickSort([...eventsWithStats]);
    }

    // Update events with the sorted order
    // Note: We might want to keep the 'registrations' property for display or just use the order.
    // The visualizer calculates it fresh anyway.
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
              bookings={bookings} // Pass reactive bookings state
              onAddEvent={handleAddEvent}
              onBookEvent={handleInitiateBooking} // Triggers Modal
              onSortEvents={handleSortEvents}
              onReSyncEvents={handleReSyncEvents}
              conflictTree={conflictTree}
            />
            <StackVisualizer
              stack={bookingStack}
              bookings={bookings} // Pass reactive bookings for display
              onUndo={handleUndoBooking} // Pass undo handler
              onDelete={handleDeleteBooking} // Pass delete handler
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <HeapVisualizer heap={trendingHeap} />
            <HashTableVisualizer hashTable={eventHashTable} trie={searchTrie} />
            <BSTVisualizer bst={eventBST} />
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
        eventName={selectedEvent?.title}
        price={selectedEvent?.price}
      />

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