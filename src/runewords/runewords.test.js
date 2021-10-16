import RunewordsController from "./runewordsController.js";
import { getItemTypes, getRuneWords } from "../data/runeWords.js";
import { jest } from "@jest/globals";

const runewordsUI = {
  render: jest.fn(),
};

let runewordsController;

function runewordSortTest(runewords, sortProperty) {
  let i = 1;
  for (i = 1; i < runewords.length; i++) {
    expect(runewords[i - 1][sortProperty] <= runewords[i][sortProperty]).toBe(
      true
    );
  }
}

beforeEach(() => {
  runewordsController = new RunewordsController(runewordsUI, getRuneWords());
});

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

test("Runewords can be filtered by number of sockets", () => {
  // UI will probably be a radio of 1-6 as options
  const showSockets = 6;
  runewordsController.filterBySocket(showSockets);
  const runewords = runewordsController.runewords;

  let i = 0;
  for (i = 0; i < runewords.length; i++) {
    const word = runewords[i];
    if (word.sockets === showSockets) {
      expect(word.filtered).toBe(false);
    } else {
      expect(word.filtered).toBe(true);
    }
  }

  const filteredList = runewords.filter((word) => word.filtered === false);
  expect(filteredList.length).toBe(3);
});

test("App can show only sword runewords (filter by itemType)", () => {
  // UI will probably be a radio of 1-6 as options
  const filterValue = "Swords";
  runewordsController.filterByItemType(filterValue);
  const runewords = runewordsController.runewords;

  let i = 0;
  for (i = 0; i < runewords.length; i++) {
    const word = runewords[i];
    if (word.itemType.split("/").includes(filterValue)) {
      expect(word.filtered).toBe(false);
    } else {
      expect(word.filtered).toBe(true);
    }
  }

  const filteredList = runewords.filter((word) => word.filtered === false);
  expect(filteredList.length).toBe(12);
});

test("App can get a clean sorted list of all itemTypes", () => {
  const allTypes = getItemTypes();
  console.log("allTypes", allTypes);

  // Run real test
  expect(allTypes[0]).toBe("Axes");
  expect(allTypes[allTypes.length - 1]).toBe("Weapons");
});
