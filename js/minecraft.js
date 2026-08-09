
// const data = [
//     {
//         time: new Date(),
//         players: 100,
//         maxplayers: 10000
//     },
//     {
//         time: new Date(),
//         players: 200,
//         maxplayers: 10000
//     },
//     {
//         time: new Date(),
//         players: 300,
//         maxplayers: 10000
//     },
//     {
//         time: new Date(),
//         players: 150,
//         maxplayers: 15000
//     }
// ];

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

const renderData = (listOfData) => {
    const dataTable = document.getElementById("minecraftTable");
    dataTable.innerHTML = "";

    listOfData.forEach((data) => {
        const tableRow = createTableRow();

        addTableCell({tableRow, value: data.time.toLocaleDateString()});
        addTableCell({tableRow, value: data.time.toLocaleTimeString()});
        addTableCell({tableRow, value: data.players});
        addTableCell({tableRow, value: data.maxplayers});
        
        addTableRow({table: dataTable, tableRow});
    });
};

// renderData(data);

const fetchAndRenderData = async () => {
    await fetchData();
    renderData(data);
}

setInterval(fetchAndRenderData, 5000);
