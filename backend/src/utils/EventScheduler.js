/**
 * EventScheduler - Central DSA Service Layer
 * 
 * Combines all data structures for optimized event management:
 * - BST: Events sorted by start_date for range queries
 * - IntervalTree: Overlap/conflict detection between events
 * - MinHeap: Priority queue for upcoming events
 * - HashMap: O(1) lookups by event ID, user ID, date key
 * - Trie: Autocomplete search for event names
 * - Graph: Event dependency tracking
 * 
 * Loaded from DB on startup, kept in-sync on CRUD operations.
 */

const BST = require('./dsa/BST');
const IntervalTree = require('./dsa/IntervalTree');
const MinHeap = require('./dsa/MinHeap');
const HashMap = require('./dsa/HashMap');
const Trie = require('./dsa/Trie');
const Graph = require('./dsa/Graph');

class EventScheduler {
    constructor() {
        // BST: sorted by start_date timestamp for range queries
        this.eventBST = new BST();

        // IntervalTree: for overlap/conflict detection
        this.intervalTree = new IntervalTree();

        // MinHeap: priority queue for upcoming events (priority = start_date timestamp)
        this.upcomingHeap = new MinHeap();

        // HashMap: O(1) lookup by event ID
        this.eventMap = new HashMap();

        // HashMap: O(1) lookup by date key (YYYY-MM-DD -> array of events)
        this.dateIndex = new HashMap();

        // Trie: autocomplete search by event name
        this.searchTrie = new Trie();

        // Graph: event dependencies
        this.dependencyGraph = new Graph();

        this.initialized = false;
    }

    /**
     * Initialize all data structures from an array of events (loaded from DB)
     */
    initialize(events) {
        this.clear();

        for (const event of events) {
            this._indexEvent(event);
        }

        this.initialized = true;
        console.log(`📊 EventScheduler initialized with ${events.length} events`);
        console.log(`   BST size: ${this.eventBST.getSize()}`);
        console.log(`   IntervalTree size: ${this.intervalTree.getSize()}`);
        console.log(`   HashMap entries: ${this.eventMap.getSize()}`);
    }

    /**
     * Index a single event into all data structures
     */
    _indexEvent(event) {
        const startTs = new Date(event.start_date).getTime();
        const endTs = new Date(event.end_date).getTime();

        // BST: keyed by start timestamp
        this.eventBST.insert(startTs, event);

        // IntervalTree: for overlap detection
        this.intervalTree.insert(startTs, endTs, event);

        // MinHeap: only future events
        if (startTs > Date.now()) {
            this.upcomingHeap.insert({ priority: startTs, data: event });
        }

        // HashMap: by event ID
        this.eventMap.set(event.id, event);

        // Date index: by YYYY-MM-DD
        const dateKey = new Date(event.start_date).toISOString().split('T')[0];
        const existing = this.dateIndex.get(dateKey);
        if (existing) {
            existing.push(event);
        } else {
            this.dateIndex.set(dateKey, [event]);
        }

        // Trie: index by name
        this.searchTrie.insert(event.name, event);

        // Graph: add node
        this.dependencyGraph.addNode(event.id, event);
    }

    /**
     * Remove an event from all data structures
     */
    _removeEvent(event) {
        const startTs = new Date(event.start_date).getTime();

        // BST
        this.eventBST.delete(startTs);

        // IntervalTree
        this.intervalTree.delete(event.id);

        // HashMap
        this.eventMap.delete(event.id);

        // Date index
        const dateKey = new Date(event.start_date).toISOString().split('T')[0];
        const dateEvents = this.dateIndex.get(dateKey);
        if (dateEvents) {
            const filtered = dateEvents.filter(e => e.id !== event.id);
            if (filtered.length > 0) {
                this.dateIndex.set(dateKey, filtered);
            } else {
                this.dateIndex.delete(dateKey);
            }
        }

        // Trie
        this.searchTrie.delete(event.name);

        // Graph
        this.dependencyGraph.removeNode(event.id);

        // Rebuild heap (no efficient delete in standard heap)
        this._rebuildHeap();
    }

    /**
     * Rebuild the upcoming events heap from the HashMap
     */
    _rebuildHeap() {
        this.upcomingHeap.clear();
        const now = Date.now();
        const allEvents = this.eventMap.values();
        for (const event of allEvents) {
            const startTs = new Date(event.start_date).getTime();
            if (startTs > now) {
                this.upcomingHeap.insert({ priority: startTs, data: event });
            }
        }
    }

    // ===================== PUBLIC API =====================

