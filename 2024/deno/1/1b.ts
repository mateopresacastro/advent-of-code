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

const map = new Map<number, number>();

for (const key of columnOne) {
  const times = columnTwo.filter((colTwoNum) => colTwoNum === key).length;
  map.set(key, times);
}

const result = [...map].reduce((acc, [key, val]) => acc + key * val, 0);

console.log(result);
