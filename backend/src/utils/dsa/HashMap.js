class HashMap {
    constructor(size = 50) {
        this.buckets = new Array(size);
        this.size = size;
    }

    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size;
        }
        return hash;
    }

    set(key, value) {
        let idx = this._hash(key);
        if (!this.buckets[idx]) {
            this.buckets[idx] = [];
        }
        // Check if key exists and update
        for (let bucket of this.buckets[idx]) {
            if (bucket[0] === key) {
                bucket[1] = value;
                return;
            }
        }
        this.buckets[idx].push([key, value]);
    }

    get(key) {
        let idx = this._hash(key);
        if (!this.buckets[idx]) return undefined;
        for (let bucket of this.buckets[idx]) {
            if (bucket[0] === key) {
                return bucket[1];
            }
        }
        return undefined;
    }

    remove(key) {
        let idx = this._hash(key);
        if (!this.buckets[idx]) return null;
        for (let i = 0; i < this.buckets[idx].length; i++) {
            if (this.buckets[idx][i][0] === key) {
                return this.buckets[idx].splice(i, 1);
            }
        }
        return null;
    }
}

module.exports = HashMap;
