const { Bag } = require('./Bag')
const { Digraph } = require('./1-Digraph')
const { tiny } = require('./tinyDG')
class DirectedDFS {
  constructor(G, sources) {
    this.marked = new Array(G.getV())
    for(let s of sources) {
      if(!this.marked[s]) {
        this.dfs(G, s)
      }
    }
  }
  dfs(G, v) {
    this.marked[v] = true
    for(let w of G.allAbj(v)) {
      if(!this.marked[w]) this.dfs(G, w)
    }
  }
  getmarked(v) {
    return this.marked[v]
  }
}
// 测试用例
function main() {
  let G = new Digraph()
  G.setE(tiny)
  // console.log(JSON.stringify(G.adj))
  debugger
  let sources =[1,2,6]
  let reachable = new DirectedDFS(G, sources)
  for(let v = 0; v < G.getV(); v++) {
    if(reachable.getmarked(v)) {
      console.log(v + " ")
    }
  }
}

main()

module.exports = {
  DirectedDFS
}