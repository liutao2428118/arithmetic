// var fs = require('fs')
function compress(s) {
  let cnt = 0;
  let a = []
  let b, old = 0
  for(let i = 0; i < s.length; i++) {
    b = s[i]
    if(b != old) {
      a.push(cnt)
      cnt = 0
      old = old == 0 ? 1 : 0
    }else {
      if(cnt == 255) {
        a.push(cnt)
        cnt = 0
        a.push(cnt)
      }
    }
    cnt++
  }
  a.push(cnt)
  return a
}

let s = '0000000000000001111111000000011111111111'
debugger
let t = compress(s)
for(let i = 0; i < t.length; i++) {
  t[i] = (t[i]).toString(2)
}


console.log("--------------",t.join(''))


// function readBinary(filename, callback) {
//   var rstream = fs.createReadStream(filename);
//   var chunks = [];
//   var size = 0;
//   rstream.on('readable', function () {
//     var chunk = rstream.read();
//     console.log("----------------",chunk)
//     if (chunk != null) {
//       chunks.push(chunk);
//       size += chunk.length;
//     }
//   });
//   rstream.on('end', function () {
//     callback(null, Buffer.concat(chunks, size));
//   });
//   rstream.on('error', function (err) {
//     callback(err, null);
//   });

// }

// readBinary('./4runs.bin', function(e, b) {
//   console.log(b)
// })

// let b = Buffer.from('ATAGATGCATAGCGCATAGCTAGATGTGCTAGC')
// console.log(b)