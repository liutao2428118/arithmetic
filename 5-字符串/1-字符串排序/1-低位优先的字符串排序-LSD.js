const plate = [
  '4PGC938',
  '2IYE230',
  '3CI0720',
  '1ICK750',
  '10HV845',
  '4JZY524',
  '1ICK750',
  '3CI0720',
  '10HV845',
  '10HV845',
  '2RLA629',
  '2RLA629',
  '3ATW723'
]

class LSD {
  constructor() {}
  static sort(a, W) {
    let N = a.length
    let R = 42
    let aux = new Array(N)
    let count = new Array(R+1).fill(0)
    for(let d = W-1; d >= 0; d--) {
      // 统计出现频率
      for(let i = 0; i < N; i++) {
        count[a[i].charCodeAt(d) - 48 + 1]++
      }
      // 将频率转换为起始索引
      for(let r = 0; r < R; r++) {
        count[r+1] += count[r]
      }
      // 将数据分类
      for(let y = 0; y < N; y++) {
        aux[count[a[y].charCodeAt(d) - 48]++] = a[y]
      }
      // 回写
      for(let j = 0; j < N; j++) {
        a[j] = aux[j]
      }
      count.fill(0)
    }
  }
}

debugger
LSD.sort(plate, 7)
console.log(plate)

// const testArr = ['abc', 'abd', 'dbc', 'wdx', 'yex', 'nds', 'wed', 'dqs'];
 
// lowFirstSort(testArr);
// console.log(testArr)
 
// function lowFirstSort(stringArray) {
//     /**
//      * 字符串数组长度
//      */
//     const arrLength = stringArray.length;
//     /**
//      * 字符表(a-z)长
//      */
//     const charLength = 26;
//     /**
//      * 排序的字符串数组的字符串长度
//      */
//     const wordLength = stringArray[0].length;
//     /**
//      * 辅助数组
//      */
//     const busArr = new Array(arrLength)
//     /**
//      * 创建键索引计数数组
//      */
//     const assistenArr = new Array(charLength + 1).fill(0);
    
//     // 从低位开始
//     for (let i = wordLength - 1; i >=0 ; i--) {
//         /**
//          * 开始键计数  如：数组第一个元素是'abc'， 元素的最后一个字符是'c'， 则
//          * assistenArr数组的索引3的位置加一  ->   assistenArr[3]++
//          * [ 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0 ]
//          * [ 0, 0, a, b, c, d, e, f, g, h, i.... ]
//          * 如上就说明有3个a，1个d....
//          */
//         for (let j = 0; j < arrLength; j++) {
//           console.log(stringArray[j].charCodeAt(i))
//             assistenArr[stringArray[j].charCodeAt(i) - 97 + 1]++
//         }
//         /**
//          * 累计计数   如：[0, 1, 0, 0, 2, 1, 0]  -->  [0, 1, 1, 1, 3, 4, 4]
//          * 把键计数转换为索引
//          */
//         for (let j = 0; j < charLength; j++) {
//             assistenArr[j + 1] += assistenArr[j]
//         }
//         /**
//          * 开始排序
//          */
//         for (let j = 0; j < arrLength; j++) {
//             busArr[assistenArr[stringArray[j].charCodeAt(i) - 97]++] = stringArray[j];
//         }
//         /**
//          * 复制回原数组stringArray
//          */
//         for (let j = 0; j < arrLength; j++) {
//             stringArray[j] = busArr[j];
//         }
//         /**
//          * 清空键索引计数数组， 留以下个循环使用
//          */
//         assistenArr.fill(0);
//     }
// }