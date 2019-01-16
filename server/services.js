import fs from "fs";
import path from "path";

export function wordfind(word) {
  const data = fs.readFileSync(path.resolve(__dirname, "twl06.txt"), "utf8");
  let allWords = data.split(/\r?\n/).filter(w => w.length < 7);
  let results = getWordCombinations(word, allWords);
  return ["three", "four", "five", "six"].reduce(
    (acc, number, idx) => ({
      ...acc,
      [number]: results[idx]
    }),
    {}
  );
}

function getWordCombinations(word, dictionary) {
  const wordsOfLength = [3, 4, 5, 6].map(n =>
    dictionary.filter(w => w.length == n)
  );
  return [3, 4, 5, 6].map((n, idx) =>
    getLetterCombinations(word, n).filter(
      c => wordsOfLength[idx].indexOf(c) != -1
    )
  );
}

function getCombinations(combinations) {
  if (!Array.isArray(combinations)) return [];
  const result = [];
  let wip = combinations || [];
  while (wip.length > 0) {
    let active = wip.pop();
    const c = active.shift();
    if (c != undefined) {
      result.push(c);
    }
    if (active.length > 0) {
      wip = wip.concat(active);
    }
  }
  return result.filter((w, idx) => result.indexOf(w) == idx);
}

function getLetterCombinations(word, length) {
  return getCombinations(expandCombinations(word)).filter(
    c => c.length == length
  );
}

function expandCombinations(word, prefix = "") {
  return [...word].map((t, idx) => [
    prefix + t,
    ...expandCombinations(removeLetter(word, idx), prefix + t)
  ]);
}

function removeLetter(word, idx) {
  return !word ? [] : [...word.slice(0, idx), ...word.slice(idx + 1)];
}
