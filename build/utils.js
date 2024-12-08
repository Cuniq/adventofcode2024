import fs from 'node:fs';
import path from 'node:path';
export default function readInput(dirname) {
    try {
        return fs.readFileSync(path.resolve(dirname, './input.txt'), 'utf8').trim();
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
export function numberComparator(a, b) {
    return a - b;
}
//# sourceMappingURL=utils.js.map