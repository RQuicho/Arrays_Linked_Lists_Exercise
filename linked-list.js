/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
  }

  /** _get(idx): get node at idx. */
  find(idx) {
    let currentNode = this.head;
    let count = 0;

    while (currentNode !== null && count !== idx) {
      count += 1;
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index");
    }

    // remove first item
    if (idx === 0) {
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) {
        this.head = this.tail
      }
    }  

    let prev = this.find(idx-1);

    // remove last item
    if (idx === this.length - 1) {
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
    }

    let next = this.find(idx+1);

    // remove middle item
    if (idx > 0 && idx < this.length - 1) {
      prev.next = next;
      this.length -= 1;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length -1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index");
    }
    return this.find(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index");
    }
    return this.find(idx).val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index");
    }

    // insert val at beginning of list
    if (idx === 0) {
      this.unshift(val);
    }

    // insert val at end of list
    if (idx === this.length) {
      this.push(val);
    }

    // insert val in middle of list
    let newNode = new Node(val);
    if (idx > 0 && idx < this.length) {
      newNode.next = this.find(idx-1).next;
      this.find(idx-1).next = newNode;
    }

    this.length += 1;
  }

  

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0;
    }

    let currentNode = this.head;
    let sum = 0;

    while (currentNode !== null) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    return sum / this.length;
  }
}


module.exports = LinkedList;
