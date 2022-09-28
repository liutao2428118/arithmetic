
class KruskalMST {
  constructor(G) {
    this.mst = new Queue()
    this.pq = new MinPQ(G.edges())
    this.uf = new this.UF()

    while(!this.pq.isEmpty() && this.mst.size() < G.V() -1) {
      let e = pq.deMin()
      let v = e.either()
      let w = e.other(v)
      if(this.uf.connected(v, w)) continue
      this.uf.union(v, w)
      this.mst.enqueue(e)
    }
  }
  edges() {
    return this.mst
  }
  weigth() {}
}