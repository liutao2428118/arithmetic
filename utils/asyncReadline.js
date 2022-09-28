const fs = require('fs');
const readline  = require('readline');

class AsyncLine {
  constructor(url) {
    this.rl = readline.createInterface({input: fs.createReadStream(url)})
  }
  getLine = (() => {
    let _this = this
    const getLineGen = (async function* () {
      for await (const line of _this.rl) {
        yield line
      }
    })()
    return async () => ((await getLineGen.next()).value)
  })()
}

module.exports = AsyncLine


