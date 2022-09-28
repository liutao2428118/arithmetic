function hashCode(str){
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
class LinearProbingHashST {
  constructor(M) {
    this.N = 0
    this.M = M
    this.keys = new Array(M)
    this.vals = new Array(M)
  }
  hash(key) {
    return (hashCode(key) & 0x7fffffff) % this.M
  }
  resize(cap) {
    let t = new LinearProbingHashST(cap)
    for(let i = 0; i < this.M; i++) {
      if(this.keys[i] != null) {
        t.put(this.keys[i], this.vals[i])
      }
    }
    this.keys = t.keys
    this.vals = t.vals
    this.M = t.M
  }
  put(key, val) {
    if(this.N >= this.M / 2) this.resize(2*this.M)
    let i;
    for(i = this.hash(key); this.keys[i] != null; i = (i + 1) % this.M) {
      if(this.keys[i].includes(key)) {
        this.vals[i] = val
        return
      }
    }
    this.keys[i] = key
    this.vals[i] = val
    this.N++
  }
  get(key) {
    for(let i = this.hash(key); this.keys[i] != null; i = (i + 1) % this.M) {
      if(this.keys[i].includes(key)) {
        return this.vals[i]
      }
      return null
    }
  }
}

// 测试用例
let d = [
  {key: 'S', val: 0},
  {key: 'E', val: 12},
  {key: 'A', val: 2},
  {key: 'R', val: 3},
  {key: 'C', val: 4},
  {key: 'H', val: 5},
  {key: 'X', val: 7},
  {key: 'M', val: 9},
  {key: 'P', val: 10},
  {key: 'L', val: 13},
]

debugger
let st = new LinearProbingHashST(12)

for(let i = 0; i < d.length; i++) {
  st.put(d[i].key, d[i].val)
}
console.log(st.get('M'))