const { EdgeWeightedDigraph } = require('./2-加权有向图的数据类型-EdgeWeigtedDigraph')
const { DirectedEdge } = require('./1-加权有向边的数据类型-DirectedEage')
function arbitrage(getline) {
  let V = 5
  let name = new Array(V)
  let G = new EdgeWeightedDigraph()
  G.setV(V)
  for(let v = 0; v < V; v++) {
    name[v] = getline[0]
    for(let w = 0; w < V; w++) {
      let rate = getline[0]
      G.addEdge(new DirectedEdge(v, w, -Math.log(rate)))
    }
  }
  let spt = new BellmanFordSP(G, 0)
  if(spt.hasNegativeCycle()) {
    
  }
}