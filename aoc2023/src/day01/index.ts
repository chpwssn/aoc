import run from "aocrunner";
import { filter, identity, invert, join, map, pipe, replace, split, sum } from "ramda";
import { splitLines } from "../utils/index.js";

const numberLookup = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const numberWords = Object.keys(numberLookup);

const replaceSpelledWords = (line: string): string => {
  line = line.replace(/(?=one)/g, '1')
  line = line.replace(/(?=tw1?o)/g, '2')
  line = line.replace(/(?=three)/g, '3')
  line = line.replace(/(?=four)/g, '4')
  line = line.replace(/(?=five)/g, '5')
  line = line.replace(/(?=six)/g, '6')
  line = line.replace(/(?=seven)/g, '7')
  line = line.replace(/(?=e\d?igh2?3?t)/g, '8')
  line = line.replace(/(?=n\d?ine)/g, '9')
  return line

}

const findPart1Numbers = map(pipe(
  split(''),
  map(parseInt),
  filter((n: number) => !isNaN(n)),
))

const findPart2Numbers = map(pipe(
  replaceSpelledWords,
  split(''),
  map(parseInt),
  filter((n: number) => !isNaN(n)),
))

const calibrationValue = (ns: number[]) => ns[0] * 10 + ns.slice(-1)[0]

const parseInput = pipe(
  splitLines,
)

const part1 = (rawInput: string) => {
  const input = findPart1Numbers(parseInput(rawInput));
  const calibrationValues = map(calibrationValue, input)

  return sum(calibrationValues).toString();
};

const part2 = (rawInput: string) => {
  const input = findPart2Numbers(parseInput(rawInput));
  const calibrationValues = map(calibrationValue, input)

  return sum(calibrationValues).toString();
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: "142",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: "281",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
