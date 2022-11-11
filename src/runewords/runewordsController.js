import { cleanItemType } from "../data/runeWords.js";
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
  constructor(runewordsUI, data) {
    const { runewords, itemTypes } = data;
    this.ui = runewordsUI;
    this.state = {
      runewords: this.addFilteringProps(runewords),
      itemTypes,
      filters: {
        maxLevel: null, // Number
        sockets: null, // Number
        itemType: null, // String
      },
    };

    this.renderUI();
  }

  get runewords() {
    return this.state.runewords || [];
  }

  get filters() {
    return this.state.filters || {};
  }

  get itemTypes() {
    return this.state.itemTypes || [];
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

  renderUI() {
    this.ui.render(this.state, this.sortWordsBy.bind(this), {
      maxLevelFilter: this.maxLevelFilter.bind(this),
      filterBySocket: this.filterBySocket.bind(this),
      filterByItemType: this.filterByItemType.bind(this),
    });
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.renderUI();
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
    });
  }

  // Logic for applying filters (determine new runewords state)
  applyFilters(runewords, filters) {
    const wordCheck = (word) => {
      if (filters.maxLevel !== null && word.level > filters.maxLevel) {
        return true;
      }

      if (filters.sockets !== null && word.sockets !== filters.sockets) {
        return true;
      }

      if (filters.itemType !== null) {
        // Question: does the word have the type we want?
        // If not, filter it
        const hasFilteredType = word.itemType
          .map((wordItemType) => cleanItemType(wordItemType))
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
    this.setFilters({
      ...this.filters,
      maxLevel: maxCharacterLevel,
    });
  }

  filterBySocket(numberOfSockets) {
    this.setFilters({
      ...this.filters,
      sockets: numberOfSockets,
    });
  }

  filterByItemType(itemType) {
    this.setFilters({
      ...this.filters,
      itemType: itemType,
    });
  }

  // When we set the filter we want to apply them too
  // 1. Create the Filter values
  // 2. Apply filter to get new runeword data
  // 3. Set State (filters and runewords)
  // 4. Trigger UI
  setFilters(filters) {
    const newRunewords = this.applyFilters(this.runewords, filters);

    this.setState({
      runewords: newRunewords,
      filters,
    });
  }
}
