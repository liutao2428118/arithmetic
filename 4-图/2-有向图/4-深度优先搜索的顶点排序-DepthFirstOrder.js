const { Queue } = require('./Queue')
const { Stack } = require('./Stack')
class DepthFirstOrder {
  constructor(G) {
    this.pre = new Queue()
    this.post = new Queue()
    this.reversePost = new Stack()
    this.marked = new Array(G.getV())
    for(let v = 0; v < G.getV(); v++) {
      if(!this.marked[v]) this.dfs(G, v) 
    }
  }
  dfs(G, v) {
    this.pre.enqueue(v)
    this.marked[v] = true
    for(let w of G.allAdj(v)) {
      if(!this.marked[w]) this.dfs(G, w)
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
  DepthFirstOrder
}