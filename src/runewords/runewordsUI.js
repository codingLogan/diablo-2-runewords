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
   * @param {Array} actions [{action: function, actionValue: string, text: string}]
   * @param {string} headerText creates a heaver for the actions
   */
  runewordActions(actions, headerText = "") {
    // Build a header for the filters
    const actionHeader = document.createElement("h4");
    actionHeader.innerText = headerText;

    const actionSection = document.createElement("div");
    actionSection.appendChild(actionHeader);

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("runeword-actions");
    actionSection.appendChild(actionDiv);

    const buttons = actions.map(({ action, actionValue, text }) =>
      this.createActionButton(text, () => action(actionValue))
    );

    buttons.forEach((button) => {
      actionDiv.appendChild(button);
    });

    return actionSection;
  }

  clearUI(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  render(runewords, sortAction, filters) {
    const { maxLevelFilter, filterBySocket, filterByItemType } = filters;

    this.clearUI(this.container);
    // Build sortable actions
    this.container.appendChild(
      this.runewordActions(
        [
          {
            action: sortAction,
            actionValue: "name",
            text: "Name",
          },
          {
            action: sortAction,
            actionValue: "minLevelForRune",
            text: "Min Level Required",
          },
        ],
        "Sort By..."
      )
    );

    // Build Socket Filter Actions
    const socketNumbers = [2, 3, 4, 5, 6];
    const socketActions = socketNumbers.map((numberOfSockets) => ({
      action: filterBySocket,
      actionValue: numberOfSockets,
      text: numberOfSockets,
    }));
    socketActions.push({
      action: filterBySocket,
      actionValue: null,
      text: "All",
    });
    this.container.appendChild(
      this.runewordActions(socketActions, "Number of Sockets")
    );

    // Build Item Type Filter Actions
    const itemTypes = ["Swords", "Shields"];
    const typeActions = itemTypes.map((itemType) => ({
      action: filterByItemType,
      actionValue: itemType,
      text: itemType,
    }));
    typeActions.push({
      action: filterByItemType,
      actionValue: null,
      text: "All",
    });
    this.container.appendChild(this.runewordActions(typeActions, "Item Type"));

    // Show the list
    this.container.appendChild(this.runewordList(runewords));
  }
}
