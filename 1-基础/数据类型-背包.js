
// 背包是一种不支持从中删除元素的集合数据类型，它的目的就是帮助用例收集元素迭代遍历所有收集的元素
class Bag {
  constructor() {
    this.bag = []
  }

  getBag() {
    return this.bag
  }

  add(v) {
    this.bag.push(v)
  }

  size() {
    return this.bag.length
  }
}

var args = process.argv.splice(2)

const bag = new Bag()
const numbers = bag.getBag()

while(args.length > 0) {
  bag.add(args.shift())
}

let N = bag.size()

let sum = 0

for(let i = 0; i < N; i++) {
  sum += parseInt(numbers[i])
}

let mean = sum / N

sum = 0

for(let i = 0; i < N; i++) {
  sum += (parseInt(numbers[i]) - mean)*(parseInt(numbers[i]) - mean)
}

let std = Math.sqrt(sum/(N-1))

console.log("Mean:", mean)
console.log("Std dev", std)
