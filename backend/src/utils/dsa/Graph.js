/**
 * Graph Implementation for Event Dependencies & Workflow Sequencing
 * 
 * Adjacency list representation with:
 * - Directed edges for event dependencies
 * - Cycle detection (to prevent circular dependencies)
 * - Topological sort for dependency ordering
 * - BFS/DFS traversals
 * 
 * Time Complexity:
 * - Add Edge: O(1)
 * - Topological Sort: O(V + E)
 * - Cycle Detection: O(V + E)
 * - BFS/DFS: O(V + E)
 */
class Graph {
    constructor() {
        this.adjacencyList = new Map(); // eventId -> [dependentEventIds]
        this.nodeData = new Map();      // eventId -> event data
    }

    /**
     * Add a node (event) to the graph
     */
    addNode(id, data = null) {
        if (!this.adjacencyList.has(id)) {
            this.adjacencyList.set(id, []);
        }
        if (data) {
            this.nodeData.set(id, data);
        }
    }

    /**
     * Add directed edge: 'from' must complete before 'to' can start
     */
    addEdge(fromId, toId) {
        this.addNode(fromId);
        this.addNode(toId);

        // Check for cycle before adding
        if (this._wouldCreateCycle(fromId, toId)) {
            return { success: false, message: 'Adding this dependency would create a circular dependency' };
        }

        this.adjacencyList.get(fromId).push(toId);
        return { success: true };
    }

    /**
     * Remove an edge
     */
    removeEdge(fromId, toId) {
        if (this.adjacencyList.has(fromId)) {
            const edges = this.adjacencyList.get(fromId);
            const idx = edges.indexOf(toId);
            if (idx !== -1) {
                edges.splice(idx, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Remove a node and all its edges
     */
    removeNode(id) {
        this.adjacencyList.delete(id);
        this.nodeData.delete(id);
        // Remove all edges pointing to this node
        for (const [, edges] of this.adjacencyList) {
            const idx = edges.indexOf(id);
            if (idx !== -1) edges.splice(idx, 1);
        }
    }

    /**
     * Check if adding fromId -> toId would create a cycle
     * Uses DFS from toId to see if we can reach fromId
     */
    _wouldCreateCycle(fromId, toId) {
        if (fromId === toId) return true;
        const visited = new Set();
        const stack = [toId];

        while (stack.length > 0) {
            const current = stack.pop();
            if (current === fromId) return true;
            if (visited.has(current)) continue;
            visited.add(current);

            const neighbors = this.adjacencyList.get(current) || [];
            for (const neighbor of neighbors) {
                stack.push(neighbor);
            }
        }

        return false;
    }

    /**
     * Detect if the graph has any cycles
     */
    hasCycle() {
        const visited = new Set();
        const recStack = new Set();

        for (const node of this.adjacencyList.keys()) {
            if (this._hasCycleDFS(node, visited, recStack)) {
                return true;
            }
        }
        return false;
    }

    _hasCycleDFS(node, visited, recStack) {
        if (recStack.has(node)) return true;
        if (visited.has(node)) return false;

        visited.add(node);
        recStack.add(node);

        const neighbors = this.adjacencyList.get(node) || [];
        for (const neighbor of neighbors) {
            if (this._hasCycleDFS(neighbor, visited, recStack)) {
                return true;
            }
        }

        recStack.delete(node);
        return false;
    }

    /**
     * Topological Sort using Kahn's Algorithm (BFS-based)
     * Returns ordered list of event IDs respecting dependencies
     */
    topologicalSort() {
        const inDegree = new Map();
        for (const node of this.adjacencyList.keys()) {
            if (!inDegree.has(node)) inDegree.set(node, 0);
        }

        for (const [, edges] of this.adjacencyList) {
            for (const to of edges) {
                inDegree.set(to, (inDegree.get(to) || 0) + 1);
            }
        }

        const queue = [];
        for (const [node, degree] of inDegree) {
            if (degree === 0) queue.push(node);
        }

        const result = [];
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);

            const neighbors = this.adjacencyList.get(current) || [];
            for (const neighbor of neighbors) {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if (inDegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
        }

        // If result doesn't contain all nodes, there's a cycle
        if (result.length !== this.adjacencyList.size) {
            return { success: false, message: 'Graph has a cycle, topological sort not possible', order: [] };
        }

        return { success: true, order: result };
    }

    /**
     * BFS - find all events that depend on a given event (direct + transitive)
     */
    getDependents(eventId) {
        const visited = new Set();
        const queue = [eventId];
        const dependents = [];

        while (queue.length > 0) {
            const current = queue.shift();
            if (visited.has(current)) continue;
            visited.add(current);

            const neighbors = this.adjacencyList.get(current) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dependents.push(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return dependents;
    }

    /**
     * Find all prerequisites for a given event (reverse BFS)
     */
    getPrerequisites(eventId) {
        const prerequisites = [];
        for (const [fromId, edges] of this.adjacencyList) {
            if (edges.includes(eventId)) {
                prerequisites.push(fromId);
                // Recursively get prerequisites
                const transitive = this.getPrerequisites(fromId);
                prerequisites.push(...transitive);
            }
        }
        return [...new Set(prerequisites)];
    }

    /**
     * Get all edges as pairs
     */
    getEdges() {
        const edges = [];
        for (const [from, tos] of this.adjacencyList) {
            for (const to of tos) {
                edges.push({ from, to });
            }
        }
        return edges;
    }

    /**
     * Get graph size info
     */
    getInfo() {
        let edgeCount = 0;
        for (const [, edges] of this.adjacencyList) {
            edgeCount += edges.length;
        }
        return {
            nodes: this.adjacencyList.size,
            edges: edgeCount,
            hasCycle: this.hasCycle()
        };
    }

    clear() {
        this.adjacencyList.clear();
        this.nodeData.clear();
    }
}

module.exports = Graph;
