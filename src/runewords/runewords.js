import RunewordsController from "./runewordsController.js";
import { getRuneWords } from "../data/runeWords.js";
import RunewordsUI from "./runewordsUI.js";

const runewordsContainer = document.getElementById("runewords");
const runewordsUI = new RunewordsUI(runewordsContainer);
const runewordsController = new RunewordsController(
  runewordsUI,
  getRuneWords()
);

// Example actions the controller can use for the data
// runewordsController.sortWordsBy("name");
// console.log("\n\nBREAK\n\n");
// runewordsController.sortWordsBy("minLevelForRune");
