const {
  TST
} = require('../2-单词查找树/2-三向单词查找树')

const CHARCODE_A_LC = 65
// class LZW {
//   constructor(max_size) {
//     this.seq = new Array(max_size).fill('')   //字典数组
//     this.code = new Array(max_size).fill(0) // 字典数字
//     this.size = 1
//     this.max_size = max_size
//     this.seq[0] = '#'
//     for(let i = 0; i < 26; i++) {
//       this.insert_seq(String.fromCharCode(CHARCODE_A_LC + i))
//     }
//   }
//   get_seq_code(seq) {
//     for(let i = 0; i < this.size; i++) {
//       if(this.seq[i] == seq) {
//         return this.code[i]
//       }
//     }
//     return -1
//   }
//   insert_seq(seq) {
//     let i = this.size
//     this.seq[i] = seq
//     this.code[i] = i
//     this.size++
//   }
//   handeleStr(str) {
//     let length = str.length;
//     let newArr = str.split('');
//     newArr[length - 1] = '';
//     return newArr.join('');
//   }
//   compress(text) {
//     let next, code, i = 0
//     let current = ''
//     while(i < text.length) {
//       current += text[i]
//       next = text[i+1]
//       while(this.get_seq_code(current) != -1) {
//         current += next
//         i++
//         next = text[i+1]
//       }
//       current = this.handeleStr(current)
//       next = text[i]
//       code = this.get_seq_code(current)
//       current += next
//       this.insert_seq(current)
//       console.log(code, current)
//       current = ''
//     }
//   }
// }

class LZW {
  constructor() {
    this.R = 26
  }
  compress(text) {
    let arr = []
    let st = new TST()
    // 初始化编码表
    for (let i = 0; i < this.R; i++) {
      st.put(String.fromCharCode(CHARCODE_A_LC + i), i)
    }
    // console.log(JSON.stringify(st))
    // code从27开始
    let code = this.R + 1
    while (text.length > 0) {
      // 单词查找树中找出最长前缀
      let s = st.longestPrefixOf(text)
      // console.log(s)
      // 单词查找树查找当前字符串的 值，也就是编码
      arr.push(st.get(s))
      let t = s.length
      if (t < text.length) {
        // 将 s 添加到编码表
        st.put(text.substring(0, t + 1)  , code++)
      }
      // 从当前位置截断 text 接续编码
      text = text.substring(t)
    }
    console.log(arr)
  }
  expand(codes) {
    let st = new Array(100)
    let i;
    for (i = 0; i < this.R; i++) {
      st[i] = "" + String.fromCharCode(CHARCODE_A_LC + i)
    }
    st[i++] = " "
    // 通过编码后的数组,解码
    let val = st[codes[0]]
    process.stdout.write(val)

    let j
    for (j = 1; j < codes.length; j++) {
      let s = st[codes[j]]
      process.stdout.write(s)
      if (i == codes[j]) {
        s = val + val.charAt(0)
      }
      if (i < 100) {
        st[i++] = val + s.charAt(0)
      }
      val = s
    }
  }
}

const lzw = new LZW(100)
// console.log(lzw.get_seq_code('A'))
debugger
// let arr = [0,1,17,0,2,0,3,27,29,28,34,0]
let arr = [
  19, 14, 1, 4, 14, 17,
  13, 14, 19, 27, 29, 31,
  36, 30, 32, 34
]
lzw.expand(arr)
// lzw.compress('ABRACADABRABRABRA')
// lzw.compress('TOBEORNOTTOBEORTOBEORNOT')
//               TOBEORNOTTOBEORTOBEORNOT
//               ABRACADABRABRABRA
// console.log(lzw)