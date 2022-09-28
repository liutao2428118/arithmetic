const { EdgeWeightedDigraph } = require('./2-加权有向图的数据类型-EdgeWeigtedDigraph')
const { EdgeWeightedCycleFinder } = require('./EdgeWeightedCycleFinder')
const { Queue } = require('../2-有向图/Queue')
const { tiny } = require('./tinyEWDnc')

class BellmanFordSP {
  constructor(G, s) {
    this.distTo = new Array(G.getV())
    this.edgeTo = new Array(G.getV())
    this.onQ = new Array(G.getV())
    this.queue = new Queue()
    this.cost = 0
    this.cycle = null
    for(let v = 0; v < G.getV(); v++) {
      this.distTo[v] = Infinity
    }
    this.distTo[s] = 0.0
    this.queue.enqueue(s)
    this.onQ[s] = true
    while(!this.queue.isEmpty() && !this.hasNegativeCycle()) {
      let v = this.queue.dequeue()
      this.onQ[v] = false
      this.relax(G, v)
    }
  }
  relax(G, v) {
    for(let e of G.alladj(v)) {
      let w = e.to()
      if(this.distTo[w] > this.distTo[v] + e.getWeigth()) {
        this.distTo[w] = this.distTo[v] + e.getWeigth()
        this.edgeTo[w] = e
        if(!this.onQ[w]) {
          this.queue.enqueue(w)
          this.onQ[w] = true
        }
      }
      if(this.cost++ % G.getV() == 0) {
        this.findNegativeCycle()
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
    let path = []
    for(let e = this.edgeTo[v]; e != null; e = this.edgeTo[e.from()]) {
      path.push(e)
    }
    return path
  }
  findNegativeCycle() {
    let V = this.edgeTo.length
    let spt = new EdgeWeightedDigraph()
    spt.setV(V)
    for(let v = 0; v < V; v++) {
      if(this.edgeTo[v] != null) {
        spt.addEdge(this.edgeTo[v])
      }
    }
    let cf = new EdgeWeightedCycleFinder(spt)
    this.cycle = cf.getcycle()
  }
  hasNegativeCycle() {
    return this.cycle != null
  }
  negativeCycle() {
    return this.cycle
  }
}

测试用例
function main() {
  let G = new EdgeWeightedDigraph()
  G.setE(tiny)
  let s = 0
  let sp = new BellmanFordSP(G, s)
  console.log(sp.cycle)
  console.log(sp.hasNegativeCycle())
  // for(let t = 0; t < G.getV(); t++) {
  //   console.log(s + " to " + t + " ", sp.getdistTo(t))
  //   if(sp.hasPathTo(t)) {
  //     for(let e of sp.pathTo(t)) {
  //       console.log(e)
  //     }
  //   }
  //   console.log()
  // }
}
debugger
main()