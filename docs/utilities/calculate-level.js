import runes from "../data/runes.js";

export default function calculateMinLevel(runesString) {
  // Ral + Ort + Tal
  // Split them apart
  // Search the rune list for each of them
  // Get the max level

  const runeParts = runesString.split(" + ");
  let maxRune = 0;
  runeParts.forEach((runeString) => {
    const rune = runes.find((rune) => rune.name === runeString);

    if (rune && rune.level > maxRune) {
      maxRune = rune.level;
    }
  });

  return maxRune;
}
