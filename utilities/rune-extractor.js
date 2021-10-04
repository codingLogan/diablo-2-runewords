/**
 * Function to get the runes from Arreat Summit
 * http://classic.battle.net/diablo2exp/items/runes.shtml
 */
function getRunes() {
  const runeTable = document.querySelector(
    "body > table:nth-child(4) > tbody > tr > td:nth-child(2) > table:nth-child(5) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > font > span > p:nth-child(12) > table"
  );

  // Avoid header row
  let rowIndex = 1;
  let runes = [];
  for (rowIndex = 1; rowIndex < runeTable.rows.length; rowIndex++) {
    const cells = runeTable.rows[rowIndex].cells;

    const level = parseInt(cells[4].innerText, 10);
    let specialCaseLevel = null;
    if (Number.isNaN(level)) {
      // Handle special cases here
      const specialCases = ["-"];
      if (specialCases.includes(cells[4].innerText)) {
        specialCaseLevel = 0;
      } else {
        alert(`level is not a number: ${cells[4].innerText}`);
        throw Error("Bad data, review page data for level");
      }
    }
    // Hel rune reduces requirements... so treat it as 0

    const runeData = {
      image: cells[0].querySelector("img")?.src || "",
      name: cells[1].innerText,
      weapon: cells[2].innerText,
      armor: cells[3].innerText,
      level: specialCaseLevel ?? level,
    };
    runes.push(runeData);
  }

  return runes;
}

function getRuneJSON() {
  return JSON.stringify(getRunes());
}

function prettyPrint(any) {
  console.log(JSON.stringify(any, null, 2));
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Runewords extractor
function getRuneWords(
  startAtRowIndex = 0,
  selector = "body > table:nth-child(4) > tbody > tr > td:nth-child(2) > table:nth-child(5) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > font > span > center:nth-child(4) > table",
  extraProps = {}
) {
  const table = document.querySelector(selector);

  // Avoid Header and blank rows
  let rowIndex = startAtRowIndex;
  let runeWords = [];
  for (rowIndex = startAtRowIndex; rowIndex < table.rows.length; rowIndex++) {
    const cells = table.rows[rowIndex].cells;

    const socketParts = cells[1].innerText.split(/ Socket /, 2);
    const sockets = parseInt(socketParts[0], 10);
    const itemType = socketParts[1];

    // Throw Error if sockets isn't a number
    if (Number.isNaN(sockets)) {
      alert("Bad socket number");
      throw Error("Socket number not gathered");
    }

    // Create an array of effects
    const effects = cells[3].innerText.trim().split("\n");

    const wordData = {
      name: cells[0].innerText,
      sockets: sockets,
      itemType: itemType,
      runeOrder: cells[2].innerText,
      effects,
      ...extraProps,
    };
    runeWords.push(wordData);
  }

  return runeWords;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function downloadJSON(downloadObject) {
  // Create the data to reference
  // Note - this may "hang out" in memory
  const dataBlob = new Blob([JSON.stringify(downloadObject)], {
    type: "application/json",
  });
  const downloadUrl = window.URL.createObjectURL(dataBlob);

  // Create the download link, and click it
  const downloadLink = document.createElement("a");
  downloadLink.download = "download.json";
  downloadLink.id = "download-link";
  downloadLink.innerText = "Download runes";
  downloadLink.href = downloadUrl;

  // Put the download link on the page
  document.body.append(downloadLink);
}
