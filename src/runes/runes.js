import { getRunes } from "../data/runes.js";

function runeList(runes) {
  const list = document.createElement("ul");

  runes.forEach((rune) => {
    list.appendChild(runeItem(rune));
  });

  return list;
}

function runeItem({ image, name, weapon, armor, level, recipe }) {
  // Create the runeImageNode
  const runeImageNode = document.createElement("img");
  runeImageNode.src = `./images/runes/${name.toLowerCase()}.webp`;

  // Create the title and level nodes, in their own div
  const nameTitleNode = document.createElement("h3");
  nameTitleNode.innerText = name;

  const levelNode = document.createElement("span");
  levelNode.innerText = `Level ${level}`;

  const titleLevelNodes = document.createElement("div");
  titleLevelNodes.appendChild(nameTitleNode);
  titleLevelNodes.appendChild(levelNode);

  // Create the runeIngredients node
  const runeIngredientsNode = document.createElement("span");
  runeIngredientsNode.innerText = recipe;

  // Organize the pieces into the list
  const listItemNode = document.createElement("li");
  const listItemContentNode = document.createElement("div");
  const listItemContentLeftNode = document.createElement("div");
  listItemContentLeftNode.appendChild(runeImageNode);
  listItemContentLeftNode.appendChild(titleLevelNodes);

  const listItemContentRightNode = document.createElement("div");
  listItemContentRightNode.appendChild(runeIngredientsNode);

  listItemNode.appendChild(listItemContentNode);
  listItemContentNode.appendChild(listItemContentLeftNode);
  listItemContentNode.appendChild(listItemContentRightNode);

  // Styles
  listItemContentNode.classList.add("header-block");
  listItemContentNode.classList.add("flex-apart");
  listItemContentLeftNode.style.setProperty("display", "flex");
  titleLevelNodes.style.setProperty("padding-left", "8px");

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

  listItemNode.appendChild(effectList);

  const toggleHidden = (event) => {
    console.log("hidden", event.currentTarget.hidden);
    event.currentTarget.nextSibling.hidden =
      !event.currentTarget.nextSibling.hidden;
  };
  listItemContentNode.onclick = toggleHidden;

  return listItemNode;
}

// Attach the list to the correct place
document.getElementById("runes").appendChild(runeList(getRunes()));
