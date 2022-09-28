const { Graph } = require('./1-Graph数据类型')

// 广度优先
class BreadthFirstPaths {
  constructor(G, s) {
    this.marked = new Array(G.getV())  // 到达该顶点的最短路径已知吗
    this.edgeTo = new Array(G.getV())  // + 从起点到一个顶点已知路径上的最后一个顶点
    this.s = s  // + 起点
    this.dfs(G, s)
  }
  dfs(G, v) {
    let queue = new Queue()
    this.marked[v] = true
    queue.enqueue(s)
    while(!queue.inEmpty()) {
      let v = queue.dequeue()
      for(let w of G.allAbj(v)) {
        if(!this.marked[w]) {
          this.edgeTo[w] = v 
          this.marked[w] = true
          queue.enqueue(w)
        }
      }
    }
  }
  hasPathTo(v) {
    return this.marked[v]
  }
  pathTo(v) {
    if(!this.hasPathTo(v)) return null
    let path = []
    for(let x = v; x != this.s; x = this.edgeTo[x]) {
      path.push(x)
    }
    path.push(this.s)
    return path
  }
}


// 测试用例
const fs = require('fs');
const readline  = require('readline');
let rl = readline.createInterface({
  input: fs.createReadStream("./tinyCG.txt")
})
function testSearch(s) {
  let G = new Graph()
  G.setV(6)
  G.setE(rl)
  rl.on('close', () => {
    let search = new BreadthFirstPaths(G, s)

    for(let v = 0; v < G.getV(); v++) {
      console.log(s + " to " + v + ": ")
      if(search.hasPathTo(v)) {
        for(let x of search.pathTo(v)) {
          if(x == s) console.log(x)
          else console.log("-" + x)
        }
      }
      console.log()
    }
  })

  
}

testSearch(0)