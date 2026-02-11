/**
 * EventPro DSA Implementations
 * Pure JavaScript Class Implementations for Educational Showcase
 */

// 1. Array Implementation (Built-in Wrapper)
export class EventArray {
    constructor(pageSize = 6) {
        this.events = [];
        this.pageSize = pageSize;
    }

    add(event) {
        this.events.unshift(event); // Add to beginning for better UX
        return this.events;
    }

    getPaginated(page) {
        const start = (page - 1) * this.pageSize;
        return {
            data: this.events.slice(start, start + this.pageSize),
            totalPages: Math.ceil(this.events.length / this.pageSize)
        };
    }

    getAll() {
        return this.events;
    }
}

// 2. Stack Implementation (LIFO)
export class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return [...this.items].reverse(); // Visualized top-down
    }
}

// 3. Max Heap Implementation (Priority Queue)
export class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    insert(event) {
        this.heap.push(event);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex].views < this.heap[index].views) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return max;
    }

    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let largerChildIndex = this.getLeftChildIndex(index);
            let rightChildIndex = this.getRightChildIndex(index);

            if (rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex].views > this.heap[largerChildIndex].views) {
                largerChildIndex = rightChildIndex;
            }

            if (this.heap[index].views < this.heap[largerChildIndex].views) {
                [this.heap[index], this.heap[largerChildIndex]] = [this.heap[largerChildIndex], this.heap[index]];
                index = largerChildIndex;
            } else {
                break;
            }
        }
    }

    toArray() {
        return this.heap;
    }
}

// 4. Hash Table Implementation (Chaining)
// 4. Hash Table Implementation (Double Hashing + Open Addressing)
export class HashTable {
    constructor(size = 31) {
        this.table = new Array(size);
        this.size = size;
        this.count = 0;
    }

    _stringToInt(key) {
        // Case insensitive hashing
        const lowerKey = key.toString().toLowerCase();
        let total = 0;
        for (let i = 0; i < lowerKey.length; i++) {
            total += lowerKey.charCodeAt(i);
        }
        return total;
    }

    _hash1(intKey) {
        return intKey % this.size;
    }

    _hash2(intKey) {
        return 1 + (intKey % (this.size - 1));
    }

    set(key, value) {
        const intKey = this._stringToInt(key);
        const h1 = this._hash1(intKey);
        const h2 = this._hash2(intKey);

        // We will ignore case for the KEY itself when finding the bucket, 
        // but we will store multiple items in that bucket.
        // Actually, Double Hashing + Chaining is a bit hybrid.
        // Standard Chaining: buffer = table[h1(key)].
        // Double Hashing + Chaining: Probe to find a "slot" for this key... wait.
        // If we use Chaining, we usually don't need Double Hashing for *collision resolution of the buckets* unless the buckets themselves are the slots.
        // User asked for "Linked List Chaining".
        // Let's stick to the existing Double Hashing probe to find a bucket for a "Key Group" (e.g. all "Event A" go to same bucket),
        // OR just simple Open Addressing?
        // User example: "Index 17: [hi] -> [hi]".
        // This implies deviations are handled by the list at Index 17.
        // So, let's keep the Double Hashing logic to FIND the bucket for the key (handling key collisions),
        // and IN that bucket, we store a list (array) of values.

        // Simpler approach for "Educational Showcase" of Chaining: 
        // Just use h1. But the existing code used Double Hashing.
        // Let's keep Double Hashing to find the *Index for this Key*.
        // If index is occupied by a DIFFERENT key, we probe.
        // If index is occupied by SALE key, we append.

        const lowerKey = key.toString().toLowerCase();

        let idx = h1;
        let i = 0;

        // Probing Loop to find the "Bucket for this Key"
        while (this.table[idx]) {
            // Found existing bucket for this key?
            if (this.table[idx].key.toLowerCase() === lowerKey) {
                // Chaining: Append to the list
                this.table[idx].value.push(value);
                this.table[idx].probeCount = i + 1; // Update stat
                return idx;
            }

            // Occupied by different key? Probe on.
            i++;
            idx = (h1 + i * h2) % this.size;

            if (i >= this.size) {
                console.warn("Hash Table Full");
                return -1;
            }
        }

        // Found empty spot -> Create new Bucket with List
        this.table[idx] = {
            key: key,
            value: [value], // Initialize list with first item
            probeCount: i + 1
        };
        this.count++;
        return idx;
    }

    get(key) {
        // Return the whole list
        const path = this.getProbePath(key);
        if (path.found) {
            return this.table[path.index].value;
        }
        return null;
    }

    // Helper for Visualization
    getProbePath(key) {
        const intKey = this._stringToInt(key);
        const h1 = this._hash1(intKey);
        const h2 = this._hash2(intKey);
        const lowerKey = key.toString().toLowerCase();

        let idx = h1;
        let i = 0;
        const steps = [];

        while (this.table[idx]) {
            steps.push(idx);
            // Check case-insensitive match
            if (this.table[idx].key.toLowerCase() === lowerKey) {
                return { found: true, index: idx, steps, h1, h2, attempts: i + 1 };
            }
            i++;
            idx = (h1 + i * h2) % this.size;
            if (i >= this.size) break;
        }

        // Not found
        steps.push(idx);
        return { found: false, index: idx, steps, h1, h2, attempts: i + 1 };
    }

