const { Queue } = require('../../4-图/2-有向图/Queue')

const a = {
  she: 0,
  sells: 1,
  sea: 2,
  shells: 3,
  by: 4,
  the: 5,
  sea: 6,
  shore: 7
}

class Node {
  constructor() {
    this.val = {}
    this.next = []
  }
}


class TrieST {
  constructor() {
    this.R = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    this.root = null
  }
  get(key) {
    let x = this._get(this.root, key, 0)
    if(x == null) return null
    return x.val
  }
  _get(x, key, d) {
    if(x == null) return null
    if(d == key.length) return x
    let c = key.charCodeAt(d) - 97
    return this._get(x.next[c], key, d+1)
  }
  put(key, val) {
    this.root = this._put(this.root, key, val, 0)
  }
  _put(x, key, val, d) {
    if(x == null) x = new Node()
    if(d == key.length) {
      x.val = val
      return x
    }
    let c = key.charCodeAt(d) -97
    x.next[c] = this._put(x.next[c], key, val, d+1)
    return x
  }
  keys() {
    return this.keysWithPrefix("")
  }
  keysWithPrefix(pre) {
    let q = new Queue()
    this.collect1(this._get(this.root, pre, 0), pre, q)
    return q
  }
  collect1(x, pre, q) {
    if(x == null) return
    if(x.val != null) q.enqueue(pre)
    for(let c = 0; c < this.R.length; c++) {
      this.collect1(x.next[c], pre + this.R[c], q)
    }
  }
  keysThatMatch(pat) {
    let q = new Queue()
    this.collect2(this.root, "", pat, q)
    return q
  }
  collect2(x, pre, pat, q) {
    let d = pre.length
    if(x == null) return
    if(d == pat.length && x.val != null) q.enqueue(pre)
    if(d == pat.length) return

    let next = pat.charAt(d)
    for(let c = 0; c < this.R.length; c++) {
      if(next == '.' || next == this.R[c]) {
        this.collect2(x.next[c], pre + this.R[c], pat, q)
      }
    }
  }
  longestPrefixOf(s) {
    let length = this.search(this.root, s, 0, 0)
    return s.substring(0, length)
  }
  search(x, s, d, length) {
    if(x == null) return length
    if(x.val != null) length = d
    if(d == s.length) return length
    let c = s.charCodeAt(d) - 97
    return this.search(x.next[c], s, d+1, length) 
  }
  delete(key) {
    this.root = this._delete(this.root, key, 0)
  }
  _delete(x, key, d) {
    if(x == null) return
    if(d == key.length) {
      x.val = null
    } else {
      let c = key.charCodeAt(d) - 97
      x.next[c] = this._delete(x.next[c], key, d+1)
    }
    if(x.val != null) return x
    for(let c = 0; c < this.R; c++) {
      if(x.next[c] != null) return x
    }
    return null
  }
}

const t = new TrieST()

for(let k in a) {
  t.put(k, a[k])
}
debugger
console.log(JSON.stringify(t.longestPrefixOf('shesd')))