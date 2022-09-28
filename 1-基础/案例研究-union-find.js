const fs = require('fs');
const readline  = require('readline');
let rl = readline.createInterface({
  input: fs.createReadStream("./tinyUF.txt")
})

class UF {
  constructor(N) {
    this.count = N
    this.id = new Array(N)
    for(let i=0;i < N; i++) {
      this.id[i] = i
    }
  }
  counts() {
    return this.count
  }
  connected(p, q) {
    return this.find(p) == this.find(q)
  }
  find(p) {
    // return this.id[p]
    while(p != this.id[p]) p = this.id[p]
    return p
  }
  union(p, q) {
    // let pID = this.find(p)
    // let qID = this.find(q)

    // if(pID == qID) return

    // for(let i=0; i < this.id.length; i++) {
    //   if(this.id[i] == pID) this.id[i] = qID
    // }
    let pRoot = this.find(p)
    let qRoot = this.find(q)
    if(pRoot == qRoot) return

    this.id[pRoot] = qRoot
    this.count--
  }

}

// 测试用例
function main(rl) {
  let uf = new UF(10)
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