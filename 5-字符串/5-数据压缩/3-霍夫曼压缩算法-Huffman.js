const { MinPQ } = require('../../4-图/3-最小生成树/MinPQ')

class Node {
  constructor(ch, freq, left, right) {
    this.ch = ch
    this.freq = freq
    this.left = left
    this.right = right
  }
  isLeaf() {
    return this.left == null && this.right == null
  }
  compareTo(that) {
    return this.freq - that.freq
  }
}

class Huffman {
  constructor(s) {
    // ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    this.R = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    this.S = s
  }
  // buildCode(root) {
  //   let st = new Array(this.R)
  //   _buildCode(st, root, "")
  //   return st
  // }
  buildCode(st, x, s) {
    if(x.isLeaf()) {
      st[x.ch] = s
      return
    }
    this.buildCode(st, x.left, s + '0')
    this.buildCode(st, x.right, s + '1')
  }
  buildTrie(freq) {
    let pq = new MinPQ()
    for(let c = 0; c < this.R.length; c++) {
      if(freq[c] > 0) {
        pq.insert(new Node(this.R[c], freq[c], null, null))
      }
    }
    while(pq.size() > 1) {
      let x = pq.delMin()
      let y = pq.delMin()
      let parent = new Node('\0', x.freq + y.freq, x, y)
      pq.insert(parent)
    }
    return pq.delMin()
  }
  writeTrie(x) {
    if(x.isLeaf()) {
      console.log(x.ch)
      return
    }
    this.writeTrie(x.left)
    this.writeTrie(x.right)

  }
  compress() {
    let freq = new Array(this.R.length).fill(0)
    // 统计频率
    for(let i = 0; i < this.S.length; i++) {
      freq[this.S.charCodeAt(i) - 97]++
    }
    // 构建霍夫曼编码树
    let root = this.buildTrie(freq)
    // 构建编码表
    let st = {}
    this.buildCode(st, root, "")
    // this.writeTrie(root)
    console.log(st)
  }
  expand() {
    
  }
}

let s = 'itwasthebdestoftimesitwastheworstoftimes'
let h = new Huffman(s)


debugger
h.compress(s)