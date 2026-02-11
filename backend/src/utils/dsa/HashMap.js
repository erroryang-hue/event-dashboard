/**
 * HashMap Implementation for Fast Lookups
 * Time Complexity:
 * - Set: O(1) average
 * - Get: O(1) average
 * - Delete: O(1) average
 * - Has: O(1) average
 */
class HashMap {
  constructor(initialSize = 16) {
    this.size = initialSize;
    this.buckets = new Array(this.size);
    this.count = 0;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.size;
  }

  set(key, value) {
    if (this.count / this.size >= this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];
    const existingIndex = bucket.findIndex(item => item.key === key);

    if (existingIndex !== -1) {
      bucket[existingIndex].value = value;
    } else {
      bucket.push({ key, value });
      this.count++;
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return undefined;

    const item = bucket.find(item => item.key === key);
    return item ? item.value : undefined;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    return bucket.some(item => item.key === key);
  }

  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    const itemIndex = bucket.findIndex(item => item.key === key);
    if (itemIndex !== -1) {
      bucket.splice(itemIndex, 1);
      this.count--;
      return true;
    }

    return false;
  }

  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const item of bucket) {
          keys.push(item.key);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const item of bucket) {
          values.push(item.value);
        }
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const item of bucket) {
          entries.push([item.key, item.value]);
        }
      }
    }
    return entries;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.buckets = new Array(this.size);
    this.count = 0;

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const item of bucket) {
          this.set(item.key, item.value);
        }
      }
    }
  }

  clear() {
    this.buckets = new Array(this.size);
    this.count = 0;
  }

  getSize() {
    return this.count;
  }
}

module.exports = HashMap;