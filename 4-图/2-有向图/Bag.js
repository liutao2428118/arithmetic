class Node {
  constructor() {
    this.item=null
    this.next = null
  }
}

class Bag {
  constructor() {
    this.first = null
    this.current = null
  }
  add(item) {
    let oldfirst = this.first
    this.first = new Node()
    this.first.item = item
    this.first.next = oldfirst
  }

  [Symbol.iterator]() {
    this.current = this.first
    return this; 
  }

  next() {
    if(this.current == null) {
      return {done: true, value: undefined}
    }
    let item = this.current.item
    this.current = this.current.next
    if(item === undefined) {
      return {done: true, value: undefined}
    } else {
      return {done: false, value: item}
    }
  }
}

module.exports = {
  Bag
}