class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._sinkDown(0);
        }
        return min;
    }

    peek() {
        return this.heap[0] || null;
    }

    _bubbleUp(index) {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIdx]) break;
            [this.heap[index], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[index]];
            index = parentIdx;
        }
    }

    _sinkDown(index) {
        const length = this.heap.length;
        while (true) {
            let leftIdx = 2 * index + 1;
            let rightIdx = 2 * index + 2;
            let smallest = index;

            if (leftIdx < length && this.heap[leftIdx] < this.heap[smallest]) {
                smallest = leftIdx;
            }
            if (rightIdx < length && this.heap[rightIdx] < this.heap[smallest]) {
                smallest = rightIdx;
            }
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

module.exports = MinHeap;
