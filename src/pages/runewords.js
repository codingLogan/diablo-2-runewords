import { getRuneWords } from "../data/runeWords.js";
import { renderTableTo } from "../components/runewordContainer.js";
import runewordList from "../components/runewordList.js";

const runewords = getRuneWords();
console.log(runewords);
const runewordsSection = document.getElementById("runewords");

runewordsSection.appendChild(runewordList(runewords));

// Render the table of runewords
renderTableTo(runewordsSection, runewords);
