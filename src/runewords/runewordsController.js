import RunewordsUI from "./runewordsUI.js";

export default class RunewordsController {
  /**
   *
   * @param {RunewordsUI} runewordsUI
   * @param {Array} runewords
   */
  constructor(runewordsUI, runewords) {
    this.ui = runewordsUI;
    this.setState({
      runewords: this.addFilteringProps(runewords),
      filters: {
        maxLevel: null, // Number
      },
    });
  }

  get runewords() {
    return this.state.runewords || [];
  }

  get filters() {
    return this.state.filters || {};
  }

  /**
   *
   * @param {Array} runewords
   */
  addFilteringProps(runewords) {
    return runewords.map((word) => ({
      ...word,
      filtered: false,
    }));
  }

  setState(newState) {
    this.state = newState;
    this.ui.render(this.runewords, this.sortWordsBy.bind(this));
  }

  sortWordsBy(propertyName) {
    const currentRunewords = this.runewords.slice();
    currentRunewords.sort((a, b) => {
      if (a[propertyName] === b[propertyName]) {
        return 0;
      }

      return a[propertyName] < b[propertyName] ? -1 : 1;
    });

    this.setState({
      runewords: [...currentRunewords],
      filters: this.filters,
    });
  }

  // Logic for applying filters (determine new runewords state)
  applyFilters(runewords, filters) {
    const wordCheck = (word) => {
      if (word.minLevelForRune > filters.maxLevel) {
        return true;
      }

      return false;
    };

    // Loop through each runeword and determine if it should be filtered or not
    const newRunewords = runewords.map((word) => ({
      ...word,
      filtered: wordCheck(word),
    }));

    return newRunewords;
  }

  maxLevelFilter(maxCharacterLevel) {
    // Filters is an object
    // Set filters: maxLevel to the passed in value
    const newFilters = {
      ...this.filters,
      maxLevel: maxCharacterLevel,
    };

    const newRunewords = this.applyFilters(this.runewords, newFilters);

    this.setState({
      runewords: newRunewords,
      fiters: newFilters,
    });
  }
}
