import RunewordsUI from "./runewordsUI.js";

/**
 * This controller handles the behavior and state for the UI
 *
 * This keeps most of the UI rendering logic out of the data
 * The only behavior the UI knows about are the action functions
 * that can be used from the UI interface
 */
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
        sockets: null, // Number
        itemType: null, // String
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
    this.ui.render(this.runewords, this.sortWordsBy.bind(this), {
      maxLevelFilter: this.maxLevelFilter.bind(this),
      filterBySocket: this.filterBySocket.bind(this),
      filterByItemType: this.filterByItemType.bind(this),
    });
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
      if (
        filters.maxLevel !== null &&
        word.minLevelForRune > filters.maxLevel
      ) {
        return true;
      }

      if (filters.sockets !== null && word.sockets !== filters.sockets) {
        return true;
      }

      if (filters.itemType !== null) {
        // Question: does the word have the type we want?
        // If not, filter it
        const hasFilteredType = word.itemType
          .split("/")
          .includes(filters.itemType);
        if (!hasFilteredType) {
          return true;
        }
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

  filterBySocket(numberOfSockets) {
    const newFilters = {
      ...this.filters,
      sockets: numberOfSockets,
    };

    const newRunewords = this.applyFilters(this.runewords, newFilters);

    this.setState({
      runewords: newRunewords,
      filters: newFilters,
    });
  }

  filterByItemType(itemType) {
    const newFilters = {
      ...this.filters,
      itemType: itemType,
    };

    const newRunewords = this.applyFilters(this.runewords, newFilters);

    this.setState({
      runewords: newRunewords,
      filters: newFilters,
    });
  }
}
