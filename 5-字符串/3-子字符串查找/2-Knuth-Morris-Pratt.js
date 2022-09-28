
class KMP {
  constructor(pat) {
    // 由模式字符串构造 DFA
    this.pat = pat
    let M = pat.length
    let R = 26
    this.dfa = new Array(R)
    for (let i = 0; i < R; i++) this.dfa[i] = new Array(M).fill(0)
    this.dfa[pat.charCodeAt(0) - 65][0] = 1
    for(let x = 0, j = 1; j < M; j++) {
      for(let c = 0; c < R; c++) {
        this.dfa[c][j] = this.dfa[c][x]  // 复制匹配失败的情况下的值
      }
      this.dfa[pat.charCodeAt(j) - 65][j] = j + 1  // 设置匹配成功情况下的值
      x = this.dfa[pat.charCodeAt(j) - 65][x]  // 更新重启状态
    }
  }
  search(txt) {
    // 在 txt 上模拟 DFA 的运行
    let i, j, N = txt.length, M = this.pat.length
    for(i = 0, j = 0; i < N && j < M; i++) {
      j = this.dfa[txt.charCodeAt(i) - 65][j]
    }
    if(j == M) return i - M
    else return N
  }
}

function main() {
  let pat = 'ABABAC'
  let txt = 'BCBAABACAABABACAA'
  debugger
  let kmp = new KMP(pat)
  console.log("txt:  " + txt)
  let offset = kmp.search(txt)
  // console.log("pattern: ")
  // for(let i = 0; i < offset; i++) {
  //   console.log('')
  // }
  console.log(offset)
}

main()

// function getNext(pat) {
//   let j = 0
//   let N =  pat.length
//   let netx = new Array(N)
//   netx[0] = j
//   for(let i = 1; i < N; i++) {
//     while(j > 0 && pat[i] != pat[j]) {
//       j = netx[j - 1]
//     }
//     if(pat[i] == pat[j]) j++
//     netx[i] = j
//   }
//   return netx
// }

// function kmpSearch(txt, pat) {
//   let j = 0
//   let next = getNext(pat)
//   for(let i = 0; i < txt.length; i++) {
//     while(j > 0 && txt[i] != pat[j]) {
//       j = next[j - 1]
//     }
//     if(txt[i] == pat[j]) {
//       j++
//     }
//     if(j == pat.length) {
//       return (i - pat.length + 1)
//     }
//   }
//   return -1
// }

// let pat = 'ABABAC'
// let txt = 'BCBAABACAABABACAA'
// debugger
// console.log(kmpSearch(txt, pat))