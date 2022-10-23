import wordsOriginal from "./original-words.js";
import words110 from "./1.10-words.js";
import words110Ladder from "./1.10-ladder-words.js";
import words111 from "./1.11-words.js";
import d2r24 from "./d2r-2.4-words.js";

import calculateMinLevel from "../utilities/calculate-level.js";

// Combine all runewords into onelist
export function getRuneWords() {
  return [...wordsOriginal, ...words110, ...words110Ladder, ...words111, d2r24].map(
    (runeword) => ({
      ...runeword,
      minLevelForRune: calculateMinLevel(runeword.runeOrder),
    })
  );
}

export function cleanItemType(type) {
  switch (type) {
    case "Maces":
    case "Maces*":
      return "Maces";
    case "Staves":
    case "Staves (Not Orbs)":
    case "Staves* (Not Orbs)":
      return "Staves (Not Orbs)";
    default:
      return type;
  }
}

export function getItemTypes() {
  const itemTypes = {};
  getRuneWords().forEach((word) => {
    word.itemType.split("/").forEach((type) => {
      const cleanType = cleanItemType(type);

      if (typeof itemTypes[cleanType] === "undefined") {
        itemTypes[cleanType] = 0;
      }

      itemTypes[cleanType]++;
    });
  });

  const itemTypesArray = Object.keys(itemTypes).sort();
  return itemTypesArray;
}
