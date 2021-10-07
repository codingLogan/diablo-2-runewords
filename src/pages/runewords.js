import { getRuneWords } from "../data/runeWords.js";

const runewords = getRuneWords();
const runewordsSection = document.getElementById("runewords");

// Create a div per runeword
function renderDivs() {
  runewords.forEach((runeword) => {
    const runewordDiv = document.createElement("div");
    runewordDiv.innerText = runeword.name;
    runewordsSection.append(runewordDiv);
  });
}

/**
 *
 * @param {Object} dataColumns - {wordKey: label...}
 */
function renderTable(
  dataColumns = { name: "Name", minLevelForRune: "Level", sockets: "Sockets" }
) {
  const wordTable = document.createElement("table");
  const headerRow = document.createElement("tr");
  Object.keys(dataColumns).map((key) => {
    const headerColumn = document.createElement("th");
    headerColumn.innerText = dataColumns[key];
    headerRow.appendChild(headerColumn);
  });

  // Set up the table and header row
  wordTable.appendChild(headerRow);
  runewordsSection.appendChild(wordTable);

  // Render the data rows
  runewords.forEach((word) => {
    const wordRow = document.createElement("tr");

    Object.keys(dataColumns).map((key) => {
      const dataColumn = document.createElement("td");
      dataColumn.innerText = word[key];
      wordRow.appendChild(dataColumn);
    });

    wordTable.appendChild(wordRow);
  });
}

// renderDivs();
renderTable();
