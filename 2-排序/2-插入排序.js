
class Insertion {
  constructor() {}
  sort(a) {
    let N = a.length
    for(let i = 1; i < N; i++) {
      for(let j = i; j > 0 && this.less(a[j], a[j-1]); j--) {
        this.exch(a, j, j-1)
      }
    }
  }
  less(v, w) {
    return v < w
  }
  exch(a, i, j) {
    let t = a[i]
    a[i] = a[j]
    a[j] = t
  }
  show() {
    for(let i = 0; i < a.length; i++) {
      console.log(a[i] + " ")
    }
  }
  isSorted(a) {
    for(let i = 1; i < a.length; i++) {
      if(this.less(a[i], a[i-1])) return false
      return true
    }
  }
}

module.exports = {
  Insertion
}
// const a = [5,0, 7,9,2,4,6,4,8,11,16]
// const insertion = new Insertion()

// insertion.sort(a)
// console.log(insertion.isSorted(a)) 
// insertion.show(a)