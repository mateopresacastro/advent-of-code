import { TextLineStream } from "jsr:@std/streams@0.224.0/text-line-stream";

using f = await Deno.open("input.txt");
const lines = f.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

let safeReports = 0;

for await (const line of lines) {
    const parsedLine = parse(line);
    if (isSafe(parsedLine) || isSafeDampened(parsedLine)) {
        safeReports++;
    }
}

function isSafeDampened(line: number[]) {
    for (let i = 0; i < line.length; i++) {
        if (isSafe(line.toSpliced(i, 1))) return true;
    }

    return false;
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
