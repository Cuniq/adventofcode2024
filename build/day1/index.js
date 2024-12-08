import readInput, { numberComparator } from "../utils";
import { EOL } from "node:os";
const firstColumn = [];
const secondColumn = [];
const data = readInput(import.meta.dirname);
const lines = data.split(EOL);
lines.forEach(line => {
    const [first, second] = line.trim().split(/\s+/).map(Number);
    firstColumn.push(first);
    secondColumn.push(second);
});
const firstColumnSorted = firstColumn.sort(numberComparator);
const secondColumnSorted = secondColumn.sort(numberComparator);
if (firstColumn.length !== secondColumn.length) {
    throw new Error('wrong length kek');
}
let sum = 0;
for (let i = 0; i < firstColumn.length; i++) {
    sum += Math.abs(firstColumnSorted[i] - secondColumnSorted[i]);
}
console.log('Distance: ' + sum.toString());
const occurencies = {};
secondColumn.forEach(number => {
    if (Object.prototype.hasOwnProperty.call(occurencies, number)) {
        occurencies[number]++;
    }
    else {
        occurencies[number] = 0;
    }
});
let similarityScore = 0;
firstColumn.forEach(number => {
    similarityScore += number * occurencies[number];
});
console.log("Similarity score: " + similarityScore.toString());
//# sourceMappingURL=index.js.map