
class Heapsor {
  constructor() {}

  sort(a) {
    let N = a.length 
    for(let k = parseInt(N/2); k >= 1; k--) {
      this.sink(a, k, N)
    }
    while(N > 1) {
      this.exch(a, 1, N--)
      this.sink(a, 1, N)
    }
  }

  // 上浮
  swim(k) {
    while(k > 1 && this.less(parseInt( k/2), k)) {
      this.exch(parseInt(k/2), k)
      k = parseInt(k/2)
    }
  }

  // 下沉
  sink(a, k, N) {
    while(2*k <= N) {
      let j = 2*k
      if(j < N  && this.less(a, j, j+1)) j++
      if(!this.less(a, k, j)) break
      this.exch(a, k, j)
      k = j
    }
  }

  less(a, i, j) {
    return a[i] < a[j]
  }

  exch(a, i, j) {
    let t = a[i]
    a[i] = a[j]
    a[j] = t
  }

}

let w = [0, 1,3,5,7,9,2,4,6,8,10]
debugger
const pq = new Heapsor()

pq.sort(w)

console.log(w)