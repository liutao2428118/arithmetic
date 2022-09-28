const { Queue } = require('../2-有向图/Queue')
const { Stack } = require('../2-有向图/Stack')
class EdgeWeigtedDepthFirstOrder {
  constructor(G) {
    this.pre = new Queue()
    this.post = new Queue()
    this.reversePost = []
    this.marked = new Array(G.getV())
    for(let v = 0; v < G.getV(); v++) {
      if(!this.marked[v]) this.dfs(G, v) 
    }
  }
  dfs(G, v) {
    this.pre.enqueue(v)
    this.marked[v] = true
    for(let e of G.alladj(v)) {
      if(!this.marked[e.to()]) this.dfs(G, e.to())
    }
    this.post.enqueue(v)
    this.reversePost.push(v)
  }
  getpre () {
    return this.pre
  }
  getpost() {
    return this.post
  }
  getreversePost() {
    return this.reversePost
  }
}

module.exports = {
  EdgeWeigtedDepthFirstOrder
}