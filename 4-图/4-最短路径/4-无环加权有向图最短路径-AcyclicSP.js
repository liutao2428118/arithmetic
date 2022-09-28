const { Topological } = require('./Topological')
const { EdgeWeightedDigraph } = require('./2-加权有向图的数据类型-EdgeWeigtedDigraph')
const { tiny } = require('./tinyEDAG')
class AcyclicSP {
  constructor(G, s) {
    this.edgeTo = new Array(G.getV())
    this.distTo = new Array(G.getV())
    for(let v = 0; v < G.getV(); v++) {
     this.distTo[v] = Infinity
    }
    this.distTo[s] = 0.0
    let top = new Topological(G)
    let t = top.getorder()
    for(let v = t.length-1; v >= 0; v--) {
      this.relax(G, t[v])
    }
  }
  relax(G, v) {
    for(let e of G.alladj(v)) {
      let w = e.to()
      if(this.distTo[w] > this.distTo[v] + e.getWeigth()) {
        this.distTo[w] = this.distTo[v] + e.getWeigth()
        this.edgeTo[w] = e
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
}

function main() {
  let G = new EdgeWeightedDigraph()
  G.setE(tiny)
  let s = 5
  let sp = new AcyclicSP(G, s)
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

main()