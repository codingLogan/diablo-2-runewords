export default class RunewordsUI {
  constructor(attachToElement) {
    this.container = attachToElement;
  }

  // Helper to create each runeword Item
  runewordItem({
    name,
    minLevelForRune,
    sockets,
    itemType,
    runeOrder,
    effects,
  }) {
    const item = document.createElement("li");

    const itemHeader = document.createElement("div");
    itemHeader.classList.add("header-block");

    const toggleHidden = (event) => {
      event.currentTarget.nextSibling.hidden =
        !event.currentTarget.nextSibling.hidden;
    };
    itemHeader.onclick = toggleHidden;
    item.appendChild(itemHeader);

    // Title Container
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("flex-apart");
    itemHeader.appendChild(titleDiv);

    // Title Row
    const titleLeft = document.createElement("h3");
    titleLeft.innerText = name;
    titleDiv.appendChild(titleLeft);

    const titleRight = document.createElement("span");
    titleRight.innerText = `Level ${minLevelForRune}`;
    titleDiv.appendChild(titleRight);

    // Subtitle Row
    const subtitleDiv = document.createElement("div");
    subtitleDiv.classList.add("flex-apart");
    itemHeader.appendChild(subtitleDiv);

    const subtitleLeft = document.createElement("span");
    subtitleLeft.innerText = `(${sockets}) ${runeOrder}`;
    subtitleDiv.appendChild(subtitleLeft);

    const subtitleRight = document.createElement("span");
    subtitleRight.innerText = itemType;
    subtitleDiv.appendChild(subtitleRight);

    // List of Effects
    const effectList = document.createElement("ul");
    effectList.classList.add("runeword-effects");
    effectList.hidden = true;

    effects.forEach((effect) => {
      const effectItem = document.createElement("li");
      effectItem.innerText = effect;
      effectList.appendChild(effectItem);
    });

    item.appendChild(effectList);

    return item;
  }

  // Simple helper to create the whole list
  runewordList(runewords) {
    const list = document.createElement("ul");

    runewords.forEach((word) => {
      if (word.filtered === false) {
        list.appendChild(this.runewordItem(word));
      }
    });

    return list;
  }

  createActionButton(text, onClick) {
    const actionButton = document.createElement("button");
    actionButton.innerText = text;
    actionButton.onclick = onClick;
    return actionButton;
  }

  // Runeword action bar
  /**
   *
   * @param {Object} actionMap {name: functionToTrigger}
   */
  runewordActions(sortAction, filters) {
    const { maxLevelFilter, filterBySocket } = filters;
    const actionDiv = document.createElement("div");
    actionDiv.id = "runeword-actions";

    const buttons = [
      this.createActionButton("Name", () => sortAction("name")),
      this.createActionButton("Level", () => sortAction("minLevelForRune")),
      this.createActionButton("Level 30", () => maxLevelFilter(30)),
      this.createActionButton("All Sockets", () => filterBySocket(null)),
      this.createActionButton("Show 2 Sockets", () => filterBySocket(2)),
      this.createActionButton("Show 3 Sockets", () => filterBySocket(3)),
      this.createActionButton("Show 4 Sockets", () => filterBySocket(4)),
      this.createActionButton("Show 5 Sockets", () => filterBySocket(5)),
      this.createActionButton("Show 6 Sockets", () => filterBySocket(6)),
    ];

    buttons.forEach((button) => {
      actionDiv.appendChild(button);
    });

    return actionDiv;
  }

  clearUI(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  render(runewords, sortAction, filters) {
    this.clearUI(this.container);
    this.container.appendChild(this.runewordActions(sortAction, filters));
    this.container.appendChild(this.runewordList(runewords));
  }
}
