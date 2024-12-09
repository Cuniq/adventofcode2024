import readInput from "../utils";
import { EOL } from "node:os";

const data = readInput(import.meta.dirname);
const lines = data.split(EOL);

const searchTerm = "XMAS";
const searchTermReversed = "SAMX";
const searchTermLength = searchTerm.length;
const regexReversedTerm = /SAMX/g;
const regexTerm = /XMAS/g;

let sum = 0;

// count vertical
lines.forEach((line) => (sum += line.match(regexTerm)?.length ?? 0));
lines.forEach((line) => (sum += line.match(regexReversedTerm)?.length ?? 0));

//count horizontal
for (let i = 0; i <= lines.length - searchTermLength; i++) {
  let term = "";
  for (let j = 0; j < lines[i].length; j++) {
    term = "";
    for (let k = 0; k < searchTermLength; k++) {
      term += lines[i + k][j];
    }

    if (term === searchTerm || term === searchTermReversed) {
      sum += 1;
    }
  }
}

// count forward diagonial
for (let i = 0; i <= lines.length - searchTermLength; i++) {
  let term = "";
  for (let j = 0; j <= lines[i].length - searchTermLength; j++) {
    term = "";
    for (let k = 0; k < searchTermLength; k++) {
      term += lines[i + k][j + k];
    }

    if (term === searchTerm || term === searchTermReversed) {
      sum += 1;
    }
  }
}

// count forward diagonial reversed
for (let i = 0; i <= lines.length - searchTermLength; i++) {
  let term = "";
  for (let j = lines[i].length - 1; j >= searchTermLength - 1; j--) {
    term = "";
    for (let k = 0; k < searchTermLength; k++) {
      term += lines[i + k][j - k];
    }

    if (term === searchTerm || term === searchTermReversed) {
      sum += 1;
    }
  }
}

console.log(`Total: ${sum.toString()}`);

// PART 2
const part2Term = "MAS";
const part2TermReversed = "SAM";
const part2TermLength = part2Term.length;
const computerLength = part2TermLength - 1;
sum = 0;

for (let i = 0; i <= lines.length - part2TermLength; i++) {
  let term1 = "";
  let term2 = "";
  for (let j = 0; j <= lines[i].length - part2TermLength; j++) {
    term1 = "";
    term2 = "";
    for (let k = 0; k < part2TermLength; k++) {
      term1 += lines[i + k][j + k];
      term2 += lines[i + k][j + (computerLength - k)];
    }

    if ((term1 === part2Term || term1 === part2TermReversed) && (term2 === part2Term || term2 === part2TermReversed)) {
      sum += 1;
    }
  }
}

console.log(`Part2 total: ${sum.toString()}`);
