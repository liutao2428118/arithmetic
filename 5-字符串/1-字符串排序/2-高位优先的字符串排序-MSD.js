const { Insertion } = require('../../2-排序/2-插入排序')
let insertion = new Insertion()

let a = [
  'she',
  'sells',
  'seashells',
  'by',
  'the',
  'seashore',
  'the',
  'shells',
  'she',
  'sells',
  'are',
  'surely',
  'seashells'
]
class MSD {
  constructor() {
    this.R = 26
    this.M = 15
    this.aux = null
  }
  charAt(s, d) {
    if(d < s.length) return s.charCodeAt(d) - 97
    else return -1
  }
  sort(a) {
    let N = a.length
    this.aux = new Array(N)
    this._sort(a, 0, N-1, 0)
  }
  _sort(a, lo, hi, d) {
    if(lo >= hi) {
      // insertion.sort(a, lo, hi, d) 
      return
    }
    let count = new Array(this.R + 2).fill(0)
    for(let i = lo; i <= hi; i++) {
      count[this.charAt(a[i], d) + 2 ]++
    }
    for(let r = 0; r < this.R+1; r++) {
      count[r+1] += count[r]
    }
    for(let i = lo; i <= hi; i++) {
      this.aux[count[this.charAt(a[i], d) + 1]++] = a[i]
    }
    for(let i = lo; i <= hi; i++) {
      a[i] = this.aux[i - lo]
    }
    for(let r = 0; r < this.R-1; r++) {
      this._sort(a, lo + count[r], lo + count[r+1] - 1, d+1)
    }
  }
}

let s = new MSD()
debugger
s.sort(a)
console.log(a)

// const testArr2 = ['wdxsexg', 'yex', 'nadsas', 'waaeed', 'dqsf', 'abc', 'abcde', 'abcab'];
 
// highFirstSort(a);
// console.log(a)
// function highFirstSort(stringArray) {
//     /**
//      * 字符串数组长度
//      */
//     const arrLength = stringArray.length;
//     /**
//      * 字符表(a-z)长
//      */
//     const charLength = 26;
//     /**
//      * 辅助数组
//      */
//     const busArr = new Array(testArr2.length)
//     /**
//      * 递归开始
//      */
//     sort(stringArray, 0, arrLength-1, 0, busArr, charLength);
// }
// /**
//  * 重写的charCodeAt方法
//  * @param _string 字符串
//  * @param position 位置
//  */
// function charCodeAtMy(_string, position) {
//     return _string.length > position ? _string.charCodeAt(position) - 97 : -1;
// }
 
// function sort(array, low, high, position, busArr, charLength){
//     if (low >= high) {
//         return;
//     }
//     /**
//      * 创建键索引计数数组
//      */
//     const assistenArr = new Array(charLength + 2).fill(0);
//     /**
//      * 开始键计数
//      * [ 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0 ]
//      * [ 0, 0, a, b, c, d, e, f, g, h, i.... ]
//      * 如上就说明有3个a，1个d....
//      */
//     for (let i = low; i <= high; i++) {
//         assistenArr[charCodeAtMy(array[i], position) + 2]++;
//     }
//     /**
//      * 累计计数   如：[0, 1, 0, 0, 2, 1, 0]  -->  [0, 1, 1, 1, 3, 4, 4]
//      * 把键计数转换为索引
//      */
//     for (let j = 0; j < charLength + 1; j++) {
//         assistenArr[j + 1] += assistenArr[j];
//     }
//     /**
//      * 开始排序
//      */
//     for (let j = low; j <= high; j++) {
//         busArr[assistenArr[charCodeAtMy(array[j], position) + 1]++] = array[j];
//     }
//     /**
//      * 复制回原数组stringArray
//      */
//     for (let j = 0; j <= high-low; j++) {
//         array[low + j] = busArr[j];
//     }
//     /**
//      * 递归调用， 如: 'ac' 'ab'这样的高位相同的，在assistenArr数组中的体现就是
//      * arr[n+1] - 1 > arr[n]: 这就说明这里存在着相同的字符， 有两个a
//      * low + assistenArr[i] < low + assistenArr[i + 1] - 1 
//      * 所以还要以第二个字符进行键索引计数排序
//      */
//     for (let i = 0; i < charLength - 1; i++) {
//         sort(array, low + assistenArr[i], low + assistenArr[i + 1] - 1, position + 1, busArr, charLength)
//     }
// }