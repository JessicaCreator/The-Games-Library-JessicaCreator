// Variabele games met lege array.
// Bevat alle games die uit de de localhost worden opgehaald.
const games = [];

// Haalt alle games op uit de lokale server.
const fetchGames = async () => {
    const response = await fetch("http://localhost:3000/games");
    const result = await response.json();
    // Maakt de bestaande games-array leeg.
    games.length = 0;
    // Voegt alle opgehaalde games toe aan de games-array.
    games.push(...result);
};

// Geeft een tekst terug met informatie over de game.
// ${myGame.isFavourite ? "Favourite game" : "Not a favourite game"}
    // Als isFavourite true is, wordt "Favourite game" toegevoegd.
    // Anders als isFavourite false is, wordt "Not a favourite game" toegevoegd.
const toString = (myGame) => {
    return `Name: ${myGame.name} - Type: ${myGame.type} - Rating: ${myGame.rating} - ${myGame.isFavourite ? "Favourite game": "Not a favourite game"}`;
};

// Maakt het statusgedeelte van de pagina aan.
const setStatus = () => {
    // Maakt een nieuw <div>-element aan in de HTML.
    const status = document.createElement("div");
    // Geeft het div-element de id "status".
    status.id = "status";

    const title = document.createElement("h3");
    // Zet de tekst "Status" in het h3-element.
    title.innerHTML = "Status";

    // Voegt het h3-element toe aan het div-element.
    status.appendChild(title);

    // Voegt status-div toe aan het main-element.
    const main = document.querySelector("main");
    main.appendChild(status)
};

// Maakt een tbody aan waarin de games later worden weergegeven.
const setTable = () => {
    const tbody = document.createElement("tbody");
    tbody.id = "my-games-table-body"
 
    const table = document.querySelector("table");
    // Voegt het nieuwe tbody-element toe aan de tabel.
    table.appendChild(tbody);
};

// Voegt een caption toe aan de bestaande tabel.
const setCaption = () => {
    const caption = document.createElement("caption");

    const table = document.querySelector("table");
    // Voegt het caption-element vooraan (bovenaan) toe aan de tabel.
    table.prepend(caption);
};

// Toont de opgehaalde games in de tabel.
// filterFunction bepaalt eventueel welke games geselecteerd worden.
// De functie krijgt drie parameters:
    // listOfGames: de lijst met games.
    // filterFunction: een optionele functie om games te filteren.
    // emptyMessage: de melding wanneer een filter geen games oplevert.
const renderGames = (listOfGames, filterFunction, emptyMessage) => {
    const gameTable = document.getElementById("my-games-table-body");
    // Verwijdert eerst de bestaande tabelrijen. Maakt tabel leeg.
    gameTable.innerHTML = "";

    // Als er een filterfunctie is meegegeven, wordt die toegepast.
    // Zonder filterfunctie wordt de volledige lijst gebruikt.
    const filteredGames = filterFunction
    ? listOfGames.filter(filterFunction)
    : listOfGames;

    // Controleert eerst of de volledige gamelibrary leeg is.
    if(games.length === 0) {
        // If true.
        // De statusmelding wordt gewist.
        // De tabel wordt verborgen.
        // Er verschijnt een boodschap.
        clearStatusMessage();
        hideTable({tableId: "gamesTable"});
        addStatus("No games in library.")

    // Controleert daarna of de filter geen resultaten heeft opgeleverd.
    } else if (filteredGames.length === 0) {
        // If true...
        clearStatusMessage();
        hideTable({tableId: "gamesTable"});
        addStatus(emptyMessage);
    
    } else {
        // Er zijn resultaten, dus de tabel wordt opnieuw zichtbaar gemaakt.
        unhideTable({tableId : "gamesTable"});

        // Loopt door elke gevonden game.
        // Maakt voor iedere game een nieuwe tabelrij.
        filteredGames.forEach((game) => {
        const tableRow = createTableRow();
        
        addTableCell({tableRow, value: game.name});
        addTableCell({tableRow, value: game.type});
        addTableCell({tableRow, value: game.rating});
        
        // Maakt een knop waarmee de game verwijderd kan worden.
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";

        addDeleteCell({tableRow, deleteButton});

        // Verwijdert de game wanneer op de deleteknop wordt geklikt.
        deleteButton.addEventListener("click", (event) => {
            // Zorgt ervoor dat enkel de betreffende game verwijderd wordt en niet andere elementen binnen dezelfde div.
            event.stopPropagation();
            deleteGame(game);
        })

        // Toont de gegevens van de game in het statusgedeelte wanneer op de rij wordt geklikt.
        tableRow.addEventListener("click", () => {
            clearStatusMessage();
            addStatus(toString(game));
        });

        // Verandert de favoriete status wanneer dubbel op een rij wordt geklikt.
        tableRow.addEventListener("dblclick", () => {
            clearStatusMessage();
            // Aan- of uitgeschakelen van favourite.
            toggleFavourite(game);
            
        });

        // Geeft de rij een CSS-class "select" wanneer de muis erboven komt.
        tableRow.addEventListener("mouseover", () => {
            tableRow.className = "select";
        });

        // Verwijdert de CSS-class wanneer de muis de rij verlaat.
        tableRow.addEventListener("mouseout", () => {
            tableRow.className = "";
        });
        
        // Voegt de volledig opgebouwde rij toe aan de tabel.
        addTableRow({table: gameTable, tableRow});
        
        });
    }
};
// Maakt de tabel, status en caption aan bij het opstarten van de pagina.
setTable();
setStatus();
setCaption();

