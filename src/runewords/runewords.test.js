import RunewordsController from "./runewordsController.js";
import { getRuneWords } from "../data/runeWords.js";
import { jest } from "@jest/globals";

const runewordsUI = {
  render: jest.fn(),
};

const runewordsController = new RunewordsController(
  runewordsUI,
  getRuneWords()
);

function runewordSortTest(runewords, sortProperty) {
  let i = 1;
  for (i = 1; i < runewords.length; i++) {
    expect(runewords[i - 1][sortProperty] <= runewords[i][sortProperty]).toBe(
      true
    );
  }
}

test("Runewords get sorted by minLevelForRune", () => {
  runewordsController.sortWordsBy("minLevelForRune");
  const runewords = runewordsController.state;

  runewordSortTest([...runewords], "minLevelForRune");
});

test("Runewords get sorted by name", () => {
  runewordsController.sortWordsBy("name");
  runewordSortTest([...runewordsController.state], "name");
});
