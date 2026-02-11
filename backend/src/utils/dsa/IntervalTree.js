/**
 * Interval Tree Implementation for Event Scheduling & Collision Detection
 * 
 * Used to detect overlapping events efficiently.
 * Overlap condition: event1.start < event2.end AND event2.start < event1.end
 * 
 * Time Complexity:
 * - Insert: O(log n)
 * - Overlap Query: O(log n + k) where k = number of overlapping intervals
 * - Delete: O(log n)
 */
class IntervalNode {
    constructor(start, end, data) {
        this.start = start;       // interval start (timestamp)
        this.end = end;           // interval end (timestamp)
        this.max = end;           // max end in subtree
        this.data = data;         // associated event data
        this.left = null;
        this.right = null;
        this.height = 1;          // AVL height for balancing
    }
}

class IntervalTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    // Get height of a node
    _height(node) {
        return node ? node.height : 0;
    }

    // Get balance factor
    _balanceFactor(node) {
        return node ? this._height(node.left) - this._height(node.right) : 0;
    }

    // Update height and max of a node
    _update(node) {
        if (!node) return;
        node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
        node.max = node.end;
        if (node.left) node.max = Math.max(node.max, node.left.max);
        if (node.right) node.max = Math.max(node.max, node.right.max);
    }

    // Right rotation (AVL)
    _rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        this._update(y);
        this._update(x);
        return x;
    }

    // Left rotation (AVL)
    _rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        this._update(x);
        this._update(y);
        return y;
    }

    // Balance the node (AVL balancing)
    _balance(node) {
        this._update(node);
        const bf = this._balanceFactor(node);

        // Left heavy
        if (bf > 1) {
            if (this._balanceFactor(node.left) < 0) {
                node.left = this._rotateLeft(node.left);
            }
            return this._rotateRight(node);
        }

        // Right heavy
        if (bf < -1) {
            if (this._balanceFactor(node.right) > 0) {
                node.right = this._rotateRight(node.right);
            }
            return this._rotateLeft(node);
        }

        return node;
    }

    /**
     * Insert an interval [start, end] with associated data
     */
    insert(start, end, data) {
        this.root = this._insert(this.root, start, end, data);
        this.size++;
    }

    _insert(node, start, end, data) {
        if (!node) return new IntervalNode(start, end, data);

        if (start < node.start || (start === node.start && end < node.end)) {
            node.left = this._insert(node.left, start, end, data);
        } else {
            node.right = this._insert(node.right, start, end, data);
        }

        return this._balance(node);
    }

    /**
     * Check if two intervals overlap
     * event1.start < event2.end AND event2.start < event1.end
     */
    _overlaps(start1, end1, start2, end2) {
        return start1 < end2 && start2 < end1;
    }

    /**
     * Find all intervals that overlap with [start, end]
     * Returns array of event data objects that conflict
     */
    findOverlapping(start, end) {
        const results = [];
        this._findOverlapping(this.root, start, end, results);
        return results;
    }

    _findOverlapping(node, start, end, results) {
        if (!node) return;

        // If node's max is less than query start, no overlap possible in this subtree
        if (node.max <= start) return;

        // Search left subtree
        this._findOverlapping(node.left, start, end, results);

        // Check current node
        if (this._overlaps(node.start, node.end, start, end)) {
            results.push(node.data);
        }

        // If current node's start is >= query end, no need to search right
        if (node.start >= end) return;

        // Search right subtree
        this._findOverlapping(node.right, start, end, results);
    }

    /**
     * Find all intervals within a given range [rangeStart, rangeEnd]
     * Returns events that START within the range
     */
    rangeQuery(rangeStart, rangeEnd) {
        const results = [];
        this._rangeQuery(this.root, rangeStart, rangeEnd, results);
        return results;
    }

    _rangeQuery(node, rangeStart, rangeEnd, results) {
        if (!node) return;

        if (node.start > rangeStart) {
            this._rangeQuery(node.left, rangeStart, rangeEnd, results);
        }

        if (node.start >= rangeStart && node.start <= rangeEnd) {
            results.push(node.data);
        }

        if (node.start < rangeEnd) {
            this._rangeQuery(node.right, rangeStart, rangeEnd, results);
        }
    }

    /**
     * Delete an interval by its data id
     */
    delete(eventId) {
        const result = { found: false };
        this.root = this._delete(this.root, eventId, result);
        if (result.found) this.size--;
        return result.found;
    }

    _delete(node, eventId, result) {
        if (!node) return null;

        if (node.data && node.data.id === eventId) {
            result.found = true;
            // Node to delete found
            if (!node.left && !node.right) return null;
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Find min in right subtree
            let minNode = node.right;
            while (minNode.left) minNode = minNode.left;
            node.start = minNode.start;
            node.end = minNode.end;
            node.data = minNode.data;
            node.right = this._delete(node.right, minNode.data.id, { found: false });
            return this._balance(node);
        }

        node.left = this._delete(node.left, eventId, result);
        if (!result.found) {
            node.right = this._delete(node.right, eventId, result);
        }

        return this._balance(node);
    }

    /**
     * Get all intervals sorted by start time
     */
    getAllSorted() {
        const results = [];
        this._inorder(this.root, results);
        return results;
    }

    _inorder(node, results) {
        if (!node) return;
        this._inorder(node.left, results);
        results.push(node.data);
        this._inorder(node.right, results);
    }

    /**
     * Find all pairs of conflicting events
     */
    findAllConflicts() {
        const allIntervals = this.getAllSorted();
        const conflicts = [];

        for (let i = 0; i < allIntervals.length; i++) {
            for (let j = i + 1; j < allIntervals.length; j++) {
                const a = allIntervals[i];
                const b = allIntervals[j];
                if (this._overlaps(
                    new Date(a.start_date).getTime(),
                    new Date(a.end_date).getTime(),
                    new Date(b.start_date).getTime(),
                    new Date(b.end_date).getTime()
                )) {
                    conflicts.push({ event1: a, event2: b });
                }
            }
        }

        return conflicts;
    }

    clear() {
        this.root = null;
        this.size = 0;
    }

    getSize() {
        return this.size;
    }
}

module.exports = IntervalTree;
