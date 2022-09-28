const { Eage } = require('./1-带权重边的数据类型-Eage')

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

class EdgeWeightedGraph {
  constructor() { // 创建一个含有V个顶点但不含有边的图
    this.V = 0
    this.E = 0
    this.adj = null
  }
  setV(V) {
    this.V = V
    this.E = 0
    this.adj = new Array(V)
    for(let v = 0; v < V; v++) {
      this.adj[v] = new Bag()
    }
  }
  // 从标准输入流读入一幅图
  async setE(getLine) {
      this.setV(Number(getLine[0]))
      let E = Number(getLine[1])

      for(let i = 2; i < getLine.length; i++) {
        let line = getLine[i]
        let lineArr = line.split(' ')
        let v = Number(lineArr[0])
        let w = Number(lineArr[1])
        let weight = Number(lineArr[2])
        let e = new Eage(v, w, weight)
        this.addEdge(e)
      }
  }
  // 获取顶点数
  getV() { return this.V }
  // 获取边数
  getE() { return this.E }
  // 向图中添加一条边 v-w
  addEdge(e) {
    let v = e.either()
    let w = e.other(v)
    this.adj[v].add(e)
    this.adj[w].add(e)
    this.E++
  }
  // 和 v 相邻的所用顶点
  allAbj(v) {
    return this.adj[v]
  }
  edges() { // 图的所用边
    let b = new Bag()
    for(let v = 0; v < this.V; v++) {
      for(let e of this.allAbj(v)) {
        if(e.other(v) > v) b.add(e)
      }
    }
    return b
  }
}

module.exports = {
  EdgeWeightedGraph
}