
class MaxArr {
  constructor(max) {
    this.pq = new Array(max)
    this.N = 0
  }

  isEmpty() {
    return this.N == 0
  }

  size() {
    return this.N
  }

  getpq() {
    return this.pq
  }

  insert(v) {
    this.pq[this.N++] = v
  }

  delMax() {
    let max = 0
    for(let i = 1; i < this.N; i++) {
      if(this.less(i, max)) max = i
    }
    this.exch(this.N-1, max)
    this.N--
    return this.pq.pop()
  }

  less(i, j) {
    return this.pq[i] > this.pq[j]
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
const pq = new MaxArr(5+1)

for(var i = 0; i < w.length; i++) {
  pq.insert(w[i])
  if(pq.size() > 5) {
    pq.delMax()
    
  }
}

while(!pq.isEmpty()) {
  newW.push(pq.delMax())
}

console.log(newW)