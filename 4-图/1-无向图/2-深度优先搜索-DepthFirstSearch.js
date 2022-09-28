const { Graph } = require('./1-Graph数据类型')

// 深度优先搜索
class DepthFirstSearch {
  constructor(G, s) {
    this.marked = new Array(G.getV())
    this.count = 0
    this.dfs(G, s)
  }
  dfs(G, v) {
    this.marked[v] = true
    this.count++
    for(let w of G.allAbj(v)) {
      if(!this.marked[w]) this.dfs(G, w) 
    }
  }
  getmarked(v) {
    return this.marked[v]
  }
  getcount() {
    return this.count
  }
}

// 测试用例
const fs = require('fs');
const readline  = require('readline');
let rl = readline.createInterface({input: fs.createReadStream("./tinyG.txt")})
function testSearch(s) {
  let G = new Graph()
  G.setV(13)
  G.setE(rl)
  rl.on('close', () => {
    let search = new DepthFirstSearch(G, s)

    for(let v = 0; v < G.getV(); v++) {
      if(search.getmarked(v)) {
        console.log(v + " ")
      }
    }
    console.log()

    if(search.getcount() != G.getV()) {
      console.log("NOT ")
    }
    console.log("connected")
  })

  
}

testSearch(9)