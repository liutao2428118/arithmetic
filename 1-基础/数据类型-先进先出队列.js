class Queue {
  constructor() {
    this.q = []
  }

  enqueue(v) {
    this.q.push(v)
  }

  dequeue() {
    return this.q.shift()
  }

  isEmpty() {
    return this.q.length == 0
  }

  size() {
    return this.q.length
  }
  
}

const args = process.argv.splice(2).map(Number)
const q = new Queue()

while(args.length > 0) {
  q.enqueue(args.shift())
}

let N = q.size()

let a = new Array(N)
for(let i = 0; i < N; i++) {
  a[i] = q.dequeue()
}

console.log(a)

