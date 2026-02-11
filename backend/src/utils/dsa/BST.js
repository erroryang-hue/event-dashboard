/**
 * Binary Search Tree Implementation for Sorted Data
 * Time Complexity (balanced tree):
 * - Insert: O(log n)
 * - Search: O(log n)
 * - Delete: O(log n)
 * - Inorder Traversal: O(n)
 */
class BSTNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    this.root = this.insertNode(this.root, key, value);
  }

  insertNode(node, key, value) {
    if (!node) {
      return new BSTNode(key, value);
    }

    if (key < node.key) {
      node.left = this.insertNode(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.insertNode(node.right, key, value);
    } else {
      node.value = value; // Update existing value
    }

    return node;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (!node) return null;

    if (key === node.key) {
      return node.value;
    } else if (key < node.key) {
      return this.searchNode(node.left, key);
    } else {
      return this.searchNode(node.right, key);
    }
  }

  delete(key) {
    this.root = this.deleteNode(this.root, key);
  }

  deleteNode(node, key) {
    if (!node) return null;

    if (key < node.key) {
      node.left = this.deleteNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.deleteNode(node.right, key);
      return node;
    } else {
      // Node to delete found
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      // Node has two children
      const minRight = this.findMin(node.right);
      node.key = minRight.key;
      node.value = minRight.value;
      node.right = this.deleteNode(node.right, minRight.key);
      return node;
    }
  }

  findMin(node = this.root) {
    if (!node) return null;
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  findMax(node = this.root) {
    if (!node) return null;
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  inorder(callback) {
    this.inorderTraversal(this.root, callback);
  }

  inorderTraversal(node, callback) {
    if (!node) return;
    this.inorderTraversal(node.left, callback);
    callback(node.value, node.key);
    this.inorderTraversal(node.right, callback);
  }

  preorder(callback) {
    this.preorderTraversal(this.root, callback);
  }

  preorderTraversal(node, callback) {
    if (!node) return;
    callback(node.value, node.key);
    this.preorderTraversal(node.left, callback);
    this.preorderTraversal(node.right, callback);
  }

  postorder(callback) {
    this.postorderTraversal(this.root, callback);
  }

  postorderTraversal(node, callback) {
    if (!node) return;
    this.postorderTraversal(node.left, callback);
    this.postorderTraversal(node.right, callback);
    callback(node.value, node.key);
  }

  rangeQuery(minKey, maxKey) {
    const results = [];
    this.rangeQueryHelper(this.root, minKey, maxKey, results);
    return results;
  }

  rangeQueryHelper(node, minKey, maxKey, results) {
    if (!node) return;

    if (node.key > minKey) {
      this.rangeQueryHelper(node.left, minKey, maxKey, results);
    }

    if (node.key >= minKey && node.key <= maxKey) {
      results.push(node.value);
    }

    if (node.key < maxKey) {
      this.rangeQueryHelper(node.right, minKey, maxKey, results);
    }
  }

  toArray() {
    const arr = [];
    this.inorder((value) => arr.push(value));
    return arr;
  }

  getHeight(node = this.root) {
    if (!node) return 0;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  getSize(node = this.root) {
    if (!node) return 0;
    return 1 + this.getSize(node.left) + this.getSize(node.right);
  }

  clear() {
    this.root = null;
  }
}

module.exports = BST;