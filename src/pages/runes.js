import runes from "../data/runes.js";

// Render all the runes
const runesSection = document.getElementById("runes");
runes.forEach((rune) => {
  const runeDiv = document.createElement("div");
  runeDiv.innerText = rune.name;
  runesSection.append(runeDiv);
});
