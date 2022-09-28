function search(pat, txt) {
  let j, M = pat.length
  let i, N = txt.length
  for(i = 0, j = 0; i < N && j < M; i++) {
    if(txt.charAt(i) == pat.charAt(j)) j++
    else {i -= j; j = 0}
  }
  if(j == M) return i - M
  else return N
}

let txt = 'ABACADABRAC'
let pat = 'ABRA'
debugger
console.log(search(pat, txt))