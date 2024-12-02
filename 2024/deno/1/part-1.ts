const input = Deno.readTextFileSync("./input.txt");

const columnOne: number[] = [];
const columnTwo: number[] = [];

input
  .split("\n")
  .forEach((row) =>
    row
      .split("   ")
      .forEach((num, i) => (i === 0 ? columnOne : columnTwo).push(Number(num)))
  );

const sortedColOne = columnOne.toSorted();
const sortedColTwo = columnTwo.toSorted();
const resultArr: number[] = [];

for (const [i, num] of sortedColOne.entries()) {
  resultArr.push(Math.abs(sortedColTwo.at(i)! - num));
}

const result = resultArr.reduce((acc, num) => acc + num, 0);

console.log(result);
