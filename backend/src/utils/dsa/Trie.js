/**
 * Trie Implementation for Autocomplete Search
 * Time Complexity:
 * - Insert: O(m) where m is the length of the word
 * - Search: O(m) where m is the length of the prefix
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
    this.data = null;
    this.frequency = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, data) {
    let node = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      node.frequency++;
    }

    node.isEnd = true;
    node.data = data;
  }

  search(prefix) {
    let node = this.root;
    const lowerPrefix = prefix.toLowerCase();

    for (const char of lowerPrefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }

    return this.collectWords(node, []);
  }

  collectWords(node, results = [], maxResults = 50) {
    if (results.length >= maxResults) {
      return results;
    }

    if (node.isEnd && node.data) {
      results.push(node.data);
    }

    // Sort children by frequency for better suggestions
    const children = Object.entries(node.children)
      .sort((a, b) => b[1].frequency - a[1].frequency);

    for (const [char, childNode] of children) {
      if (results.length >= maxResults) break;
      this.collectWords(childNode, results, maxResults);
    }

    return results;
  }

  startsWith(prefix) {
    let node = this.root;
    const lowerPrefix = prefix.toLowerCase();

    for (const char of lowerPrefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }

    return true;
  }

  delete(word) {
    const deleteHelper = (node, word, depth) => {
      if (!node) return false;

      if (depth === word.length) {
        if (!node.isEnd) return false;
        node.isEnd = false;
        node.data = null;
        return Object.keys(node.children).length === 0;
      }

      const char = word[depth];
      if (!node.children[char]) return false;

      const shouldDeleteChild = deleteHelper(node.children[char], word, depth + 1);

      if (shouldDeleteChild) {
        delete node.children[char];
        return Object.keys(node.children).length === 0 && !node.isEnd;
      }

      return false;
    };

    return deleteHelper(this.root, word.toLowerCase(), 0);
  }

  getAllWords() {
    return this.collectWords(this.root, [], Infinity);
  }

  getSize() {
    let count = 0;
    const countNodes = (node) => {
      if (node.isEnd) count++;
      for (const child of Object.values(node.children)) {
        countNodes(child);
      }
    };
    countNodes(this.root);
    return count;
  }

  clear() {
    this.root = new TrieNode();
  }
}

module.exports = Trie;