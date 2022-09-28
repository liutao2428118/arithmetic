
class Merge {
  constructor() {
    this.aux = []
  }
  sort(a) {
    this._sort(a, 0, a.length - 1)
  }
  _sort(a, lo, hi) {
    if(hi <= lo) return
    let mid = parseInt(lo + (hi - lo) / 2) 
    this._sort(a, lo, mid)
    this._sort(a, mid+1, hi)
    this.merge(a, lo, mid, hi)
  }
  merge(a, lo, mid, hi) {
    let i = lo
    let j = mid+1
    for(let k = lo; k <= hi; k++) {
      this.aux[k] = a[k]
    }
    for(let k= lo; k <= hi; k++) {
      if(i > mid) {
        a[k] = this.aux[j++]
      }else if(j > hi) {
        a[k] = this.aux[i++]
      }else if(this.less(this.aux[j], this.aux[i])) {
        a[k] = this.aux[j++]
      }else {
        a[k] = this.aux[i++]
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
  show(a) {
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

const a = ['M','E','R','G','E','S','O','R','T','E','X','A','M','P','L','E']
debugger
const merge = new Merge()

merge.sort(a)
merge.show(a)