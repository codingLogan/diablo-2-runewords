import RunewordsController from "./runewordsController.js";
import getItemTypes from "../utilities/getItemTypes.js";
import { jest } from "@jest/globals";
import { getAllWords } from "@diablo-tools/d2-runewords";

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
  const words = getAllWords();
  runewordsController = new RunewordsController(runewordsUI, {
    runewords: words,
    itemTypes: getItemTypes(words),
  });
});

test("Runewords get sorted by level", () => {
  runewordsController.sortWordsBy("level");
  runewordSortTest([...runewordsController.runewords], "level");
});

test("Runewords get sorted by name", () => {
  runewordsController.sortWordsBy("name");
  runewordSortTest([...runewordsController.runewords], "name");
});

test("Runewords can be filtered by number of sockets", () => {
  // UI will probably be a radio of 1-6 as options
  const showSockets = 6;
  runewordsController.filterBySocket(showSockets);
  const runewords = runewordsController.runewords;

  let i = 0;
  for (i = 0; i < runewords.length; i++) {
    const word = runewords[i];
    expect(word.sockets).toBe(6);
  }
});

test("App can show only sword runewords (filter by itemType)", () => {
  // UI will probably be a radio of 1-6 as options
  const filterValue = "Swords";
  runewordsController.filterByItemType(filterValue);
  const runewords = runewordsController.runewords;

  let i = 0;
  for (i = 0; i < runewords.length; i++) {
    const word = runewords[i];
    expect(word.itemType.includes(filterValue)).toBe(true);
  }
});

test("App can get a clean sorted list of all itemTypes", () => {
  const allTypes = getItemTypes(runewordsController.runewords);
  console.log("allTypes", allTypes);

  // Run real test
  expect(allTypes[0]).toBe("Axes");
  expect(allTypes[allTypes.length - 1]).toBe("Weapons");
});
