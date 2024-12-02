import readLines from "../read-lines.ts";

const path = `${import.meta.dirname}/input.txt`
using file = await Deno.open(path)
const lines = readLines(file)

let safeReports = 0;

for await (const line of lines) {
    const parsedLine = parse(line);
    if (isSafe(parsedLine)) safeReports++;
}

console.log(safeReports);

function parse(line: string) {
    return line.split(" ").map(Number);
}

function isSafe(line: number[]) {
    if (line.length <= 1) return false;
    const set = new Set(line);
    if (set.size !== line.length) return false;
    const sorted = line.toSorted((a, b) => b - a);
    const sortedStr = sorted.join("");
    const revStr = sorted.toReversed().join("");
    const lineStr = line.join("");
    if (lineStr !== sortedStr && lineStr !== revStr) return false;
    for (let i = 1; i < line.length; i++) {
        if (Math.abs(line.at(i)! - line.at(i - 1)!) > 3) return false;
    }

    return true;
}
