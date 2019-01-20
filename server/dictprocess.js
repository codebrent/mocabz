const fs = require("fs");
const path = require("path");

var lineReader = require("readline").createInterface({
  input: fs.createReadStream(path.resolve(__dirname, "en_NZ.txt"))
});

var excludeReader = require("readline").createInterface({
  input: fs.createReadStream(path.resolve(__dirname, "exclude.lst"))
});

let excludeItems = [];
let excludeFileComplete = false;
let items = [];
let itemsComplete = false;

excludeReader.on("line", line => {
  excludeItems.unshift(line.toLowerCase());
});

excludeReader.on("close", () => {
  excludeFileComplete = true;
  bothDone();
});

lineReader.on("line", line => {
  if (
    /^[a-zA-Z]{3,7}$/.test(line) &&
    line.toUpperCase() != line &&
    line[0].toUpperCase() != line[0]
  ) {
    items.unshift(line.toLowerCase());
  }
});

lineReader.on("close", () => {
  itemsComplete = true;
  bothDone();
});

function bothDone() {
  if (excludeFileComplete && itemsComplete) {
    let s = items.length;
    let s2 = excludeItems.length;
    let t = new Set(
      items.filter(item => excludeItems.indexOf(item) == -1).sort()
    );
    const out = fs.createWriteStream(
      path.resolve(__dirname, "en_NZ_out.txt"),
      "utf8"
    );
    out.write(Array.from(t).join("\n"));
    out.end();
    console.log("stop");
  }
}
