
const addStatus = (status) => {
    const statusElement = document.getElementById("status");
    const message = document.createElement("p");
    message.innerHTML = status;
    statusElement.appendChild(message);
};

const clearStatus = (status) =>
  (document.getElementById("status").innerHTML = "");

const clearStatusMessage = () => {
    const status = document.getElementById("status");
    const message = status.querySelectorAll("p");
    
    message.forEach((message) => {
        message.remove();
    });
};

const addStatusError = (status) => {
    clearStatus();

    const statusElement = document.getElementById("status");
    const message = document.createElement("p");
    message.innerHTML = status;

    message.setAttribute("style", "color: #f10c0c");
    
    statusElement.appendChild(message);
};

const clearCaption = () => {
    const caption = document.querySelector("caption");
    caption.innerHTML = "";
};

const clearSearchInput = (inputId) => {
    const input = document.querySelector(`#${inputId}`);
    input.value = "";
};

const createTableRow = () => {
    return document.createElement("tr");
};

const addTableRow = ({table, tableRow}) => {
    table.appendChild(tableRow);
};

const addTableCell = ({tableRow, value}) => {
    const cell = document.createElement("td");
    cell.innerHTML = value;

    tableRow.appendChild(cell);
};

const addDeleteCell = ({tableRow, deleteButton}) => {
    const cell = document.createElement("td");
    cell.appendChild(deleteButton);
    tableRow.appendChild(cell);
};

const hideTable = ({tableId}) => {
    const table = document.getElementById(tableId);
    table.style.display = "none";
}

const unhideTable = ({tableId}) => {
    const table = document.getElementById(tableId);
    table.style.display = "table";
};

/* --- Cards --- */

