const { DirectedCycle } = require('./3-寻找有向环-DirectedCycle')
const { DepthFirstOrder } = require('./4-深度优先搜索的顶点排序-DepthFirstOrder')
class Topological {
  constructor(G) {
    let cyclefinder = new DirectedCycle(G)
    if(!cyclefinder.hasCycle()) {
      let dfs = new DepthFirstOrder(G)
      this.order = dfs.getreversePost()
    }
  }
  getorder() {
    return this.order
  }
  isDAG() {
    return this.order != null
  }
}

function main() {}