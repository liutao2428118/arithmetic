class IndexMinPQ {
  constructor(maxN) {
    if (maxN < 0) throw new Error();
    this.maxN = maxN
    this.n = 0
    this.keys = new Array(maxN + 1)
    this.pq = new Array(maxN + 1)
    this.qp = new Array(maxN + 1)
    for(let i = 0; i <= maxN; i++) {
      this.qp[i] = -1
    }
  }

  isEmpty() {
    return this.n == 0
  }

  contains(i) {
    this.validateIndex(i)
    return this.qp[i] != -1
  }
  size() {
    return this.n
  }
  insert(i, key) {
    this.validateIndex(i)
    if(this.contains(i)) throw new Error("index is not in the priority queue");
    this.n++
    this.qp[i] = this.n
    this.pq[this.n] = i
    this.keys[i] = key
    this.swim(this.n)
  }
  minIndex() {
    if(this.n == 0)  throw new Error("Priority queue underflow");
    return this.pq[1]
  }
  delMin() {
    if (this.n == 0) throw new Error("Priority queue underflow");
    let min = this.pq[1]
    this.exch(1, this.n--)
    this.sink(1)
    // console.log(min == this.pq[this.n+1])
    this.qp[min] = -1
    this.keys[min] = null
    this.pq[this.n + 1] = -1
    return min
  }
  keyOf(i) {
    this.validateIndex(i)
    if (!this.contains(i)) throw new Error("index is not in the priority queue")
    else return this.keys[i]
  }
  changeKey(i, key) {
    this.validateIndex(i)
    if(!this.contains(i)) throw new Error("index is not in the priority queue")
    this.keys[i] = key
    this.swim(this.qp[i])
    this.sink(this.qp[i])
  }
  change(i, key) {
    this.changeKey(i, key)
  }
  decreaseKey(i, key) {
    this.validateIndex(i)
    if(!this.contains(i)) throw new Error("index is not in the priority queue")
    if(this.keys[i] == key) {
      throw new Error("Calling decreaseKey() with a key equal to the key in the priority queue")
    }
    if(this.keys[i] < key) {
      throw new Error("Calling decreaseKey() with a key strictly greater than the key in the priority queue")
    }
    this.keys[i] = key
    this.swim(this.qp[i])
  }
  increaseKey(i, key) {
    this.validateIndex(i)
    if(!this.contains(i)) throw new Error("index is not in the priority queue")
    if(this.keys[i] == key) {
      throw new Error("Calling decreaseKey() with a key equal to the key in the priority queue")
    }
    if(this.keys[i] < key) {
      throw new Error("Calling decreaseKey() with a key strictly greater than the key in the priority queue")
    }
    this.keys[i] = key
    this.sink(this.qp[i])
  }
  delete(i) {
    this.validateIndex(i);
    if (!this.contains(i)) throw new Error("index is not in the priority queue")
    let index = qp[i];
    this.exch(index, this.n--);
    this.swim(index);
    this.sink(index);
    this. keys[i] = null;
    this.qp[i] = -1;
  }
  validateIndex(i) {
    if (i < 0) throw new Error("index is negative: " + i);
    if (i >= this.maxN) throw new Error("index >= capacity: " + i);
  }
  greater(i, j) {
    return this.keys[this.pq[i]] > this.keys[this.pq[j]];
  }
  exch(i, j) {
    let swap = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
  }
  swim(k) {
    while (k > 1 && this.greater(k/2, k)) {
        this.exch(k, k/2);
        k = k/2;
    }
  }
  sink(k) {
    while (2*k <= this.n) {
        let j = 2*k
        if (j < this.n && this.greater(j, j+1)) j++
        if (!this.greater(k, j)) break
        this.exch(k, j)
        k = j
    }
  }
  iterator() {}
}

// 测试用例
function main() {
  let strings = ["S", "D", "H", "C", "A", "E", "J", "R", "L", "B"]
  let pq = new IndexMinPQ(strings.length)

  for (let i = 0; i < strings.length; i++) {
    pq.insert(i, strings[i]);
  }
  console.log(pq);

  // delete and print each key
  while (!pq.isEmpty()) {
    let i = pq.delMin();
    console.log(i + " " + strings[i]);
  }
 console.log();

  // reinsert the same strings
  // for (let i = 0; i < strings.length; i++) {
  //     pq.insert(i, strings[i]);
  // }

  // print each key using the iterator
  // for (let i in pq) {
  //   console.log(i + " " + strings[i]);
  // }
  // while (!pq.isEmpty()) {
  //     pq.delMin();
  // }
}

// main()

module.exports = IndexMinPQ