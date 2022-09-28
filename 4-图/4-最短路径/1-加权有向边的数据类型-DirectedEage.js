
class DirectedEdge {
  constructor(v, w, weigth) {
    this.v = v
    this.w = w
    this.weigth = weigth
  }
  getWeigth() {
    return this.weigth
  }
  from() {
    return this.v
  }
  to() {
    return this.w
  }
  toString() {}
}

module.exports = {
  DirectedEdge
}