    /**
     * Add event - inserts into all structures, returns conflict info
     */
    addEvent(event) {
        const startTs = new Date(event.start_date).getTime();
        const endTs = new Date(event.end_date).getTime();

        // Check for overlapping events using IntervalTree
        const conflicts = this.intervalTree.findOverlapping(startTs, endTs);
        const realConflicts = conflicts.filter(c => c.id !== event.id);

        // Index the event
        this._indexEvent(event);

        return {
            event,
            conflicts: realConflicts,
            hasConflicts: realConflicts.length > 0
        };
    }

    /**
     * Update event - re-index in all structures
     */
    updateEvent(oldEvent, newEvent) {
        this._removeEvent(oldEvent);
        return this.addEvent(newEvent);
    }

    /**
     * Delete event - remove from all structures
     */
    deleteEvent(event) {
        this._removeEvent(event);
    }

    /**
     * Get event by ID - O(1) via HashMap
     */
    getEventById(id) {
        return this.eventMap.get(id);
    }

    /**
     * Get events by date - O(1) via HashMap date index
     */
    getEventsByDate(dateString) {
        return this.dateIndex.get(dateString) || [];
    }

    /**
     * Search events by name prefix - via Trie
     */
    searchByName(prefix) {
        if (!prefix || prefix.length === 0) {
            return this.eventMap.values();
        }
        return this.searchTrie.search(prefix);
    }

    /**
     * Find overlapping/conflicting events for a time range - via IntervalTree
     */
    findConflicts(startDate, endDate) {
        const startTs = new Date(startDate).getTime();
        const endTs = new Date(endDate).getTime();
        return this.intervalTree.findOverlapping(startTs, endTs);
    }

    /**
     * Get ALL conflicts in the system - via IntervalTree
     */
    getAllConflicts() {
        return this.intervalTree.findAllConflicts();
    }

    /**
     * Get events in a time range - via BST range query
     */
    getEventsInRange(startDate, endDate) {
        const startTs = new Date(startDate).getTime();
        const endTs = new Date(endDate).getTime();
        return this.eventBST.rangeQuery(startTs, endTs);
    }

    /**
     * Get next upcoming event - O(1) via MinHeap peek
     */
    getNextUpcoming() {
        const next = this.upcomingHeap.peek();
        return next ? next.data : null;
    }

    /**
     * Get N upcoming events - via MinHeap
     */
    getUpcomingEvents(count = 5) {
        return this.upcomingHeap.getAll().slice(0, count).map(item => item.data);
    }

    /**
     * Get all events sorted by start date - via BST inorder
     */
    getAllEventsSorted() {
        return this.eventBST.toArray();
    }

    /**
     * Add dependency between events
     */
    addDependency(fromEventId, toEventId) {
        return this.dependencyGraph.addEdge(fromEventId, toEventId);
    }

    /**
     * Get execution order respecting dependencies - via Graph topological sort
     */
    getExecutionOrder() {
        return this.dependencyGraph.topologicalSort();
    }

    /**
     * Get all events that depend on a given event
     */
    getDependents(eventId) {
        return this.dependencyGraph.getDependents(eventId);
    }

    /**
     * Get comprehensive stats about the event system
     */
    getStats() {
        const allConflicts = this.getAllConflicts();
        const nextEvent = this.getNextUpcoming();
        const graphInfo = this.dependencyGraph.getInfo();

        return {
            totalEvents: this.eventMap.getSize(),
            conflictsCount: allConflicts.length,
            conflicts: allConflicts.slice(0, 10), // Top 10 conflicts
            nextUpcoming: nextEvent,
            upcomingCount: this.upcomingHeap.size(),
            bstHeight: this.eventBST.getHeight(),
            graphNodes: graphInfo.nodes,
            graphEdges: graphInfo.edges,
            dataStructures: {
                bst: { type: 'Binary Search Tree', purpose: 'Sorted events by date', complexity: 'O(log n) search/insert' },
                intervalTree: { type: 'Interval Tree', purpose: 'Overlap/conflict detection', complexity: 'O(log n + k) query' },
                minHeap: { type: 'Min Heap', purpose: 'Priority queue for upcoming events', complexity: 'O(1) peek, O(log n) extract' },
                hashMap: { type: 'Hash Map', purpose: 'O(1) event lookup by ID', complexity: 'O(1) average' },
                trie: { type: 'Trie', purpose: 'Autocomplete event search', complexity: 'O(m) where m = prefix length' },
                graph: { type: 'Directed Graph', purpose: 'Event dependency tracking', complexity: 'O(V+E) topological sort' }
            }
        };
    }

    /**
     * Clear all data structures
     */
    clear() {
        this.eventBST.clear();
        this.intervalTree.clear();
        this.upcomingHeap.clear();
        this.eventMap.clear();
        this.dateIndex.clear();
        this.searchTrie.clear();
        this.dependencyGraph.clear();
        this.initialized = false;
    }
}

// Singleton instance
const scheduler = new EventScheduler();
module.exports = scheduler;
