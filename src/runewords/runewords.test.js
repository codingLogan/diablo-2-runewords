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
  runewordSortTest([...runewordsController.runewords], "minLevelForRune");
});

test("Runewords get sorted by name", () => {
  runewordsController.sortWordsBy("name");
  runewordSortTest([...runewordsController.runewords], "name");
});

test("Runewords can be filtered by level", () => {
  const maxRuneLevel = 30;
  runewordsController.maxLevelFilter(maxRuneLevel);
  const runewords = [...runewordsController.runewords];

  let i = 0;
  for (i = 0; i < runewords.length; i++) {
    const word = runewords[i];
    if (word.minLevelForRune <= maxRuneLevel) {
      expect(word.filtered).toBe(false);
    } else {
      expect(word.filtered).toBe(true);
    }
  }

  const filteredList = runewords.filter((word) => word.filtered === false);
  expect(filteredList.length).toBe(19);
});
