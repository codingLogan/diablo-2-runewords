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

    const titleRight = document.createElement("h4");
    titleRight.innerText = `Level ${minLevelForRune}`;
    titleDiv.appendChild(titleRight);

    // Subtitle Row
    const subtitleDiv = document.createElement("div");
    subtitleDiv.classList.add("flex-apart");
    itemHeader.appendChild(subtitleDiv);

    const subtitleLeft = document.createElement("h4");
    subtitleLeft.innerText = `${sockets} Sockets`;
    subtitleDiv.appendChild(subtitleLeft);

    const subtitleRight = document.createElement("h4");
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
      list.appendChild(this.runewordItem(word));
    });

    return list;
  }

  clearUI(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  render(runewords) {
    this.clearUI(this.container);
    this.container.appendChild(this.runewordList(runewords));
  }
}
