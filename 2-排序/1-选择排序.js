
class Selection {
  constructor() {}
  sort(a) {
    let N = a.length
    for(let i = 0; i < N; i++) {
      let min = i
      for(let j = i+1; j < N; j++) {
        if(this.less(a[j], a[min])) min = j
      }
      this.exch(a, i, min)
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

const a = [5,1,4,3,2,6,8]
debugger
const selection = new Selection()

selection.sort(a)
console.log(selection.isSorted(a)) 
selection.show(a)