const { DirectedEdge } = require('./1-加权有向边的数据类型-DirectedEage')


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


class EdgeWeightedDigraph {
  constructor() {
    this.V = 0
    this.E = 0
    this.adj = null
  }
  setV(V) {
    this.V = V
    this.E = 0
    this.adj = []
    for(let v = 0; v < V; v++) {
      this.adj[v] = new Bag()
    }
  }
  setE(getLine) {
    this.setV(Number(getLine[0]))
    let E = Number(getLine[1])

    for(let i = 2; i < getLine.length; i++) {
      let line = getLine[i]
      let lineArr = line.split(' ')
      let v = Number(lineArr[0])
      let w = Number(lineArr[1])
      let weight = Number(lineArr[2])
      let e = new DirectedEdge(v, w, weight)
      this.addEdge(e)
    }
  }
  getV() {
    return this.V
  }
  getE() {
    return this.E
  }

  addEdge(e) {
    this.adj[e.from()].add(e)
    this.E++
  }
  alladj(v) {
    return this.adj[v]
  }
  edges() {
    let bag = new Bag()
    for(let v = 0; v < this.V; v++) {
      for(let e of this.adj[v]) {
        bag.add(e)
      }
    }
    return bag
  }
}

module.exports = {
  EdgeWeightedDigraph
}