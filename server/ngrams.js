const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const readline = require("readline");

let results = {};
let avoid = {};
let start = new Date();
let lineReader = readline.createInterface({
  input: fs
    .createReadStream(path.resolve(__dirname, "a.gz"))
    .pipe(zlib.createGunzip())
});

let c = 0;
lineReader.on("line", line => {
  c++;
  process(line);
  if (c % 1000000 === 0) {
    console.log(c);
  }
});

lineReader.on("close", line => {
  console.log(new Date() - start);
  let logger = fs.createWriteStream(path.resolve(__dirname, "result.txt"));
  Object.keys(results).forEach(word => {
    logger.write(`${word},${results[word]}\r\n`);
  });
  logger.end();
});

const rx = /^([a-zA-Z]+)(\.\d*)?(_.*)?$/;
const minYear = 1970;
function process(line) {
  let word;
  let [wordline, year, count] = line.split("\t");
  if (parseInt(year) < minYear) {
    return;
  }
  let rxResult = rx.exec(wordline);
  if (rxResult != null) {
    word = rx.exec(wordline)[1];
  }
  if (word != null) {
    let lcword = word.toLowerCase();
    if (results[lcword] === undefined) {
      results[lcword] = parseInt(count);
    } else {
      results[lcword] = results[lcword] + parseInt(count);
    }
  }
}
