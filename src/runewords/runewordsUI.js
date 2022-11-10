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

  createActionButton(text, onClick, active) {
    const actionButton = document.createElement("button");
    actionButton.innerText = text;
    actionButton.onclick = onClick;

    // Make active if the filter is active
    if (active) {
      actionButton.classList.add("active");
    }

    return actionButton;
  }

  createActionToggle(text, onClick, active) {
    const toggleHtml = `
    <div class="switch-container">
      <label class="switch">
        <input type="checkbox" ${active ? "checked" : ""} />
        <span class="slider"></span>
      </label>
      <span class="switch-text">${text}</span>
    </div>`;
    const template = document.createElement("template");
    template.innerHTML = toggleHtml;
    const actionToggle = template.content.firstElementChild;
    actionToggle.querySelector("input").onclick = onClick;

    return actionToggle;
  }

  // Runeword action bar
  /**
   *
   * @param {Array} actions [{action: function, actionValue: string, text: string}]
   * @param {string} headerText creates a heaver for the actions
   */
  runewordActions(actions, headerText = "", useToggles = false) {
    // Build a header for the filters
    const actionHeader = document.createElement("h4");
    actionHeader.innerText = headerText;

    const actionSection = document.createElement("div");
    actionSection.appendChild(actionHeader);

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("runeword-actions");
    actionSection.appendChild(actionDiv);

    let buttons = [];
    if (useToggles) {
      // Toggle switches (checkboxes)
      buttons = actions.map(({ action, actionValue, active, text }) =>
        this.createActionToggle(text, () => action(actionValue), active)
      );
    } else {
      // Buttons
      buttons = actions.map(({ action, actionValue, active, text }) =>
        this.createActionButton(text, () => action(actionValue), active)
      );
    }

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

  showAllEffects(show) {
    const allEffects = document.querySelectorAll(".runeword-effects");

    allEffects.forEach((effect) => {
      effect.hidden = !show;
    });
  }

  render(data, sortAction, filterActions) {
    const { runewords, itemTypes, filters } = data;
    const { itemType: chosenItemType, sockets: chosenNumberOfSockets } =
      filters;
    const { maxLevelFilter, filterBySocket, filterByItemType } = filterActions;

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
      active: chosenNumberOfSockets === numberOfSockets,
      text: numberOfSockets,
    }));
    socketActions.push({
      action: filterBySocket,
      actionValue: null,
      active: chosenNumberOfSockets === null,
      text: "All",
    });

    const useToggles = true;
    this.container.appendChild(
      this.runewordActions(socketActions, "Number of Sockets", useToggles)
    );

    // Build Item Type Filter Actions
    const typeActions = itemTypes.map((itemType) => ({
      action: filterByItemType,
      actionValue: itemType,
      active: chosenItemType === itemType,
      text: itemType,
    }));
    typeActions.push({
      action: filterByItemType,
      actionValue: null,
      active: chosenItemType === null,
      text: "All",
    });
    this.container.appendChild(
      this.runewordActions(typeActions, "Item Types", false)
    );

    // Button to show all and hide all
    this.container.appendChild(
      this.runewordActions([
        {
          action: this.showAllEffects,
          actionValue: true,
          active: false,
          text: "Expand All",
        },
        {
          action: this.showAllEffects,
          actionValue: false,
          active: false,
          text: "Collapse All",
        },
      ])
    );

    // Show the list
    this.container.appendChild(this.runewordList(runewords));
  }
}
