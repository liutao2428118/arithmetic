![1660112508954.png](https://cdn.nlark.com/yuque/0/2022/png/726490/1660112571105-330ac9db-770e-4255-a339-208c85a310e1.png#clientId=u04078a0a-81a8-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=ud4d2caa0&margin=%5Bobject%20Object%5D&name=1660112508954.png&originHeight=379&originWidth=1125&originalType=binary&ratio=1&rotation=0&showTitle=false&size=227929&status=done&style=none&taskId=u50364bdc-026c-457a-a6f6-98d25776425&title=)

1. 数据结构-符号表

什么是符号表，符号表的主要目标就是将一个键和一个值关联起来，将一个键值对插入符号表并希望在之后的能够在符号好表中通过键找到对应的值。

2. 无序链表-顺序查找

一般最笨拙的方法就是按顺序插入和查找，这样的效率可想而知，最坏的情况下需要遍历整个链表。
```javascript
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
```

3. 有序数组-二分查找

在程序的世界里，一切皆可二分，下面的例子中就是通过两个数组，分别装下 keys 和 vals，输入要插入和查询的键，计算出一个中位键，如果输入的键小于中位键就向左子数组查询，如果大于中位键就向右子数组查询，并且是一直这样切分下去，只到找到为止。相比顺序查找，二分查找的查询效率可以控制在 lgN 级别。可以看到下方的例子，put 时每次都要遍历数组元素重新移位，这样就大大的增加了开销。
```javascript
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
}
```

4. 二叉查找树

二叉查找树是在二分查找算法上的升级，二分查找的查找是可以到达 lgN 级别，可是插入还是很慢。如何让查找和插入都到达 lgN 级别了。这就二叉查找树要解决的问题。二叉查找树的中心思想也是通过二分，通过一个拥有两个子分支（左右）的节点链表数据结构实现。首先将输入的键与根节点的键做比较，如果小于根节点就去左边分支查找，如果大于就去右边分支。
```javascript
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
```

5. 2-3查找树（红黑树）

不过二叉查找树还有个问题就是，最坏情况下查询和插入都是 N 级别。也就是插入的键本身是有序的，导致分支会向一边倾斜，这样我们的查找还是按顺序。我们现在需要一个平衡的查找树，这就是红黑树要解决的问题。

二叉查找树的最好情况、一般情况、和最后情况。
![1660117243411.png](https://cdn.nlark.com/yuque/0/2022/png/726490/1660117263556-131bb0b8-e5f3-4809-a095-9ece79f8150b.png#clientId=u04078a0a-81a8-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u9431c2bc&margin=%5Bobject%20Object%5D&name=1660117243411.png&originHeight=583&originWidth=314&originalType=binary&ratio=1&rotation=0&showTitle=false&size=57811&status=done&style=none&taskId=u370a0041-8e11-4126-96ca-4c7bc2a48cc&title=)
```javascript
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
```

6. 散列表

使用散列的查找算法分为两步，第一步是用散列函数将被查找的键转换为数组的一个索引。第二步是一个处理碰撞冲突，两个键同时使用一个散列值。处理碰撞冲突也有多种方式，拉链法和线性探测法。

拉链法：
```javascript
function hashCode(str){
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

class SeparateChainingHashST {
  constructor(M) {
    this.N = 0
    this.M = M
    this.st = new Array(M)
    for(let i = 0; i < this.M; i++) {
      this.st[i] = new SequntialSearchST()
    }
  }
  hash(key) {
    return (hashCode(key) & 0x7fffffff % this.M)
  }
  get(key) {
    return this.st[this.hash(key)].get(key)
  }
  put(key, val) {
    this.st[this.hash(key)].put(key, val)
  }
  Iterable() {}
}
```
线性探测法：
```javascript
function hashCode(str){
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
class LinearProbingHashST {
  constructor(M) {
    this.N = 0
    this.M = M
    this.keys = new Array(M)
    this.vals = new Array(M)
  }
  hash(key) {
    return (hashCode(key) & 0x7fffffff) % this.M
  }
  resize(cap) {
    let t = new LinearProbingHashST(cap)
    for(let i = 0; i < this.M; i++) {
      if(this.keys[i] != null) {
        t.put(this.keys[i], this.vals[i])
      }
    }
    this.keys = t.keys
    this.vals = t.vals
    this.M = t.M
  }
  put(key, val) {
    if(this.N >= this.M / 2) this.resize(2*this.M)
    let i;
    for(i = this.hash(key); this.keys[i] != null; i = (i + 1) % this.M) {
      if(this.keys[i].includes(key)) {
        this.vals[i] = val
        return
      }
    }
    this.keys[i] = key
    this.vals[i] = val
    this.N++
  }
  get(key) {
    for(let i = this.hash(key); this.keys[i] != null; i = (i + 1) % this.M) {
      if(this.keys[i].includes(key)) {
        return this.vals[i]
      }
      return null
    }
  }
}
```
