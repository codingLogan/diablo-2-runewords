export default function getItemTypes(runewords) {
  const itemTypes = {};
  runewords.forEach((word) => {
    word.itemType.forEach((type) => {
      if (typeof itemTypes[type] === "undefined") {
        itemTypes[type] = 0;
      }

      itemTypes[type]++;
    });
  });

  const itemTypesArray = Object.keys(itemTypes).sort();
  return itemTypesArray;
}
