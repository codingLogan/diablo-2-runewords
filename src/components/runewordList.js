/*

        <ul>
          <li>
            <div class="header-block">
              <div class="flex-apart">
                <h3>Ancients Pledge</h3>
                <h4>Level 25</h4>
              </div>
              <div class="flex-apart">
                <h4>3 Sockets</h4>
                <h4>Axes/Swords/Maces</h4>
              </div>
            </div>
            <ul class="runeword-effects">
              <li>Effect 1</li>
              <li>Effect 2</li>
              <li>Effect 3</li>
            </ul>
          </li>
        </ul>

*/

function runewordItem({
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

  effects.forEach((effect) => {
    const effectItem = document.createElement("li");
    effectItem.innerText = effect;
    effectList.appendChild(effectItem);
  });

  item.appendChild(effectList);

  return item;
}

export default function runewordList(runewords) {
  const list = document.createElement("ul");

  runewords.forEach((word) => {
    list.appendChild(runewordItem(word));
  });

  return list;
}
