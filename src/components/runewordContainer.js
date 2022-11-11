/**
 *
 * @param {Object} dataColumns - {wordKey: label...}
 */
export default function runewordContainer(
  runewords,
  dataColumns = { name: "Name", level: "Level", sockets: "Sockets" },
  displayOptions = {}
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

  return wordTable;
}

let tableContainer = null;
let currentRunewords = [];

export function renderTableTo(
  containerElement,
  runewords,
  dataColumns,
  displayOptions
) {
  tableContainer = containerElement;
  currentRunewords = runewords;

  // Render the actions and the table below it
  containerElement.appendChild(tableActions());
  containerElement.appendChild(
    runewordContainer(runewords, dataColumns, displayOptions)
  );
}

export function createActionButton(text, onClick) {
  const actionButton = document.createElement("button");
  actionButton.innerText = text;
  actionButton.onclick = onClick;
  return actionButton;
}

function clearTable(tableContainerNode) {
  while (tableContainerNode.firstChild) {
    tableContainerNode.removeChild(tableContainerNode.firstChild);
  }
}

function sortTable(propertyName) {
  currentRunewords.sort((a, b) => {
    if (a[propertyName] === b[propertyName]) {
      return 0;
    }

    return a[propertyName] < b[propertyName] ? -1 : 1;
  });

  clearTable(tableContainer);
  renderTableTo(tableContainer, currentRunewords);
}

export function tableActions() {
  const actionDiv = document.createElement("div");

  const buttons = [
    createActionButton("Name", () => sortTable("name")),
    createActionButton("Level", () => sortTable("level")),
  ];

  buttons.forEach((button) => {
    actionDiv.appendChild(button);
  });

  return actionDiv;
}
