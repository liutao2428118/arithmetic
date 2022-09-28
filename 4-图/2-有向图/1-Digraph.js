const { Bag } = require('./Bag')
class Digraph {
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
  setE(getLine) {
    this.setV(Number(getLine[0]))
    let E = Number(getLine[1])
    for(let i = 2; i < getLine.length; i++) {
      let line = getLine[i]
      let lineArr = line.split(' ')
      let v = Number(lineArr[0])
      let w = Number(lineArr[1])
      this.addEdge(v, w)
    }
  }
  // 获取顶点数
  getV() { return this.V }
  // 获取边数
  getE() { return this.E }
  // 向图中添加一条边 v-w
  addEdge(v, w) {
    this.adj[v].add(w)
    this.E++
  }
  // 和 v 相邻的所用顶点
  allAbj(v) {
    return this.adj[v]
  }
  reverse() {
    let R = new Digraph()
    R.setV(this.getV())
    for(let v = 0; v < this.getV(); v++) {
      for(let w of this.allAbj(v)) {
        R.addEdge(w, v)
      }
    }
    return R 
  }
}

module.exports = {
  Digraph
}