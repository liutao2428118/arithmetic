// const { EdgeWeightedDigraph } = require('./2-加权有向图的数据类型-EdgeWeigtedDigraph')
const { EdgeWeigtedDepthFirstOrder } = require('./EdgeWeigtedDepthFirstOrder')
// const { tiny } = require('./tinyEDAG')


class Topological {
  constructor(G) {
      let dfs = new EdgeWeigtedDepthFirstOrder(G)
      this.order = dfs.getreversePost()
  }
  getorder() {
    return this.order
  }
  isDAG() {
    return this.order != null
  }
}

// function main() {
//   let G = new EdgeWeightedDigraph()
//   G.setE(tiny)
//   let top = new Topological(G)
//   console.log(top.getorder())
// }

// main()

module.exports = {
  Topological
}