class MNode {
  constructor(key, val, next) {
    this.key = key
    this.val = val
    this.next = next
  }
}


class SequentialSearchST {
  constructor() {
    this.first = null
    this.N = 0
  }

  get(key) {
    for(let x = this.first; x != null; x = x.next) {
      if(key == x.key) {
        return x.val
      }
    }
    return null
  }

  put(key, val) {
    let t = 0
    for(let x = this.first; x != null; x = x.next) {
      // console.log(t++)
      if(key == x.key) {
        x.val = val
        return
      }
    }
    this.first = new MNode(key, val, this.first)
    this.N++
  }

  size() {
    return this.N
  }

  keys() {
    let keys = []
    for(let x = this.first; x != null; x = x.next) {
      keys.push(x.key)
    }
    return keys
  }

  delete(key) {
    for(let x = this.first; x != null; x = x.next) {
      if(key == x.key) {
        this.first = x.next
        this.N--
        return
      }
    }
  }
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
let st = new SequentialSearchST()

for(let i = 0; i < d.length; i++) {
  st.put(d[i].key, d[i].val)
}

st.put('R', 20)
console.log(st.get('R'))