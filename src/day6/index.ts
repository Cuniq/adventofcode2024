import readInput from "../utils";
import { EOL } from "node:os";

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const data = readInput(import.meta.dirname);
const lines = data.split(EOL);

const horizontalObstacles: Record<number, Set<number> | undefined> = {};
const verticalObstacles: Record<number, Set<number>> = {};
let position: [number, number] = [-1, -1];
const direction = Direction.Up;

lines.forEach((line, row) => {
  const indexes = [...line.matchAll(/#/g)].map((a) => a.index);
  horizontalObstacles[row] = new Set(indexes);
  for (const index of indexes) {
    if (verticalObstacles[index]) {
      verticalObstacles[index].add(row);
    } else {
      verticalObstacles[index] = new Set([row]);
    }
  }

  const yStartingPos = line.search(/\^/);
  if (yStartingPos >= 0) {
    console.log(yStartingPos);
    position = [row, yStartingPos];
  }
});

console.log(horizontalObstacles);
console.log(verticalObstacles);
console.log(position);
