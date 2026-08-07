const addStatus = (status) =>
  (document.getElementById("status").innerHTML =
    document.getElementById("status").innerHTML + "<p>" + status + "</p>");

const clearStatus = (status) =>
  (document.getElementById("status").innerHTML = "");

const clearStatusMessage = () => {
    const status = document.getElementById("status");
    const messages = status.querySelectorAll("p");
    
    messages.forEach((message) => {
        message.remove();
    });
};

const clearCaption = () => {
    const caption = document.querySelector("caption");

    caption.innerHTML = "";
};

const clearSearchInput = () => {
    const input = document.querySelector("#search-games");
    input.value = "";
};

const createTableRow = () => {
    return document.createElement("tr");
};

const addTableRow = ({table, tableRow}) => {
    table.appendChild(tableRow);
}

const addTableCell = ({tableRow, value}) => {
    const cell = document.createElement("td");
    cell.innerHTML = value;

    tableRow.appendChild(cell);
}



console.log("eigen-dom geladen");
