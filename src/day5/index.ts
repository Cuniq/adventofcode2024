import assert from "node:assert";
import readInput from "../utils";
import { EOL } from "node:os";

const data = readInput(import.meta.dirname);
const lines = data.split(EOL);

let line = "";
let i = 0;
const occurencies: Record<string, Set<string> | undefined> = {};
while (lines[i]) {
  line = lines[i++];

  const [beforePage, afterPage] = line.trim().split("|").map(String);
  if (occurencies[beforePage]) {
    occurencies[beforePage].add(afterPage);
  } else {
    occurencies[beforePage] = new Set([afterPage]);
  }
}

i++; //Skip empty line

const wrongLines: string[] = [];
let sum = 0;
for (; i < lines.length; i++) {
  line = lines[i];
  const pages = line.split(",");
  assert.strictEqual(pages.length % 2, 1);

  let isLineOk = true;
  for (let j = 0; j < pages.length - 1; j++) {
    // No need to check last element

    const occurenciesForPage = occurencies[pages[j]];
    if (!occurenciesForPage || !isPageInCorrectOrder(j, pages, occurenciesForPage)) {
      isLineOk = false;
      break;
    }
  }

  if (isLineOk) {
    const middleElement = Math.floor(pages.length / 2);
    sum += Number(pages[middleElement]);
  } else {
    wrongLines.push(line);
  }
}

console.log(`Total of middle pages: ${sum.toString()}`);

//part 2
sum = 0;
for (line of wrongLines) {
  const pages = line.split(",");
  assert.strictEqual(pages.length % 2, 1);

  const middleElement = Math.floor(pages.length / 2);
  for (let j = 0; j < pages.length; j++) {
    const occurenciesForPage = occurencies[pages[j]];
    if (!occurenciesForPage) {
      continue;
    }

    if (getCorrectPageOrder(j, pages, occurenciesForPage) == middleElement) {
      sum += Number(pages[j]);
    }
  }
}

console.log(`Total of middle wrong pages: ${sum.toString()}`);

function isPageInCorrectOrder(currentIndex: number, pages: string[], occurenciesForPage: Set<string>) {
  for (let k = currentIndex + 1; k < pages.length; k++) {
    if (!occurenciesForPage.has(pages[k])) {
      return false;
    }
  }
  return true;
}

function getCorrectPageOrder(currentIndex: number, pages: string[], occurenciesForPage: Set<string>) {
  let position = 0;
  for (let k = 0; k < pages.length; k++) {
    if (k != currentIndex && occurenciesForPage.has(pages[k])) {
      position++;
    }
  }
  return position;
}