// Controleert of een game favoriet is.
// Geeft true terug als de game favoriet is, false als dat niet zo is.
const isFavourite = (game) => {
    return game.isFavourite;
};

// Toont alleen de favoriete games wanneer op de favorietenknop wordt geklikt.
const favouriteButton = document.querySelector("#show-favourite");
favouriteButton.addEventListener("click", () => {
    // Verwijdert de huidige statusmelding.
    clearStatusMessage();
    // Verwijdert de huidige tekst of titel van de tabelcaption.
    clearCaption();
    // Maakt het invoerveld met de id "show-rating" leeg.
    clearSearchInput("show-rating");
    // Maakt het zoekveld met de id "search-games" leeg.
    clearSearchInput("search-games");
    
    // Toont alleen de games waarvoor isFavourite true teruggeeft.
    // Als er geen favoriete games zijn, verschijnt een boodschap.
    renderGames(games, isFavourite, "No favourite games found.");
})

// Toont alle games wanneer op de knop "show all" wordt geklikt.
const allButton = document.querySelector("#show-all");
allButton.addEventListener("click" , () => {
    clearStatusMessage();
    clearCaption();
    clearSearchInput("show-rating");
    clearSearchInput("search-games");

    renderGames(games);
})

// !status gewijzigd naar statusElement door waarschuwing van "is deprecated"
// Zoekt het status-element op.
// Reageert wanneer de muis over het status-element gaat.
const statusElement = document.querySelector("#status")

    statusElement.addEventListener("mouseover", () => {
    statusElement.setAttribute("style", "background-color: #89a9c6");
    });

    statusElement.addEventListener("mouseout", () => {
    statusElement.removeAttribute("style");
    });


// Genereert een willekeurige kleur door een willekeurige hue tussen 0 en 359 te kiezen.
// Geeft een kleur terug in het HSL-formaat.
const createColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

// Verandert de kleur van de hoofdtitel wanneer erop geklikt wordt.
const title = document.querySelector("h1");

    title.addEventListener("click", () => {
        title.setAttribute("style", `color: ${createColor()}`);
    })

// Reageert wanneer de gebruiker een rating invoert.
const ratingInput = document.getElementById("show-rating");
ratingInput.addEventListener("input", () => {
    // Haalt de ingevoerde waarde op.
    // En zet de ingevoerde waarde om naar een getal.
    const rating = Number(ratingInput.value);
    // Toont alleen games waarvan de rating hoger is dan de ingevoerde waarde.
    renderGames(games, (game) => game.rating > rating, 
        `There are no games with rating higher than "${rating}".`);
});

