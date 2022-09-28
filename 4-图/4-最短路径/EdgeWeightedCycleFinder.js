// const { EdgeWeightedDigraph } = require('./2-加权有向图的数据类型-EdgeWeigtedDigraph')
// const { tiny } = require('./tinyEWD')
class EdgeWeightedCycleFinder {
  constructor(G) {
    this.cycle = null
    this.onStack = new Array(G.getV())
    this.edgeTo = new Array(G.getV())
    this.marked = new Array(G.getV())
    for(let v = 0; v < G.getV(); v++) {
      if(!this.marked[v]) this.dfs(G, v)
    }
  }
  dfs(G, v) {
    this.onStack[v] = true
    this.marked[v] = true
    for(let e of G.alladj(v)) {
      let w = e.to()
      if(this.hasCycle()) return
      else if(!this.marked[w]) {
        this.edgeTo[w] = v
        this.dfs(G, w)
      }else if(this.onStack[w]) {
        this.cycle = []
        for(let x = v; x != w; x = this.edgeTo[x]) {
          this.cycle.push(x)
        }
        this.cycle.push(w)
        this.cycle.push(v)
      }
    }
    this.onStack[v] = false
  }
  hasCycle() {
    return this.cycle != null
  }
  getcycle() {
    return this.cycle
  }
}
// 测试用例
function main() {
  let G = new EdgeWeightedDigraph()
  G.setE(tiny)
  debugger
  let reachable = new EdgeWeightedCycleFinder(G)
  console.log(reachable.getcycle())
}

main()

module.exports = {
  EdgeWeightedCycleFinder
}