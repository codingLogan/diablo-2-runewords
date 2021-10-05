import runes from "./data/runes.js";
import wordsOriginal from "./data/original-words.js";
import words110 from "./data/1.10-words.js";
import words110Ladder from "./data/1.10-ladder-words.js";
import words111 from "./data/1.11-words.js";

import calculateMinLevel from "./utilities/calculate-level.js";

console.log(runes);

const runewords = [
  ...wordsOriginal,
  ...words110,
  ...words110Ladder,
  ...words111,
].map((runeword) => ({
  ...runeword,
  minLevelForRune: calculateMinLevel(runeword.runeOrder),
}));

console.log(
  runewords.map((runeword) => ({
    name: runeword.name,
    minLevelForRune: runeword.minLevelForRune,
  }))
);

// Create a div per rune
const runesSection = document.getElementById("runes");
runes.forEach((rune) => {
  const runeDiv = document.createElement("div");
  runeDiv.innerText = rune.name;
  runesSection.append(runeDiv);
});

// Create a div per runeword
const runewordsSection = document.getElementById("runewords");
runewords.forEach((runeword) => {
  const runewordDiv = document.createElement("div");
  runewordDiv.innerText = runeword.name;
  runewordsSection.append(runewordDiv);
});
