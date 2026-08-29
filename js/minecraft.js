/* --- test code dummy array --- */
// const data = [
//     {
//         time: new Date("2026-08-10T08:00:00"),
//         players: 300,
//         maxplayers: 9000
//     },
//     {
//         time: new Date("2026-08-10T08:05:00"),
//         players: 200,
//         maxplayers: 10000
//     },
//     {
//         time: new Date("2026-08-10T08:10:00"),
//         players: 300,
//         maxplayers: 10100
//     },
//     {
//         time: new Date("2026-08-10T08:03:00"),
//         players: 150,
//         maxplayers: 15000
//     }
// ];
/* ---  --- */
// Variabele met lege array.
// Bevat alle gegevens die via de Minecraft-server API worden opgehaald.
const data = [];

// Stuurt een GET-verzoek naar de API.
// Haalt de huidige (actuele) informatie van de Minecraft-server op.
const fetchData = async () => {
    const response = await fetch("https://api.mcsrvstat.us/3/mc-central.net");
    const result = await response.json();

    // Maakt een object met de gegevens die we op de website willen bewaren.
    const newDate = {
        time: new Date(),
        players: result.players.online,
        maxplayers: result.players.max
    };

    // Voegt de nieuwste meting vooraan de array toe.
    data.unshift(newDate);
};

// Maakt een tbody-element aan waarin de tabelrijen later worden geplaatst.
const setTable = () => {
    const tbody = document.createElement("tbody");
    // Geeft het tbody-element de id "minecraftTable".
    tbody.id = "minecraftTable"
 
    // Zoekt de bestaande tabel op en voegt de tbody eraan toe.
    const table = document.querySelector("table");
    table.appendChild(tbody);
};

// Maakt de tabel klaar voordat er gegevens in geplaatst worden.
setTable();

// Leest hoeveel regels de gebruiker wil zien.
const readNumberOfLines = () => {
    // Zoekt het geselecteerde radio-button-input met de naam "numberOfLines".
    // :checked zorgt ervoor dat alleen de aangeklikte optie wordt gevonden.
    const input = document.querySelector('input[name="numberOfLines"]:checked');
    // Leest de waarde van de geselecteerde optie uit.
    // En zet de waarde van het inputveld om van tekst naar een getal.
    return Number(input.value);
};

// Controleert of het selectievakje voor het sorteren op aantal spelers aangevinkt is.
const readCheckbox = () => {
        // Zoekt het checkbox-element met de id "value"
        // En geeft terug of het aangevinkt is.
            // true: de checkbox is aangevinkt.
            // false: de checkbox is niet aangevinkt.
    return document.getElementById("value").checked;
};

// Controleert of de gebruiker de oudste tijd eerst wil tonen.
const readTimeSort = () => {
    return document.getElementById("time-oldest").checked;       
};

// Sorteert de gegevens en toont het gevraagde aantal regels in de tabel.
const renderData = (listOfData) => {
    // Zoekt de tbody waarin de gegevens moeten komen.
    const dataTable = document.getElementById("minecraftTable");
    // Maakt de tabel leeg voordat nieuwe gegevens worden toegevoegd.
    dataTable.innerHTML = "";

    // Leest hoeveel regels de gebruiker wil zien.
    const numberOfLines = readNumberOfLines();

    // Begint met de oorspronkelijke lijst.
    // Daarna wordt deze lijst eventueel gesorteerd.
    let sortedData = listOfData;
    
    // Als het selectievakje voor sorteren op spelers aangevinkt is,
    // wordt eerst op het aantal spelers gesorteerd.
    if (readCheckbox()) {
        // Bepaalt of de tijd van oud naar nieuw of van nieuw naar oud wordt gesorteerd.
        if (readTimeSort()) {
            // Sorteert met de oudste meting eerst wanneer dat gekozen is.
            sortedData = sortedData.toSorted((a, b) => {
                // Bij een verschil in spelersaantal komen de meeste spelers eerst.
                if (a.players !== b.players) {
                    return b.players - a.players;
                }
                // Bij een gelijk aantal spelers komt de oudste tijd eerst.
                // Dus bij gelijk bepaald de tijd de volgorde.
                return a.time < b.time ? -1 : 1;
            });
        // Anders worden bij een gelijk aantal spelers de nieuwste metingen eerst getoond.
        } else {
            sortedData = sortedData.toSorted((a, b) => {
                // Bij een verschil in spelersaantal komen de meeste spelers eerst.
                if (a.players !== b.players) {
                    return b.players - a.players;
                }
                // Bij een gelijk aantal spelers komt de nieuwste tijd eerst.
                return a.time > b.time ? -1 : 1;
            });    
        }
    } else {
        // Als er niet op spelers gesorteerd wordt, wordt alleen op tijd gesorteerd.
        if (readTimeSort()) {
            // Oudste tijd eerst. 
            // Indien voorwaarde true = -1 (zet a voor b)
            // Indien voorwaarde false = 1 (zet a na b)
            sortedData = sortedData.toSorted((a, b) => a.time < b.time ? -1 : 1);
        } else {
            // Nieuwste tijd eerst.
            sortedData = sortedData.toSorted((a, b) => a.time > b.time ? -1 : 1);
        }
    }

    // Neemt alleen het gewenste aantal regels (2, 5 of 20) uit de gesorteerde lijst.
    const dataToRender = sortedData.slice(0, numberOfLines);

    // Loopt door elke meting die moet worden weergegeven.
    // Maakt voor iedere geselecteerde meting een tabelrij aan.
    dataToRender.forEach((data) => {
        const tableRow = createTableRow();
        // Voegt de datum, tijd, aantal spelers en maximum aantal spelers toe aan de rij.
        // toLocaleDateString() en toLocaleTimeString()
            // Zetten de datum en tijd om naar een leesbaar formaat volgens de regionale instellingen van de browser.
        addTableCell({tableRow, value: data.time.toLocaleDateString()});
        addTableCell({tableRow, value: data.time.toLocaleTimeString()});
        addTableCell({tableRow, value: data.players});
        addTableCell({tableRow, value: data.maxplayers});
        
        // Voegt de volledige rij toe aan de tabel.
        addTableRow({table: dataTable, tableRow});
    });
};

// Haalt eerst nieuwe gegevens op en toont daarna de bijgewerkte tabel.
const fetchAndRenderData = async () => {
    await fetchData();
    renderData(data);
}

// Voert fetchAndRenderData iedere 5 seconden opnieuw uit.
setInterval(fetchAndRenderData, 5000);


/* --- test code dummy array --- */
// document.querySelectorAll('input[name="time"]').forEach((input) => {
//     input.addEventListener("change", () => {
//         renderData(data);
//     });
// });
