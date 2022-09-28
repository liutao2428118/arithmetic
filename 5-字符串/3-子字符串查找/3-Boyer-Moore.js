
class BoyerMoore {
  constructor(pat) {
    this.pat = pat
    let M = pat.length
    let R = 26
    this.right = new Array(R)
    for(let c = 0; c < R; c++) {
      this.right[c] = -1
    }
    for(let j = 0; j < M; j++) {
      this.right[pat.charCodeAt(j) - 65] = j
    }
  }
  search(txt) {
    let N = txt.length
    let M = this.pat.length
    let skip
    for(let i = 0; i <= N-M; i += skip) {
      skip = 0
      for(let j = M - 1; j >= 0; j--) {
        if(this.pat.charCodeAt(j) - 65 != txt.charCodeAt(i+j) - 65) {
          skip = j - this.right[txt.charCodeAt(i+j) - 65]
          if(skip < 1) skip = 1
          break
        }
      }
      if(skip == 0) return i
    }
    return N
  }
}

function main() {
  let pat = 'ABABAC'
  let txt = 'BCBAABACAABABACAA'
  debugger
  let kmp = new BoyerMoore(pat)
  // console.log("txt:  " + txt)
  let offset = kmp.search(txt)
  console.log(offset)
}

main()