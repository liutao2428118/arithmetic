
class Queue {
  constructor() {
    this.first = null //最早添加的节点
    this.last = {} // 最近添加的节点
    this.N = 0
  }

  isEmpty() {
    return this.first == null
  }
  
  size() {
    return this.N
  }

  enqueue(item) {
    let oldlast = this.last
    this.last = {
      item,
      next: null
    }
    if(this.isEmpty()) {
      this.first = this.last
    } else {
      oldlast.next = this.last
    }
    this.N++
  }

  dequeue() {
    let item = this.first.item
    this.first = this.first.next
    if(this.isEmpty()) {
      this.last = null
    }
    this.N--
    return item
  }
}

const args = process.argv.splice(2)
const q = new Queue()

while(args.length > 0) {
  let p = args.shift()
  if(p != '-') {
    q.enqueue(p)
  }else if(!q.isEmpty()) {
    console.log(q.dequeue() + '')
  }
}