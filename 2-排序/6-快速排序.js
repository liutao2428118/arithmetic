class Quick {
  constructor() {}
  sort(a) {
   this._sort(a, 0, a.length - 1)
  }
  _sort(a, lo, hi) {
    if(hi <= lo) return
    let j = this.partition(a, lo, hi)
    this._sort(a, lo, j-1)
    this._sort(a, j+1, hi)
  }
  partition(a, lo, hi) {
    let i = lo,j = hi+1  // 左右扫描指针
    let v = a[lo]   // 切分元素
    while(true) {
      while(this.less(a[++i], v)) {  //左边的元素小于切分元素就跳过，如果大于就暂停
        if(i == hi) break
      }
      while(this.less(v, a[--j])) { // 右边的元素大于跳过，小于就暂停
        if(j == lo) break
      }
      if(i >= j) break
      this.exch(a, i, j)  // 左右两边暂停后互换
    }
    this.exch(a, lo, j) // 切分元素替换到切分位
    return j
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

const w = ['K','R','A','T','E','L','E','P','U','I','M','Q','C','X','O','S']
debugger
const quick = new Quick()

quick.sort(w)
// console.log(shell.isSorted(a)) )
quick.show(w)