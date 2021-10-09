import RunewordsUI from "./runewordsUI.js";

export default class RunewordsController {
  /**
   *
   * @param {RunewordsUI} runewordsUI
   * @param {Array} runewords
   */
  constructor(runewordsUI, runewords) {
    this.ui = runewordsUI;
    this.state = runewords;
    this.ui.render(this.state);
  }

  setState(runewords) {
    // Call any functions that rely on state
    // Rendering the UI for example
    runewords.forEach(({ name, minLevelForRune }) => {
      console.log(name, minLevelForRune);
    });

    this.state = runewords;

    this.ui.render(this.state);
  }

  sortWordsBy(propertyName) {
    const currentRunewords = this.state.slice();
    currentRunewords.sort((a, b) => {
      if (a[propertyName] === b[propertyName]) {
        return 0;
      }

      return a[propertyName] < b[propertyName] ? -1 : 1;
    });

    this.setState([...currentRunewords]);
  }
}
