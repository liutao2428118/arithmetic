const { Digraph } = require('../../4-图/2-有向图/1-Digraph')
const { DirectedDFS } = require('../../4-图/2-有向图/2-有向图的可达性-DirectedDFS')
const { Bag } = require('../../4-图/2-有向图/Bag')

class Stack {
  constructor() {
    this.first = null
    this.N = 0
  }

  isEmpty() {
    return this.first == null
  }
  
  size() {
    return this.N
  }

  push(item) {
    let olfirst = this.first
    this.first = {
      item,
      next: olfirst
    }
    this.N++
  }

  pop() {
    let item = this.first.item
    this.first = this.first.next
    this.N--
    return item
  }
}

class NFA {
  constructor(regexp) {
    this.ops = new Stack()
    this.re = regexp.split("")
    this.M = this.re.length
    this.G = new Digraph()
    this.G.setV(this.M+1)

    for(let i = 0; i < this.M; i++) {
      let lp = i
      if(this.re[i] == '(' || this.re[i] == '|') {
        this.ops.push(i)
      }else if(this.re[i] == ')') {
        let or = this.ops.pop()
        if(this.re[or] == '|') {
          lp = this.ops.pop()
          this.G.addEdge(lp, or + 1)
          this.G.addEdge(or, i)
        } else {
          lp = or
        }
      }
      if(i < this.M-1 && this.re[i+1] == '*') {
        this.G.addEdge(lp, i+1)
        this.G.addEdge(i+1, lp)
      }
      if(this.re[i] == '(' || this.re[i] == '*' || this.re[i] == ')') {
        this.G.addEdge(i, i+1)
      }
    }
  }
  recognizas(txt) {
    let pc = new Bag()
    let dfs = new DirectedDFS(this.G, [0])
    for(let v = 0; v < this.G.getV(); v++) {
      if(dfs.getmarked(v)) pc.add(v)
    }
    for(let i = 0; i < txt.length; i++) {
      let match = new Bag()
      for(let v of pc) {
        if(v < this.M) {
          if(this.re[v] == txt.charAt(i) || this.re[v] == '.') {
            match.add(v+1)
          }
        }
      }
      pc = new Bag()
      dfs = new DirectedDFS(this.G, match)
      for(let v = 0; v < this.G.getV(); v++) {
        if(dfs.getmarked(v)) pc.add(v) 
      }
    }
    for(let v of pc) if(v == this.M) return true
    return false
  }
}

function main() {
  let regexp = "((A*B|AC)D)"
  let txt = 'AAABD'
  debugger
  let nfa = new NFA(regexp)
  console.log(nfa.recognizas(txt)) 
}

main()