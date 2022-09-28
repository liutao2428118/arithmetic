const fs = require('fs');
const readline  = require('readline');
let rl = readline.createInterface({
  input: fs.createReadStream("./tinyUF.txt")
})

class WeightedQuickUnionUF {
  constructor(N) {
    this.count = N
    this.id = new Array(N)
    for(let i=0;i < N; i++) {
      this.id[i] = i
    }
    this.sz = new Array(N)
    for(let i = 0; i < N; i++) {
      this.sz[i] = 1
    }
  }
  counts() {
    return this.count
  }
  connected(p, q) {
    return this.find(p) == this.find(q)
  }
  find(p) {
    while(p != this.id[p]) p = this.id[p]
    return p
  }
  union(p, q) {
    let i = this.find(p)
    let j = this.find(q)
    if(i == j) return
    if(this.sz[i] < this.sz[j]) {
      this.id[i] = j
      this.sz[j] += this.sz[i]
    } else {
      this.id[j] = i
      this.sz[i] += this.sz[j]
    }
    this.count--
  }

}

// 测试用例
function main(rl) {
  let uf = new WeightedQuickUnionUF(10)
  rl.on('line', line => {
    let lineArr = line.split(' ')
    if(lineArr.length >= 2) {
      let p = parseInt(lineArr[0])
      let q = parseInt(lineArr[1])
      if(uf.connected(p, q)) return
      uf.union(p, q)
      console.log(p + " " + q)
    } 
  })
  rl.on('close', () => {
   console.log(uf.counts() + " components")
   console.log(uf.id)
  })
}

debugger
main(rl)