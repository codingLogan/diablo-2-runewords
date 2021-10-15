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
   */
  runewordActions(actions) {
    // const { maxLevelFilter, filterBySocket, filterByItemType } = filters;
    const actionDiv = document.createElement("div");
    actionDiv.classList.add("runeword-actions");

    // const actions = [
    //   {
    //     action: sortAction,
    //     actionValue: "name",
    //     text: "Name",
    //   },
    // ];

    const buttons = actions.map(({ action, actionValue, text }) =>
      this.createActionButton(text, () => action(actionValue))
    );

    // const buttons = [
    //   // Sorting Buttons
    //   this.createActionButton("Name", () => sortAction("name")),
    //   this.createActionButton("Level", () => sortAction("minLevelForRune")),
    //   // Level Filterint
    //   this.createActionButton("Level 30", () => maxLevelFilter(30)),
    //   // Socket Filtering
    //   this.createActionButton("All Sockets", () => filterBySocket(null)),
    //   this.createActionButton("Show 2 Sockets", () => filterBySocket(2)),
    //   this.createActionButton("Show 3 Sockets", () => filterBySocket(3)),
    //   this.createActionButton("Show 4 Sockets", () => filterBySocket(4)),
    //   this.createActionButton("Show 5 Sockets", () => filterBySocket(5)),
    //   this.createActionButton("Show 6 Sockets", () => filterBySocket(6)),
    //   // Type Filtering
    //   this.createActionButton("Swords", () => filterByItemType("Swords")),
    //   this.createActionButton("Sheilds", () => filterByItemType("Shields")),
    //   this.createActionButton("Helms", () => filterByItemType("Helms")),
    // ];

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
    const { maxLevelFilter, filterBySocket, filterByItemType } = filters;

    this.clearUI(this.container);
    // Build sortable actions
    this.container.appendChild(
      this.runewordActions([
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
      ])
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
    this.container.appendChild(this.runewordActions(socketActions));

    // Build Item Type Filter Actions
    // Build Socket Filter Actions
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
    this.container.appendChild(this.runewordActions(typeActions));

    // Level Filter
    // this.container.appendChild(
    //   this.runewordActions([
    //     {
    //       action: maxLevelFilter,
    //       actionValue: 30,
    //       text: "30",
    //     },
    //     {
    //       action: maxLevelFilter,
    //       actionValue: 40,
    //       text: "40",
    //     },
    //   ])
    // );

    // Show the list
    this.container.appendChild(this.runewordList(runewords));
  }
}
