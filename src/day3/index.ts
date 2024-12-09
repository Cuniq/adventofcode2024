import readInput from "../utils";

let data = readInput(import.meta.dirname);
const regexSolution = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
let match: RegExpExecArray | null;
let totalSum = 0;

while ((match = regexSolution.exec(data)) !== null) {
  const mulOperator = match[0];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  totalSum += mulOperator
    .trim()
    .match(/\d+/g)!
    .map(Number)
    .reduce((totalMul, a) => totalMul * a, 1);
}

console.log(`Total sum: ${totalSum.toString()}`);

// ----------------- Part 2

data = readInput(import.meta.dirname);
totalSum = 0;
let inDoBlock = true;
const isNumber = (c: string) => c >= "0" && c <= "9";

let i = 0;
while (i < data.length) {
  if (data[i] === "m") {
    //parsing a valid mul

    if (i + 3 < data.length && data[i + 1] === "u" && data[i + 2] === "l" && data[i + 3] === "(") {
      i += 4;
      let strNumber = "";

      //I need to see a number max 3 length
      while (isNumber(data[i]) && i < data.length) {
        strNumber += data[i++];
      }

      if (strNumber.length <= 0 || strNumber.length > 3) {
        continue;
      }

      const firstNumber = Number(strNumber);
      strNumber = "";

      if (data[i++] !== ",") {
        continue;
      }

      //I need to see a number max 3 length
      while (isNumber(data[i]) && i < data.length) {
        strNumber += data[i++];
      }

      if (strNumber.length <= 0 || strNumber.length > 3) {
        continue;
      }

      const secondNumber = Number(strNumber);
      strNumber = "";

      if (data[i] !== ")") {
        continue;
      }

      if (inDoBlock) {
        totalSum += secondNumber * firstNumber;
      }
    }
  }

  if (!inDoBlock && i + 3 < data.length && data[i] === "d" && data[i + 1] === "o" && data[i + 2] === "(" && data[i + 3] === ")") {
    i += 3;
    inDoBlock = true;
  }

  if (
    inDoBlock &&
    i + 6 < data.length &&
    data[i] === "d" &&
    data[i + 1] === "o" &&
    data[i + 2] === "n" &&
    data[i + 3] === "'" &&
    data[i + 4] === "t" &&
    data[i + 5] === "(" &&
    data[i + 6] === ")"
  ) {
    i += 6;
    inDoBlock = false;
  }

  i++;
}

console.log(`Total sum: ${totalSum.toString()}`);
