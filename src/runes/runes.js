import { getRunes } from "../data/runes.js";

function runeList(runes) {
  const list = document.createElement("ul");

  runes.forEach((rune) => {
    //   if (rune.filtered === false) {
    list.appendChild(runeItem(rune));
    //   }
  });

  return list;
}

function runeItem({ image, name, weapon, armor, level, recipe }) {
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
  titleRight.innerText = recipe;
  titleDiv.appendChild(titleRight);

  // Subtitle Row
  const subtitleDiv = document.createElement("div");
  subtitleDiv.classList.add("flex-apart");
  itemHeader.appendChild(subtitleDiv);

  const subtitleLeft = document.createElement("span");
  subtitleLeft.innerText = `Level ${level}`;
  subtitleDiv.appendChild(subtitleLeft);

  //   const subtitleRight = document.createElement("span");
  //   subtitleRight.innerText = recipe;
  //   subtitleDiv.appendChild(subtitleRight);

  // List of Effects for armor and weapons
  const effectList = document.createElement("ul");
  effectList.classList.add("runeword-effects");
  effectList.hidden = true;

  // Add armor effect
  const armorEffect = document.createElement("li");
  armorEffect.innerText = "Armor: " + armor;
  effectList.appendChild(armorEffect);

  // Add weapon effect
  const weaponEffect = document.createElement("li");
  weaponEffect.innerText = "Weapon: " + weapon;
  effectList.appendChild(weaponEffect);

  item.appendChild(effectList);

  // Return the item for the code to do something with it
  return item;
}

// Attach the list to the correct place
document.getElementById("runes").appendChild(runeList(getRunes()));
