import RunewordsController from "./runewordsController.js";
import getItemTypes from "../utilities/getItemTypes.js";
import RunewordsUI from "./runewordsUI.js";
import { getAllWords } from "@diablo-tools/d2-runewords";

const runewordsContainer = document.getElementById("runewords");
const runewordsUI = new RunewordsUI(runewordsContainer);

const words = getAllWords();
const runewordsController = new RunewordsController(runewordsUI, {
  runewords: getAllWords(),
  itemTypes: getItemTypes(words), // TODO: get types from words
});

// Sort by minLevel by default
runewordsController.sortWordsBy("level");
