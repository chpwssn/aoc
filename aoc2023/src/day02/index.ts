import run from "aocrunner";
import { identity, map, pipe } from "ramda";
import { splitLines, splitWords, parseWordsFactory } from '../utils/index.js';

const parseInput = pipe(
  splitLines,
  map(splitWords),
  map(parseWordsFactory(identity))
)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
