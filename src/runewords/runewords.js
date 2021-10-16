import RunewordsController from "./runewordsController.js";
import { getRuneWords } from "../data/runeWords.js";
import RunewordsUI from "./runewordsUI.js";

const runewordsContainer = document.getElementById("runewords");
const runewordsUI = new RunewordsUI(runewordsContainer);
const runewordsController = new RunewordsController(
  runewordsUI,
  getRuneWords()
);

// Sort by minLevel by default
runewordsController.sortWordsBy("minLevelForRune");
