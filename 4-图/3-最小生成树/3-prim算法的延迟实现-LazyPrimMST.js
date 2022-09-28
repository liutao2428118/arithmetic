const { EdgeWeightedGraph } = require('./2-加权无向图的数据类型-EdgeWeightedGraph')
const { MinPQ } = require('./MinPQ')
const { tiny } = require('./tinyEWG')

class LazyPrimMST {
  constructor(G) {
    this.pq = new MinPQ()
    this.marked = new Array(G.getV())
    this.mst = []
    this.visit(G, 0)
    while(!this.pq.isEmpty()) {
      let e = this.pq.delMin()
      let v = e.either()
      let w = e.other(v)
      if(this.marked[v] && this.marked[w]) continue
      this.mst.push(e)
      if(!this.marked[v]) this.visit(G, v)
      if(!this.marked[w]) this.visit(G, w)
    }
  }
  visit(G, v) {
    this.marked[v] = true
    for(let e of G.allAbj(v)) {
      if(!this.marked[e.other(v)]) this.pq.insert(e)
    }
  }
  edges() {
    return this.mst
  }
  weight() {
    let t = 0
    for(let i = 0; i < this.mst.length; i++) {
      t += this.mst[i].weight
    }
    return t
  }
}

function main() {
  let G = new EdgeWeightedGraph()
  G.setE(tiny)
  debugger
  let mst = new LazyPrimMST(G)
  for(let e of mst.edges()) {
    console.log(e)
  }
  console.log(mst.weight())
}
main()