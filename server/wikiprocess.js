const fs = require("fs");
const path = require("path");
const bz2 = require("unbzip2-stream");
const sax = require("sax");
const readline = require("readline");

let start = new Date();
const saxStream = sax.createStream(false, { lowercase: true, normalize: true });
let c = 0;
let tagPath = {};
let currentTag = tagPath;
saxStream.on("opentag", node => {
  const { name, attributes } = node;
  if (currentTag[name] === undefined) {
    currentTag[name] = { __parent: currentTag, __isList: false };
  } else {
    currentTag[name].__isList = true;
  }
  currentTag = currentTag[name];
});
saxStream.on("closetag", node => {
  currentTag = currentTag.__parent;
});
saxStream.on("text", text => {
  if (!isWhiteSpace(text)) {
  }
});

saxStream.on("end", function(node) {
  let a = tagPath;
  console.log(new Date() - start);
});

function isWhiteSpace(text) {
  let test = text == null ? "" : text;
  return text.trim() == "";
}

const filename = "vepwiki-20190101-pages-articles.xml.bz2";
//const filename = 'enwiktionary-20190101-pages-articles.xml.bz2';
fs.createReadStream(path.resolve(__dirname, filename))
  .pipe(bz2())
  .pipe(saxStream);

// let c = 0;
// lineReader.on('line', (line) => {
//     c++;
//     //process(line);
//     if (c % 1000000 === 0){
//         console.log(c);
//     }
// });

// lineReader.on('close', (line) => {

//     console.log(new Date() - start);
//     // let logger = fs.createWriteStream(path.resolve(__dirname, 'wikicheck.txt'));
//     // Object.keys(results).forEach(word => {
//     //     logger.write(`${word},${results[word]}\r\n`);
//     // });
//     // logger.end();
// });

// console.log(filename);