// Haalt eerst de games op van de server.
// await zorgt ervoor dat de code wacht totdat dit klaar is.
const fetchAndRenderGames = async () => {
    await fetchGames();
    // Toont daarna de opgehaalde games in de tabel.
    renderGames(games);
};

// Voert de functie uit.
fetchAndRenderGames();

// Zoekt games via op de server op basis van een zoekterm.
// Stuurt een GET-verzoek naar de server.
const searchByFetch = async (chars) => {
    const response = await fetch(`http://localhost:3000/games?query=${chars}`);
    
    return await response.json();    
};

// Past de caption van de tabel aan op basis van het zoekresultaat.
const updateCaption = (chars, result) => {
    const caption = document.querySelector("caption");
    // Controleert of er minstens één game gevonden is
     if (result.length > 0) {
        // Zet een tekst in de caption met de ingevoerde zoekterm.
        caption.innerHTML = `Games with name containing "${chars}"`;
    } else {
        // Als er geen games gevonden zijn, wordt de caption leeggemaakt.
        caption.innerHTML = "";
    }
};

// Voert een zoekopdracht uit en toont de resultaten.
const searchByFetchAndRender = async () => {
    // Zoekt het zoekveld met de id "search-games".
    const input = document.querySelector("#search-games");
    // Haalt de tekst op die de gebruiker heeft ingevoerd.
    const chars = input.value;
    // Verwijdert de huidige statusmelding.
    clearStatusMessage();

    // Controleert of het zoekveld leeg is.
    // Als dat zo is, worden alle games opnieuw weergegeven en stopt de functie.
    if(chars === "") {
        return renderGames(games);
    }
    // Zoekt via de server naar games waarvan de naam overeenkomt met de ingevoerde tekst.
    const result = await searchByFetch(input.value);

    // Toont een statusmelding met de zoekterm.
    addStatus(`Games with name containing "${chars}"`);
    // Past de tabelcaption aan.
    // Als er resultaten zijn, toont die caption de gebruikte zoekterm.
    updateCaption(chars, result);

    // Toont de zoekresultaten in de tabel.
    renderGames(result, undefined, `There are no games with name containing "${chars}".`);
};

// Zoekt de knop waarmee de zoekopdracht gestart wordt.
const getGameButton = document.querySelector("#get-games");
// Voert bij een klik de functie searchByFetchAndRender() uit.
getGameButton.addEventListener("click", () => {
    searchByFetchAndRender();
});

// Verandert de favoriete status van een game via server.
// Stuurt een POST-verzoek naar de server voor de game met het gegeven id.
// De server schakelt de favoriete status van deze game aan of uit.
const toggleFavourite = async (game) => {
   await fetch(`http://localhost:3000/games/${game.id}/favourite`, {
        method: "POST"
   });

    // Haalt de games opnieuw op en toont ze in de tabel.
    // Zo wordt de gewijzigde favoriete status zichtbaar.
   await fetchAndRenderGames();
    // Zoekt de bijgewerkte versie van dezelfde game in de nieuwe lijst.
   const updatedGame = games.find((gameFromList) => gameFromList.id === game.id);
   // Toont een statusmelding met de naam van de game en status van favourite.
   addStatus(`The game with name ${updatedGame.name} is now ${updatedGame.isFavourite ? "my favourite" : "not my favourite"}`);      
};

// Verwijdert een game via de server.
// Stuurt een DELETE-verzoek naar de server voor de game met dit id.
// De game wordt daardoor verwijderd.
const deleteGame = async (game) => {
   await fetch(`http://localhost:3000/games/${game.id}`, {
        method: "DELETE"
   });
   // Haalt de games opnieuw op zodat de verwijderde game uit de tabel verdwijnt.
   await fetchAndRenderGames();
   // Toont de verwijderingsmelding alleen wanneer er nog games in de library staan.
   if(games.length > 0) {
    const statusElement = document.getElementById("status");
        // Verwijdert bestaande statusberichten uit het statusgedeelte.
        statusElement.querySelectorAll("p").forEach((message) => {
            message.remove();
        });
        
        addStatus(`The game with name ${game.name} is now deleted.`);
    }
                
};
