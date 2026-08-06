const games = [
{ name: "Fifa23", type: "football game", rating: 7.0, isFavourite: false},
{ name: "AOTennis 2", type: "tennis game", rating: 2.0, isFavourite: true},
{ name: "Elden Ring", type: "fantasy game", rating: 4.0, isFavourite: false},
{ name: "Horizon Forbidden West", type: "adventure game", rating: 3.5, isFavourite: false},
{ name: "Pokemon Legends: Arceus", type: "RPG game", rating: 3.0, isFavourite: true},
{ name: "GTA V", type: "open world game", rating: 5.0, isFavourite: true},
{ name: "Gran Turismo", type: "racing game", rating: 6.0, isFavourite: true}];

const toString = (myGame) => {
    return `Name: ${myGame.name} - Type: ${myGame.type} - Rating: ${myGame.rating} - ${myGame.isFavourite ? "Favourite game": "Not a favourite game"}`;
};

const setStatus = () => {
    const status = document.createElement("div");
    status.id = "status";

    const title = document.createElement("h3");
    title.innerHTML = "Status";

    status.appendChild(title);

    const main = document.querySelector("main");
    main.appendChild(status)
};

const setTable = () => {
    const tbody = document.createElement("tbody");
    tbody.id = "my-games-table-body"
 
    const table = document.querySelector("table");
    table.appendChild(tbody);
}

const renderGames = (listOfGames, filterFunction) => {
    const gameTable = document.getElementById("my-games-table-body");
    gameTable.innerHTML = "";

    const filteredGames = filterFunction
    ? listOfGames.filter(filterFunction)
    : listOfGames;

    filteredGames.forEach((game) => {
        const tableRow = createTableRow();
        
        addTableCell({tableRow, value: game.name});
        addTableCell({tableRow, value: game.type});
        addTableCell({tableRow, value: game.rating});

        tableRow.addEventListener("click", () => {
            clearStatusMessage();
            // addStatus(`Game selected: ${game.name}`);
            addStatus(toString(game));
        })
        tableRow.addEventListener("mouseover", () => {
            tableRow.className = "select";
        })
        tableRow.addEventListener("mouseout", () => {
            tableRow.className = "";
        })
         
        addTableRow({table: gameTable, tableRow});
        
    });
}

setTable();
setStatus();
renderGames(games);

const isFavourite = (game) => {
    return game.isFavourite;
};

const favouriteButton = document.querySelector("#show-favourite");
favouriteButton.addEventListener("click", () => {
    renderGames(games, isFavourite);
})

const allButton = document.querySelector("#show-all");
allButton.addEventListener("click" , () => {
    renderGames(games);
})

const status = document.querySelector("#status")

    status.addEventListener("mouseover", () => {
    status.setAttribute("style", "background-color: lightblue");
    });

    status.addEventListener("mouseout", () => {
    status.removeAttribute("style");
    });

const createColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

const title = document.querySelector("h2");

    title.addEventListener("click", () => {
        title.setAttribute("style", `color: ${createColor()}`);
    })

const ratingInput = document.getElementById("show-rating");
ratingInput.addEventListener("input", () => {
    const rating = Number(ratingInput.value);

    renderGames(games, (game) => game.rating > rating);
    
});

