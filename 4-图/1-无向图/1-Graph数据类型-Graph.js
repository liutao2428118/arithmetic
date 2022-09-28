class Node {
  constructor() {
    this.item=null
    this.next = null
  }
}

class Bag {
  constructor() {
    this.first = null
    this.current = null
  }
  add(item) {
    let oldfirst = this.first
    this.first = new Node()
    this.first.item = item
    this.first.next = oldfirst
  }

  [Symbol.iterator]() {
    this.current = this.first
    return this; 
  }

  next() {
    if(this.current == null) {
      return {done: true, value: undefined}
    }
    let item = this.current.item
    this.current = this.current.next
    if(!item) {
      return {done: true, value: undefined}
    } else {
      return {done: false, value: item}
    }
  }
}

class Graph {
  constructor() {
    this.V = 0 //顶点数
    this.E = 0  // 边的数目
    this.adj = []   // 领接表
  }
  // 创建一个含有V个顶点但不含有边的图
  setV(V) {
    this.V = V
    this.E = 0
    this.adj = new Array(V)
    for(let v = 0; v < V; v++) {
      this.adj[v] = new Bag()
    }
  }
  // 从标准输入流读入一幅图
  setE(rl) {
    rl.on('line', line => {
      let lineArr = line.split(' ')
      if(lineArr.length >= 2) {
        let v = lineArr[0]
        let w = lineArr[1]
        this.addEdge(v, w)
      }
    })
  }
  // 获取顶点数
  getV() { return this.V }
  // 获取边数
  getE() { return this.E }
  // 向图中添加一条边 v-w
  addEdge(v, w) {
    this.adj[v].add(w)
    this.adj[w].add(v)
    this.E++
  }
  // 和 v 相邻的所用顶点
  allAbj(v) {
    return this.adj[v]
  }
}

module.exports = {
  Graph
}