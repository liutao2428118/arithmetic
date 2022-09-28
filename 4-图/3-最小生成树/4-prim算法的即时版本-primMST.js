const { EdgeWeightedGraph } = require('./2-加权无向图的数据类型-EdgeWeightedGraph')
const { tiny } = require('./tinyEWG')
const IndexMinPQ = require('./IndexMinPQ')

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
    if(!item) {
      return {done: true, value: undefined}
    } else {
      return {done: false, value: item}
    }
  }
}

class primMST {
  constructor(G) {
    this.edgeTo = new Array(G.getV())
    this.distTo = new Array(G.getV())
    this.maeked = new Array(G.getV())
    for(let v = 0; v < G.getV(); v++) {
      this.distTo[v] = Infinity
    }
    this.pq = new IndexMinPQ(G.getV())
    this.distTo[0] = 0.0
    this.pq.insert(0, 0.0)
    while(!this.pq.isEmpty()) {
      this.visit(G, this.pq.delMin())
    }
  }
  visit(G, v) {
    this.maeked[v] = true
    for(let e of G.allAbj(v)) {
      let w = e.other(v)
      if(this.maeked[w]) continue
      if(e.getweight() < this.distTo[w]) {
        this.edgeTo[w] = e
        this.distTo[w] = e.getweight()
        if(this.pq.contains(w)) this.pq.change(w, this.distTo[w])
        else this.pq.insert(w, this.distTo[w])
      }
    }
  }
  edges() {
    let mst = new Bag()
    for(let v =1; v < this.edgeTo.length; v++) {
      mst.add(this.edgeTo[v])
    }
    return mst
  }
  weight() {
    let t = 0
    for(let i = 0; i < this.distTo.length; i++) {
      t += this.distTo[i]
    }
    return t
  }
}

function main() {
  let G = new EdgeWeightedGraph()
  G.setE(tiny)
  debugger
  let mst = new primMST(G)
  for(let e of mst.edges()) {
    console.log(e)
  }
  console.log(mst.weight())
}
main()