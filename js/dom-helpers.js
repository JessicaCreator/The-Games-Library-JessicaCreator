// Voegt een nieuwe statusmelding toe aan het statusgedeelte van de pagina.
// "status" bevat de tekst die als melding getoond moet worden.
const addStatus = (status) => {
    // Zoekt het bestaande status-element op.
    const statusElement = document.getElementById("status");
    // Maakt een nieuw p-element aan voor de melding.
    const message = document.createElement("p");
    // Plaatst de meegegeven status als tekst in het p-element.
    message.innerHTML = status;
    // Voegt de melding toe aan het status-element.
    statusElement.appendChild(message);
};

// Verwijdert alle inhoud uit het status-element.
// Hier wordt ook de titel Status verwijderd
// De parameter status wordt hier niet gebruikt. Kan eventueel weggelaten worden.
const clearStatus = (status) =>
  (document.getElementById("status").innerHTML = "");

// Verwijdert alleen de p-elementen uit het statusgedeelte.
// Hierdoor blijft de titel "Status" behouden.
const clearStatusMessage = () => {
    const status = document.getElementById("status");
    // Zoekt alle (All) p-elementen binnen status.
    const message = status.querySelectorAll("p");
    
    // Loopt door alle geselecteerde p-elementen.
    // Verwijdert elke gevonden statusmelding.
    message.forEach((message) => {
        message.remove();
    });
};

// Voegt een foutmelding toe aan het statusgedeelte.
const addStatusError = (status) => {
    // Maakt het volledige status-element leeg.
    clearStatus();

    const statusElement = document.getElementById("status");
    const message = document.createElement("p");
    // Plaatst de foutmelding in het p-element.
    message.innerHTML = status;
    // Geeft de foutmelding een rode tekstkleur.
    message.setAttribute("style", "color: #f10c0c");
    // Voegt de foutmelding toe aan het status-element.
    statusElement.appendChild(message);
};

// Verwijdert de tekst uit de caption van de tabel.
const clearCaption = () => {
    // Zoekt het eerste overeenkomstig element
    const caption = document.querySelector("caption");
    caption.innerHTML = "";
};

// Maakt een invoerveld leeg.
const clearSearchInput = (inputId) => {
    // Zoekt het invoerveld op basis van zijn id.
    const input = document.querySelector(`#${inputId}`);
    // Verwijdert de huidige ingevoerde waarde.
    input.value = "";
};

// Maakt een nieuwe lege tabelrij (tr) aan.
const createTableRow = () => {
    return document.createElement("tr");
};

// Voegt een bestaande tabelrij toe aan een tabel.
const addTableRow = ({table, tableRow}) => {
    table.appendChild(tableRow);
};

// Maakt een nieuwe tabelcel (td) en vult die met een waarde.
const addTableCell = ({tableRow, value}) => {
    const cell = document.createElement("td");
    cell.innerHTML = value;
    // Voegt de cel toe aan de tabelrij.
    tableRow.appendChild(cell);
};

// Maakt een tabelcel met een deleteknop en voegt deze toe aan de tabelrij.
const addDeleteCell = ({tableRow, deleteButton}) => {
    const cell = document.createElement("td");
    cell.appendChild(deleteButton);
    tableRow.appendChild(cell);
};

// Verbergt een tabel door de CSS display-eigenschap op "none" te zetten.
const hideTable = ({tableId}) => {
    const table = document.getElementById(tableId);
    // Hierdoor wordt de tabel volledig verborgen op de pagina.
    table.style.display = "none";
}

// Maakt een verborgen tabel opnieuw zichtbaar.
const unhideTable = ({tableId}) => {
    const table = document.getElementById(tableId);
    // "table" zorgt ervoor dat de tabel als tabel wordt weergegeven.
    table.style.display = "table";
};


