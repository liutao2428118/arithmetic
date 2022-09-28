class BinarySearchST {
  constructor() {
    this.keys = []
    this.vals = []
    this.N = 0
  }
  isEmpty() {
    return this.N == 0
  }
  size() {
    return this.N
  }
  get(key) {
    if(this.isEmpty()) return null
    let i = this.rank(key)
    if(i < this.N && this.keys[i] == key) {
        return this.vals[i]
    }else {
      return null
    }
  }
  put(key, val) {
    let i = this.rank(key)
    if(i < this.N && this.keys[i] == key) {
      this.vals[i] = val
      return
    }
    for(let j = this.N; j > i; j--) {
      this.keys[j] = this.keys[j-1]
      this.vals[j] = this.vals[j-1]
    }
    this.keys[i] = key
    this.vals[i] = val
    this.N++
  }
  rank(key) {
    let lo = 0
    let hi = this.N - 1
    while(lo <= hi) {
      let mid = lo + parseInt((hi - lo) / 2) 
      if(key < this.keys[mid]) {
        hi = mid - 1
      } else if(key > this.keys[mid]) {
        lo = mid + 1
      } else {
        return mid
      }
    }
    return lo
  }
  min() {
    return this.keys[0]
  }
  max() {
    return this.keys[this.N - 1]
  }
  select(k) {
    return this.keys[k]
  }
  ceiling(key) {
    let i = this.rank(key)
    return this.keys[i]
  }
  floor() {}
  delete() {}
  keys() {}
}

// 测试用例
let d = [
  {key: 'S', val: 0},
  {key: 'E', val: 1},
  {key: 'A', val: 2},
  {key: 'R', val: 3},
  {key: 'C', val: 4},
  {key: 'H', val: 5},
  {key: 'E', val: 6},
  {key: 'X', val: 7},
  {key: 'A', val: 8},
  {key: 'M', val: 9},
  {key: 'P', val: 10},
  {key: 'L', val: 11},
  {key: 'E', val: 12}
]
debugger
let st = new BinarySearchST()

for(let i = 0; i < d.length; i++) {
  st.put(d[i].key, d[i].val)
}

console.log(st)