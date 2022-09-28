class MinPQ {
  constructor() {
    this.pq = []
    this.N = 0
  }

  isEmpty() {
    return this.N == 0
  }

  size() {
    return this.N
  }

  insert(v) {
    this.pq[++this.N] = v
    this.swim(this.N)
  }

  delMin() {
    let max = this.pq[1]
    this.exch(1, this.N--)
    this.pq[this.N+1] = null
    this.sink(1)
    return max
  }

  // 上浮
  swim(k) {
    while(k > 1 && this.less(parseInt( k/2), k)) {
      this.exch(parseInt(k/2), k)
      k = parseInt(k/2)
    }
  }

  // 下沉
  sink(k) {
    while(2*k <= this.N) {
      let j = 2*k
      if(j < this.N  && this.less(j, j+1)) j++
      if(!this.less(k, j)) break
      this.exch(k, j)
      k = j
    }
  }

  less(i, j) {
    return this.pq[i].freq > this.pq[j].freq
  }

  exch(i, j) {
    let t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

}

module.exports = {
  MinPQ
}