const games = [];

const fetchGames = async () => {
    const response = await fetch("http://localhost:3000/games");
    const result = await response.json();

    games.length = 0;
    games.push(...result);
};

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
};

const setCaption = () => {
    const caption = document.createElement("caption");

    const table = document.querySelector("table");
    table.prepend(caption);
};


const renderGames = (listOfGames, filterFunction, emptyMessage) => {
    const gameTable = document.getElementById("my-games-table-body");
    gameTable.innerHTML = "";

    const filteredGames = filterFunction
    ? listOfGames.filter(filterFunction)
    : listOfGames;

    if(games.length === 0) {
        clearStatusMessage();
        hideTable({tableId: "gamesTable"});
        addStatus("No games in library.")

    } else if (filteredGames.length === 0) {
        clearStatusMessage();
        hideTable({tableId: "gamesTable"});
        addStatus(emptyMessage);
    
    } else {
        unhideTable({tableId : "gamesTable"});

        filteredGames.forEach((game) => {
        const tableRow = createTableRow();
        
        addTableCell({tableRow, value: game.name});
        addTableCell({tableRow, value: game.type});
        addTableCell({tableRow, value: game.rating});
        
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";

        addDeleteCell({tableRow, deleteButton});

        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteGame(game);
        })


        tableRow.addEventListener("click", () => {
            clearStatusMessage();
            addStatus(toString(game));
        });

        tableRow.addEventListener("dblclick", () => {
            clearStatusMessage();
            toggleFavourite(game);
            
        });

        tableRow.addEventListener("mouseover", () => {
            tableRow.className = "select";
        });

        tableRow.addEventListener("mouseout", () => {
            tableRow.className = "";
        });
         
        addTableRow({table: gameTable, tableRow});
        
        });
    }
};

setTable();
setStatus();
setCaption();


const isFavourite = (game) => {
    return game.isFavourite;
};

const favouriteButton = document.querySelector("#show-favourite");
favouriteButton.addEventListener("click", () => {
    clearStatusMessage();
    clearCaption();
    clearSearchInput("show-rating");
    clearSearchInput("search-games");
    
    renderGames(games, isFavourite, "No favourite games found.");
})

const allButton = document.querySelector("#show-all");
allButton.addEventListener("click" , () => {
    clearStatusMessage();
    clearCaption();
    clearSearchInput("show-rating");
    clearSearchInput("search-games");

    renderGames(games);
})

const status = document.querySelector("#status")

    status.addEventListener("mouseover", () => {
    status.setAttribute("style", "background-color: #89a9c6");
    });

    status.addEventListener("mouseout", () => {
    status.removeAttribute("style");
    });

const createColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

const title = document.querySelector("h1");

    title.addEventListener("click", () => {
        title.setAttribute("style", `color: ${createColor()}`);
    })

const ratingInput = document.getElementById("show-rating");
ratingInput.addEventListener("input", () => {
    
    const rating = Number(ratingInput.value);
    
    renderGames(
        games,
        (game) => game.rating > rating, 
        `There are no games with rating higher than "${rating}".`);
});

const fetchAndRenderGames = async () => {
    await fetchGames();
    renderGames(games);
};

fetchAndRenderGames();

const searchByFetch = async (chars) => {
    const response = await fetch(`http://localhost:3000/games?query=${chars}`);
    
    return await response.json();    
};

const updateCaption = (chars, result) => {
    const caption = document.querySelector("caption");
    
     if (result.length > 0) {
        caption.innerHTML = `Games with name containing "${chars}"`;
    } else {
        caption.innerHTML = "";
    }
};

const searchByFetchAndRender = async () => {
       
    const input = document.querySelector("#search-games");
    
    const chars = input.value;
    
    clearStatusMessage();

    if(chars === "") {
        return renderGames(games);
    }
    
    const result = await searchByFetch(input.value);

    addStatus(`Games with name containing "${chars}"`);
    updateCaption(chars, result);

    renderGames(result, undefined, `There are no games with name containing "${chars}".`);
};

const getGameButton = document.querySelector("#get-games");

getGameButton.addEventListener("click", () => {
    searchByFetchAndRender();
});

const toggleFavourite = async (game) => {
   await fetch(`http://localhost:3000/games/${game.id}/favourite`, {
        method: "POST"
   });

   await fetchAndRenderGames();

   const updatedGame = games.find((gameFromList) => gameFromList.id === game.id);
   
   addStatus(`The game with name ${updatedGame.name} is now ${updatedGame.isFavourite ? "my favourite" : "not my favourite"}`);      
                
};

const deleteGame = async (game) => {
   await fetch(`http://localhost:3000/games/${game.id}`, {
        method: "DELETE"
   });

   await fetchAndRenderGames();
   
   if(games.length > 0) {
    const statusElement = document.getElementById("status");
        statusElement.querySelectorAll("p").forEach((message) => {
            message.remove();
        });
        
        addStatus(`The game with name ${game.name} is now deleted.`);
    }
                
};
