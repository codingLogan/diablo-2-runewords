import RunewordsController from "./runewordsController.js";
import { getItemTypes } from "../data/runeWords.js";
import RunewordsUI from "./runewordsUI.js";
import { getAllWords } from "@diablo-tools/d2-runewords";

const runewordsContainer = document.getElementById("runewords");
const runewordsUI = new RunewordsUI(runewordsContainer);
const runewordsController = new RunewordsController(runewordsUI, {
  runewords: getAllWords(),
  itemTypes: getItemTypes(), // TODO: get types from words
});

// Sort by minLevel by default
runewordsController.sortWordsBy("level");
