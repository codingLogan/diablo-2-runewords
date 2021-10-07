import wordsOriginal from "./original-words.js";
import words110 from "./1.10-words.js";
import words110Ladder from "./1.10-ladder-words.js";
import words111 from "./1.11-words.js";

import calculateMinLevel from "../utilities/calculate-level.js";

// Combine all runewords into onelist
export function getRuneWords() {
  return [...wordsOriginal, ...words110, ...words110Ladder, ...words111].map(
    (runeword) => ({
      ...runeword,
      minLevelForRune: calculateMinLevel(runeword.runeOrder),
    })
  );
}
