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

const data = [];

const fetchData = async () => {
    const response = await fetch("https://api.mcsrvstat.us/3/mc-central.net");
    const result = await response.json();

    const newDate = {
        time: new Date(),
        players: result.players.online,
        maxplayers: result.players.max
    };

    data.unshift(newDate);
};

const setTable = () => {
    const tbody = document.createElement("tbody");
    tbody.id = "minecraftTable"
 
    const table = document.querySelector("table");
    table.appendChild(tbody);
};

setTable();

const readNumberOfLines = () => {
    const input = document.querySelector('input[name="numberOfLines"]:checked');
    return Number(input.value);
};

const readCheckbox = () => {
    return document.getElementById("value").checked;
};

const readTimeSort = () => {
    return document.getElementById("time-oldest").checked;       
};

const renderData = (listOfData) => {
    console.log("renderData krijgt: ", listOfData);

    const dataTable = document.getElementById("minecraftTable");
    dataTable.innerHTML = "";

    const numberOfLines = readNumberOfLines();

    let sortedData = listOfData;
    
    if (readCheckbox()) {
        if (readTimeSort()) {
            sortedData = sortedData.toSorted((a, b) => {
                if (a.players !== b.players) {
                    return b.players - a.players;
                }
                return a.time < b.time ? -1 : 1;
            });
        } else {
            sortedData = sortedData.toSorted((a, b) => {
                if (a.players !== b.players) {
                    return b.players - a.players;
                }
                return a.time > b.time ? -1 : 1;
            });    
        }
    } else {

        if (readTimeSort()) {
            sortedData = sortedData.toSorted((a, b) => a.time < b.time ? -1 : 1);
        } else {
            sortedData = sortedData.toSorted((a, b) => a.time > b.time ? -1 : 1);
        }
    }

    const dataToRender = sortedData.slice(0, numberOfLines);

    dataToRender.forEach((data) => {
        const tableRow = createTableRow();

        addTableCell({tableRow, value: data.time.toLocaleDateString()});
        addTableCell({tableRow, value: data.time.toLocaleTimeString()});
        addTableCell({tableRow, value: data.players});
        addTableCell({tableRow, value: data.maxplayers});
        
        addTableRow({table: dataTable, tableRow});
    });
};

const fetchAndRenderData = async () => {
    await fetchData();
    renderData(data);
}

setInterval(fetchAndRenderData, 5000);


/* --- test code dummy array --- */
document.querySelectorAll('input[name="time"]').forEach((input) => {
    input.addEventListener("change", () => {
        renderData(data);
    });
});
