import readInput from "../utils";
import { EOL } from "node:os";

const data = readInput(import.meta.dirname);
const lines = data.split(EOL);

let safeReports = 0;

function isSorted(report: number[], allowRemoval: boolean): boolean {
  if (report.length <= 1) {
    return false;
  }
  const isDescending = report[0] > report[1];

  for (let i = 1; i < report.length; i++) {
    const element = report[i];
    const isElementSorted =
      (isDescending ? report[i - 1] > element : report[i - 1] < element) &&
      Math.abs(report[i - 1] - element) >= 1 &&
      Math.abs(report[i - 1] - element) <= 3;

    if (!isElementSorted && !allowRemoval) {
      return false;
    } else if (!isElementSorted) {
      return (
        isSorted([...report.slice(0, i), ...report.slice(i + 1)], false) || isSorted([...report.slice(0, i - 1), ...report.slice(i)], false)
      );
    }
  }

  return true;
}

lines.forEach((line) => {
  const report = line.trim().split(/\s+/).map(Number);
  if (isSorted(report, true)) {
    safeReports++;
  }
});

console.log("Total safe reports: " + safeReports.toString());
