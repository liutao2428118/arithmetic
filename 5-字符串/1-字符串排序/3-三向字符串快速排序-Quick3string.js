let a = [
  'she',
  'sells',
  'seashells',
  'by',
  'the',
  'seashore',
  'the',
  'shells',
  'she',
  'sells',
  'are',
  'surely',
  'seashells'
]

class Quick3string {
  constructor() {}
  charAt(s, d) {
    if(d < s.length) {
      return s.charCodeAt(d) - 97
    }else {
      return -1
    }
  }
  sort(a) {
    this._sort(a, 0, a.length-1, 0)
  }
  _sort(a, lo, hi, d) {
    if(hi <= lo) return
    let lt = lo
    let gt = hi
    let v = this.charAt(a[lo], d)
    let i = lo + 1
    while(i <= gt) {
      let t = this.charAt(a[i], d)
      if(t < v) {
        this.exch(a, lt++, i++)
      }else if(t > v){
        this.exch(a, i, gt--)
      }else {
        i++
      }
    }
    this._sort(a, lo, lt-1, d)
    if(v >= 0) {
      this._sort(a, lt, gt, d+1)
    }
    this._sort(a, gt+1, hi, d)
  }
  exch(a, i, j) {
    let t = a[i]
    a[i] = a[j]
    a[j] = t
  }
}

const p3 = new Quick3string()
debugger
p3.sort(a)
console.log(a)