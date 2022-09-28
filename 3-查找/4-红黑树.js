class Node {
  constructor(key, val, N, color) {
    this.key = key
    this.val = val
    this.N = N
    this.color = color
  }
}

class RedBlackBST {
  constructor() {
    this.root = null
    this.RED = true
    this.BLACK = false
  }
  isRed(x) {
    if(x == null) return false
    return x.color == this.RED
  }
  rotateLeft(h) {
    let x = h.right
    h.right = x.left
    x.left = h
    x.color = h.color
    h.color = this.RED
    x.N = h.N
    h.N = 1 + this.size(h.left) + this.size(h.right)
    return x
  }
  rotateRight(h) {
    let x = h.left
    h.left = x.right
    x.right = h
    x.color = h.color
    h.color = this.RED
    x.N = h.N
    h.N = 1 + this.size(h.left) + this.size(h.right)
    return x
  }
  flipColors(h) {
    h.color = this.RED
    h.left.color = this.BLACK
    h.right.color = this.BLACK
  }
  size(x) {
    if(x == null) return 0
    else          return x.N
  }
  put(key, val) {
    this.root = this._put(this.root, key, val)
    this.root.color = this.BLACK
  }
  _put(h, key, val) {
    if(h == null) {
      return new Node(key, val, 1, this.RED)
    }
    if(key < h.key) {
      h.left = this._put(h.left, key, val)
    }else if(key > h.key) {
      h.right = this._put(h.right, key, val)
    }else {
      h.val = val
    }
    if(this.isRed(h.right) && !this.isRed(h.left)) {
      h = this.rotateLeft(h)
    }
    if(this.isRed(h.left) && this.isRed(h.left.left)) {
      h = this.rotateRight(h)
    }
    if(this.isRed(h.left) && this.isRed(h.right)) {
      this.flipColors(h)
    }
    h.N = this.size(h.left) + this.size(h.right) + 1
    return h
  }
}

// 测试用例
let d = [
  {key: 'S', val: 0},
  {key: 'E', val: 12},
  {key: 'A', val: 2},
  {key: 'R', val: 3},
  {key: 'C', val: 4},
  {key: 'H', val: 5},
  {key: 'X', val: 7},
  {key: 'M', val: 9},
  {key: 'P', val: 10},
  {key: 'L', val: 13},
]

debugger
let st = new RedBlackBST()

for(let i = 0; i < d.length; i++) {
  st.put(d[i].key, d[i].val)
}
console.log(st)