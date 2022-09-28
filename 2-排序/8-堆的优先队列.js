
class MaxPQ {
  constructor(maxN) {
    this.pq = new Array(maxN)
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

  delMax() {
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
    return this.pq[i] < this.pq[j]
  }

  exch(i, j) {
    let t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

}

let w = [1,3,5,7,9,2,4,6,8,10]
let newW = []
debugger
const pq = new MaxPQ(5+1)

for(var i = 0; i < 10; i++) {
  pq.insert(w[i])
  if(pq.size() > 5) {
    pq.delMax()
    
  }
}

while(!pq.isEmpty()) {
  newW.push(pq.delMax())
}

console.log(newW)

