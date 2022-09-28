
class RabinKarp {
  constructor(pat) {
    this.pat = pat
    this.M = pat.length
    this.Q = longRandomPrime()
    this.R = 26
    this.RM = 1
    for(let i = 1;  i <= M-1; i++) {
      this.RM = (this.R * this.RM) % this.Q
    }
    this.patHash = this.hash(pat, this.M)
  }
  check(i) {
    return true
  }
  hash(key, M) {
    let h = 0
    for(let j = 0; j < M; j++) {
      h = (this.R * h + (key.charCodeAt(j) - 65)) % this.Q
    }
    return h
  }
  search(txt) {
    let N = txt.length
    let txtHash = this.hash(txt, this.M)
    if(this.patHash == txtHash&&this.check(0)) return 0
    for(let i = this.M; i < this.N; i++) {
      txtHash = (txtHash + this.Q - this.RM*txt.charCodeAt(i - this.M) % this.Q) % this.Q
      txtHash = (txtHash*this.R + txt.charCodeAt(i) % this.Q)
      if(this.patHash == txtHash) {
        if(this.check(i - this.M + 1)) return i + this.M + 1
      }
    }
    return N
  }
}