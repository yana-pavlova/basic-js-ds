const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this._addNode(this.rootNode, newNode);
    }
  }

  _addNode(current, newNode) {
    if (newNode.data < current.data) {
      if (current.left === null) {
        current.left = newNode;
      } else {
        this._addNode(current.left, newNode);
      }
    } else if (newNode.data > current.data) {
      if (current.right === null) {
        current.right = newNode;
      } else {
        this._addNode(current.right, newNode);
      }
    }
  }

  has(data) {
    return this._search(this.rootNode, data) !== null;
  }

  find(data) {
    return this._search(this.rootNode, data);
  }

  _hasNode(current, data) {
    if (current === null) {
      return false;
    } else if (current.data === data) {
      return true;
    } else if (current.data > data) {
      return this._hasNode(current.left, data);
    } else if (current.data < data) {
      return this._hasNode(current.right, data);
    }
  }

  _search(current, data) {
    if (current === null) {
      return null;
    }

    if (data === current.data) {
      return current;
    }

    if (data < current.data) {
      return this._search(current.left, data);
    } else {
      return this._search(current.right, data);
    }
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(current, data) {
    if (current === null) {
      return null;
    }
  
    if (data < current.data) {
      current.left = this._removeNode(current.left, data);
      return current;
    } else if (data > current.data) {
      current.right = this._removeNode(current.right, data);
      return current;
    } else {
      if (current.left === null && current.right === null) {
        return null;
      }
  
      if (current.left === null) {
        return current.right;
      }
      if (current.right === null) {
        return current.left;
      }
  
      const minRight = this._findMin(current.right);
      current.data = minRight.data;
      current.right = this._removeNode(current.right, minRight.data);
      return current;
    }
  }

  _findMin(current) {
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  _findMax(current) {
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  min() {
    if(this.rootNode === null) return null;
    const min = this._findMin(this.rootNode);
    return min.data;
  }

  max() {
    if(this.rootNode === null) return null;
    const max = this._findMax(this.rootNode);
    return max.data;
  }
}

module.exports = {
  BinarySearchTree
};