
class Eage {
  constructor(v, w, weight) {
    this.v = v
    this.w = w
    this.weight = weight
  }
  getweight() { // 边的权重
    return this.weight
  }
  either() {  // 边两端的顶点之一
    return this.v
  }
  other(vertex) { // 另一个顶点
    if(vertex == this.v) return this.w
    else if(vertex == this.w) return this.v 
  }
  compareTo(that) { // 将这条边e 与 that 比较
    if(this.getweight() < that.weight()) return -1
    else if(this.getweight() > that.getweight()) return +1
    else return 0  
  }
  toString() { //对象的字符串表示
    // return String.format(this.v, this.w, this.weight)
  }
}

module.exports = {
  Eage
}