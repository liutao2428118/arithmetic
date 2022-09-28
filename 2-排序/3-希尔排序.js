class Shell {
  constructor() {}
  sort(a) {
    let N = a.length
    let h = 1
    while(h < parseInt(N/3) ) h = 3*h+1
    while(h >= 1) {
      for(var i = h; i < N; i++) {
        for(var j = i; j >= h && this.less(a[j], a[j-h]); j -= h) {
          this.exch(a, j, j-h)
        }
      }
      h = parseInt(h/3) 
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
  show(a) {
    // console.log(a)
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

const w = [1,3,5,7,9,2,4,6,8,10]
debugger
const shell = new Shell()

shell.sort(w)
// console.log(shell.isSorted(a)) 
// console.log(a)
shell.show(w)