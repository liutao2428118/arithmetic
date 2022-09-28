class MNode {
  constructor(key, val, N) {
    this.left = null
    this.right = null
    this.key = key
    this.val = val
    this.N = N
  }
}

class BST {
  constructor() {
    this.root = null
  }
  size() {
    return this._size(this.root)
  }
  _size(x) {
    if(x == null) return 0
    else          return x.N
  }
  get(key) {
    return this._get(this.root, key)
  }
  _get(x, key) {
    if(x == null) return null
    if(key < x.key) {
      this._get(x.left, key)
    } else if(key > x.key) {
      return this._get(x.right, key)
    } else {
      return x.val
    }
  }
  put(key, val) {
    this.root = this._put(this.root, key, val)
  }
  _put(x, key, val) {
    if(x == null) return new MNode(key, val, 1)
    if(key < x.key) {
      x.left = this._put(x.left, key, val)
    } else if(key > x.key) {
      x.right = this._put(x.right, key, val)
    } else {
      x.val = val
    }
    x.N = this._size(x.left) + this._size(x.right) + 1
    return x
  }
  // 获取最小键
  min() {
    return this._min(this.root).key
  }
  _min(x) {
    if(x.left == null) return x
    return this._min(x.left) 
  }
  // 获取最大键
  max() {
    return this._max(this.root).key
  }
  _max(x) {
    if(x.right == null) return x
    return this._max(x.right)
  }
  // 向下取整
  floor(key) {
    let x = this._floor(this.root, key)
    if(x == null) return null
    return x.key
  }
  _floor(x, key) {
    if(x == null) return null
    if(key == x.key) {
      return x
    }
    if(key < x.key) {
      return this._floor(x.left, key)
    }
    let t = this._floor(x.right, key)
    if(t != null) return t
    else          return x
  }
  // 向上取整
  ceiling(key) {
    let x = this._ceiling(this.root, key)
    if(x == null) return null
    return x.key
  }
  _ceiling(x, key) {
    if(x == null) return null
    if(key == x.key) {
      return x
    }
    if(key > x.key) {
      return this._ceiling(x.right, key)
    }
    let t = this._ceiling(x.left, key)
    if(t != null) return t
    else          return x
  }
  // 索引获取键
  select(k) {
    return this._select(this.root, k).key
  }
  _select(x, k) {
    if(x == null) return null
    let t = this._size(x.left)
    if(t > k) return this._select(x.left, k)
    else if(t < k) return this._select(x.right, k-t-1)
    else           return x
  }
  // 键获取索引
  rank(key) {
    return this._rank(key, this.root)
  }
  _rank(key, x) {
    if(x == null) return 0
    if(key < x.key)      return this._rank(key, x.left)
    else if(key > x.key) return 1 + this._size(x.left) + this._rank(key, x.right)
    else                 return this._size(x.left)
  }
  // 删除最小键
  deleteMin() {
    this.root = this._deleteMin(this.root)
  }
  _deleteMin(x) {
    if(x.left == null) return x.right
    x.left = this._deleteMin(x.left)
    x.N = this._size(x.left) + this._size(x.right) + 1
    return x
  }
  // 删除最大键
  deleteMax() {
    this.root = this._deleteMax(this.root)
  }
  _deleteMax(x) {
    if(x.right == null) return x.left
    x.right = this._deleteMax(x.right)
    x.N = this._size(x.right) + this._size(x.left) + 1
    return x 
  }
  // 删除任意键
  delete(key) {
    this.root = this._delete(this.root, key)
  }
  _delete(x, key) {
    if(x == null) return null
    if(key < x.key) x.left = this._delete(x.left, key)
    else if(key > x.key) x.right = this._delete(x.right, key)
    else {
      if(x.right == null) return x.left
      if(x.left == null) return x.right
      let t = x
      x = this._min(t.right)
      x.right = this._deleteMin(t.right)
      x.left = t.left
    }
    x.N = this._size(x.left) + this._size(x.right) + 1
    return x
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
]
debugger
let st = new BST()

for(let i = 0; i < d.length; i++) {
  st.put(d[i].key, d[i].val)
}
st.delete('E')
console.log(st)