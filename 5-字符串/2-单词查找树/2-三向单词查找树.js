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
    this.c = ''
    this.left = null
    this.mid = null
    this.right = null
    this.val = null
  }
}


class TST {
  constructor() {
    this.root = null
  }
  get(key) {
    let x = this._get(this.root, key, 0)
    if(x == null) return null
    return x.val
  }
  _get(x, key, d) {
    if(x == null) return null
    let c = key.charAt(d)
    if(c < x.c) return this._get(x.left, key, d)
    else if(c > x.c) return this._get(x.right, key, d)
    else if(d < key.length - 1) return this._get(x.mid, key, d+1)
    else return x
  }
  put(key, val) {
    this.root = this._put(this.root, key, val, 0)
  }
  _put(x, key, val, d) {
    let c = key.charAt(d)
    if(x == null) {
      x = new Node()
      x.c = c
    }
    if(c < x.c) x.left = this._put(x.left, key, val, d)
    else if(c > x.c) x.right = this._put(x.right, key, val, d)
    else if(d < key.length - 1) x.mid = this._put(x.mid, key, val, d+1)
    else x.val = val
    return x
  }
  longestPrefixOf(s) {
    if(s.length == 0) return
    let length = 0
    let x = this.root
    let i = 0
    while(x != null && i < s.length) {
      let c = s.charAt(i)
      if(c < x.c) x = x.left
      else if(c > x.c) x = x.right
      else {
        i++
        if(x.val != null) length = i
        x = x.mid
      }  
    }
    return s.substring(0, length)
  }
}

// let t = new TST()
// debugger
// for(let k in a) {
//   t.put(k, a[k])
// }
// console.log(t.longestPrefixOf('shes'))

module.exports = {
  TST
}