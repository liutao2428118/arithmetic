const IndexMinPQ = require('../3-最小生成树/IndexMinPQ')
const { EdgeWeightedDigraph } = require('./2-加权有向图的数据类型-EdgeWeigtedDigraph')
const { tiny } = require('./tinyEWDn')

class Stack {
  constructor() {
    this.first = null
    this.current = null
    this.N = 0
  }

  isEmpty() {
    return this.first == null
  }
  
  size() {
    return this.N
  }

  push(item) {
    let olfirst = this.first
    this.first = {
      item,
      next: olfirst
    }
    this.N++
  }

  pop() {
    let item = this.first.item
    this.first = this.first.next
    this.N--
    return item
  }

  // 增加迭代器
  [Symbol.iterator]() {
    this.current = this.first
    return this
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


class DijkstraSP {
  constructor(G, s) {
    this.edgeTo = new Array(G.getV())
    this.distTo = new Array(G.getV())
    this.pq = new IndexMinPQ(G.getV())
    for(let v = 0; v < G.getV(); v++) {
      this.distTo[v] = Infinity
    }
    this.distTo[s] = 0.0
    this.pq.insert(s, 0.0)
    while(!this.pq.isEmpty()) {
      this.relax(G, this.pq.delMin())
    }
  }
  relax(G, v) {
    for(let e of G.alladj(v)) {
      let w = e.to()
      if(this.distTo[w] > this.distTo[v] + e.getWeigth()) {
        this.distTo[w] = this.distTo[v] + e.getWeigth()
        this.edgeTo[w] = e
        if(this.pq.contains(w)) this.pq.change(w, this.distTo[w])
        else this.pq.insert(w, this.distTo[w])
      }
    }
  }
  getdistTo(v) {
    return this.distTo[v]
  }
  hasPathTo(v) {
    return this.distTo[v] < Infinity
  }
  pathTo(v) {
    if(!this.hasPathTo(v)) return null
    let path = new Stack()
    for(let e = this.edgeTo[v]; e != null; e = this.edgeTo[e.from()]) {
      path.push(e)
    }
    return path
  }
}

function main() {
  let G = new EdgeWeightedDigraph()
  G.setE(tiny)
  let s = 0
  let sp = new DijkstraSP(G, s)
  for(let t = 0; t < G.getV(); t++) {
    console.log(s + " to " + t + " ", sp.getdistTo(t))
    if(sp.hasPathTo(t)) {
      for(let e of sp.pathTo(t)) {
        console.log(e)
      }
    }
    console.log()
  }
}
debugger
main()