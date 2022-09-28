
class Bag {
  constructor() {
    this.first = null
    this.current = null
  }

  add(item) {
    let olfirst = this.first
    this.first = {
      item,
      next: olfirst
    }
  }

  // 增加迭代器
  [Symbol.iterator]() {
    this.current = this.first
    return this
  }

  next() {
    if(this.current == null) {
      return {done: true, value: undefined}
    }
    let item = this.current.item
    this.current = this.current.next
    if(!item) {
      return {done: true, value: undefined}
    } else {
      return {done: false, value: item}
    }

  }
}

const args = process.argv.splice(2)

const bag = new Bag()

while(args.length > 0) {
  let p = args.shift()
  if(p != '-') {
    bag.add(p)
  }
}

for (const value of bag) {
  console.log(value)
}
