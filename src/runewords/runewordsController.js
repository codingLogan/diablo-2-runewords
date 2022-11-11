import RunewordsUI from "./runewordsUI.js";
import { filterWords } from "@diablo-tools/d2-runewords";

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
    this.allRunewords = [...runewords];
    this.ui = runewordsUI;
    this.state = {
      runewords: [...runewords], // Copy the raw runeword data to start
      itemTypes,
      filters: {
        itemType: [], // Only Helms
        sockets: [], // Only 2 or 3 sockets
        games: [], // All games
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
    return filterWords(runewords, filters);
  }

  maxLevelFilter(maxCharacterLevel) {
    this.setFilters({
      ...this.filters,
      maxLevel: maxCharacterLevel,
    });
  }

  filterBySocket(numberOfSockets) {
    // Toggle the selected value in the filter
    const index = this.filters.sockets.indexOf(numberOfSockets);
    if (index !== -1) {
      this.filters.sockets.splice(index, 1);
    } else {
      this.filters.sockets.push(numberOfSockets);
    }

    this.setFilters({
      ...this.filters,
    });
  }

  filterByItemType(itemType) {
    // Toggle the selected value in the filter
    const index = this.filters.itemType.indexOf(itemType);
    if (index !== -1) {
      this.filters.itemType.splice(index, 1);
    } else {
      this.filters.itemType.push(itemType);
    }

    this.setFilters({
      ...this.filters,
    });
  }

  // When we set the filter we want to apply them too
  // 1. Create the Filter values
  // 2. Apply filter to get new runeword data
  // 3. Set State (filters and runewords)
  // 4. Trigger UI
  setFilters(filters) {
    const newRunewords = this.applyFilters(this.allRunewords, filters);

    this.setState({
      runewords: newRunewords,
      filters,
    });
  }
}
