const { DirectedEdge } = require('./1-加权有向边的数据类型-DirectedEage')
const { EdgeWeightedDigraph } = require('./2-加权有向图的数据类型-EdgeWeigtedDigraph')
const { AcyclicLP } = require('./5-无环加权有向图最长路径-AcyclicLP')
const { jobs } = require('./jobsPC')

function main(getline) {
  let N = 10
  let G = new EdgeWeightedDigraph()
  G.setV(2*N+2)
  let s = 2*N
  let t = 2*N+1
  for(let i = 0; i < N; i++) {
    let a = getline[i].split(' ')
    let duration = Number(a[0])
    G.addEdge(new DirectedEdge(i, i+N, duration))
    G.addEdge(new DirectedEdge(s, i, 0.0))
    G.addEdge(new DirectedEdge(i+N, t, 0.0))
    for(let j = 1; j < a.length; j++) {
      let successor = Number(a[j])
      G.addEdge(new DirectedEdge(i+N, successor, 0.0))
    }
  }
  console.log(JSON.stringify(G.adj))
  let lp = new AcyclicLP(G, s)
  console.log("Start times:")
  for(let i = 0; i < N; i++) {
    console.log(i, lp.getdistTo(i))
  }
  console.log("Finish time: "+ lp.getdistTo(t))
}
debugger
main(jobs)