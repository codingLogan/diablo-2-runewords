import { getRuneWords } from "../data/runeWords.js";
import { renderTableTo } from "../components/runewordTable.js";

const runewords = getRuneWords();
const runewordsSection = document.getElementById("runewords");

// Render the table of runewords
renderTableTo(runewordsSection, runewords);
