
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

const args = process.argv.splice(2)
const s = new Stack()

while(args.length > 0) {
  let p = args.shift()
  if(p != '-') {
    s.push(p)
  }else if(!s.isEmpty()) {
    console.log(s.pop() + '')
  }
}



