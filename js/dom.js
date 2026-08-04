const clearStatus = (status) =>
  (document.getElementById("status").innerHTML = "");

const addStatus = (status) =>
  (document.getElementById("status").innerHTML =
    document.getElementById("status").innerHTML + "<p>" + status + "</p>");

const addSubTitle = (subtitle) =>
    (document.getElementById("status").innerHTML =
        document.getElementById("status").innerHTML + "<h3>" + subtitle + "</h3>");

const createTableRow = () => document.createElement("tr");

const addTableRow = ({ tableBody, tableRow }) => {
  tableBody.appendChild(tableRow);
};

const addTableCell = ({ tableRow, value, colSpan, className }) => {
  const cell = document.createElement("td");

  cell.innerHTML = value;

  if (colSpan) {
    cell.colSpan = colSpan;
  }

  if (className) {
    cell.className = className;
  }

  tableRow.appendChild(cell);
};

const clearTableRows = ({ tableBody }) =>
  (document.getElementById(tableBody).innerHTML = "");