    getTable() {
        return this.table;
    }
}

// 5. Binary Search Tree Implementation
// ... (No changes here, we visualizer handles logic) ...
// ACTUALLY, BST insert logic should strictly follow Date AND Time.
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(event) {
        const newNode = new TreeNode(event);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this._insertNode(this.root, newNode);
    }

    _insertNode(node, newNode) {
        // Sort by date + time
        const dateA = new Date(`${node.value.date}T${node.value.time || '00:00'}`);
        const dateB = new Date(`${newNode.value.date}T${newNode.value.time || '00:00'}`);

        if (dateB < dateA) {
            if (!node.left) node.left = newNode;
            else this._insertNode(node.left, newNode);
        } else {
            if (!node.right) node.right = newNode;
            else this._insertNode(node.right, newNode);
        }
    }

    inOrderTraversal() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    _inOrder(node, result) {
        if (node) {
            this._inOrder(node.left, result);
            result.push(node.value);
            this._inOrder(node.right, result);
        }
    }
}

// ... Sorting ...

export class Interval {
    constructor(start, end, data) {
        this.start = start;
        this.end = end;
        this.data = data;
    }
}

class IntervalNode {
    constructor(interval) {
        this.interval = interval;
        this.max = interval.end;
        this.left = null;
        this.right = null;
    }
}

export class IntervalTree {
    constructor() {
        this.root = null;
    }

    insert(interval) {
        if (!this.root) {
            this.root = new IntervalNode(interval);
        } else {
            this._insert(this.root, interval);
        }
    }

    _insert(node, interval) {
        if (!node) return new IntervalNode(interval);

        // Standard BST insert on 'start' time
        if (interval.start < node.interval.start) {
            node.left = this._insert(node.left, interval);
        } else {
            node.right = this._insert(node.right, interval);
        }

        // Update max
        if (node.max < interval.end) node.max = interval.end;
        // Also check child max
        if (node.left && node.left.max > node.max) node.max = node.left.max;
        if (node.right && node.right.max > node.max) node.max = node.right.max;

        return node;
    }

    checkOverlap(interval) {
        return this._search(this.root, interval);
    }

    _search(node, interval) {
        if (!node) return null;

        // Check for overlap with current node
        // (StartA < EndB) && (StartB < EndA)
        if (node.interval.start < interval.end && interval.start < node.interval.end) {
            return node.interval;
        }

        // Check left child
        // If left child exists and its max is >= interval.start, overlap MIGHT exist in left subtree
        if (node.left && node.left.max >= interval.start) {
            return this._search(node.left, interval);
        }

        return this._search(node.right, interval);
    }
}
// --- 7. Trie (Autocomplete) ---
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.data = null; // Store full event object at leaf
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, data) {
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.data = data;
    }

    searchPrefix(prefix) {
        let node = this.root;
        for (let char of prefix.toLowerCase()) {
            if (!node.children[char]) return [];
            node = node.children[char];
        }
        return this._collectWords(node);
    }

    _collectWords(node) {
        let results = [];
        if (node.isEndOfWord) results.push(node.data);

        for (let char in node.children) {
            results = results.concat(this._collectWords(node.children[char]));
        }
        return results;
    }
}

// --- 8. Step-by-Step Sorting Generators ---
export const SortingGenerators = {
    *mergeSort(array) {
        yield { type: 'start', array: [...array] };
        yield* this._mergeSortRecursive(array, 0, array.length - 1);
        yield { type: 'end', array: [...array] };
    },

    *_mergeSortRecursive(array, left, right) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);

        // Visualize Divide
        yield { type: 'split', left, right, mid, array: [...array] };

        yield* this._mergeSortRecursive(array, left, mid);
        yield* this._mergeSortRecursive(array, mid + 1, right);

        yield* this._merge(array, left, mid, right);
    },

    *_merge(array, left, mid, right) {
        const leftArr = array.slice(left, mid + 1);
        const rightArr = array.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            // Visualize Compare
            yield { type: 'compare', indices: [left + i, mid + 1 + j], array: [...array] };

            if (leftArr[i].price <= rightArr[j].price) {
                array[k] = leftArr[i];
                i++;
            } else {
                array[k] = rightArr[j];
                j++;
            }
            yield { type: 'swap', index: k, value: array[k], array: [...array] }; // Visualize overwrite
            k++;
        }

        while (i < leftArr.length) {
            array[k] = leftArr[i];
            yield { type: 'flush', index: k, value: array[k], array: [...array] };
            i++; k++;
        }
        while (j < rightArr.length) {
            array[k] = rightArr[j];
            yield { type: 'flush', index: k, value: array[k], array: [...array] };
            j++; k++;
        }

        yield { type: 'merged', left, right, array: [...array] };
    }
};

export const SortingAlgorithms = {
    // Classic implementations for instant sort
    partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j].price < pivot.price) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    },

    quickSort(arr, low = 0, high = null) {
        if (high === null) high = arr.length - 1;
        if (low < high) {
            let pi = this.partition(arr, low, high);
            this.quickSort(arr, low, pi - 1);
            this.quickSort(arr, pi + 1, high);
        }
        return arr;
    },

    mergeSort(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));
        return this.merge(left, right);
    },

    merge(left, right) {
        let result = [], i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i].price < right[j].price) result.push(left[i++]);
            else result.push(right[j++]);
        }
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
};
