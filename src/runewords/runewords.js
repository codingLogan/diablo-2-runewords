import RunewordsController from "./runewordsController.js";
import { getItemTypes, getRuneWords } from "../data/runeWords.js";
import RunewordsUI from "./runewordsUI.js";

const runewordsContainer = document.getElementById("runewords");
const runewordsUI = new RunewordsUI(runewordsContainer);
const runewordsController = new RunewordsController(runewordsUI, {
  runewords: getRuneWords(),
  itemTypes: getItemTypes(),
});

// Sort by minLevel by default
runewordsController.sortWordsBy("minLevelForRune");
