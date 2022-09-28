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

class SeparateChainingHashST {
  constructor(M) {
    this.N = 0
    this.M = M
    this.st = new Array(M)
    for(let i = 0; i < this.M; i++) {
      this.st[i] = new SequntialSearchST()
    }
  }
  hash(key) {
    return (hashCode(key) & 0x7fffffff % this.M)
  }
  get(key) {
    return this.st[this.hash(key)].get(key)
  }
  put(key, val) {
    this.st[this.hash(key)].put(key, val)
  }
  Iterable() {}
}