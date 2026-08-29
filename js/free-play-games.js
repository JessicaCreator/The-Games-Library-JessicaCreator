// Variabele met lege array.
// Bevat alle games die via de API worden opgehaald.
const data = [];

// Bepaalt of alleen favoriete games worden weergegeven.
let showFavourites = false;

/*----- Functions -----*/
// Asynchrone functie wacht op netwerkantwoord.
// Stuurt GET-verzoek.
// Haalt alle games op via de API en voegt ze toe aan de data-array.
const fetchData = async () => {
    const response = await fetch(
        "https://free-to-play-games-database.p.rapidapi.com/api/games", 
    {
        headers: {
            "x-rapidapi-key": "69d394afaamshc3794aa872a1811p16ab50jsn2007cd240f23",
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
        }
    }
    );
    // Controleert of de server een succesvolle response heeft teruggestuurd.
    // Zet antwoord om van JSON naar een JavaScript-array met games. 
    if (response.ok) {
        const result = await response.json();
        // Voegt alle opgehaalde games toe aan de bestaande data-array.
        data.push(...result);
    } else {
        // Toont een foutmelding wanneer de games niet opgehaald kunnen worden.
        addMessage("Unable to load games.");
    }
};

// Maakt een HTML-kaart aan voor één game.
const createGameCard = (game) => {
    // Maakt een nieuw HTML-element "article" aan.
    const card = document.createElement("article");
    // Geeft het article-element de CSS-klasse "card".
    card.className = "card";

    // Maakt de afbeelding van de game aan.
    const img = document.createElement("img");
    img.src = game.thumbnail;
    img.alt = game.title;

    // Maakt de titel van de game aan.
    const title = document.createElement("h3");
    title.textContent = game.title;

    // Maakt de knop waarmee de game als favoriet kan worden aangeduid.
    const favourite = document.createElement("button");
    favourite.className = "star-button";

    // Zorgt ervoor dat de juiste ster wordt weergegeven.
    updateFavouriteButton(favourite, game);

    // Wisselt de favoriete status wanneer op de ster wordt geklikt.
    favourite.addEventListener("click", () => {
    game.isFavourite = !game.isFavourite;
    // Past de ster aan na het wijzigen van de favoriete status.
    updateFavouriteButton(favourite, game);
    });
    // Maakt een div class "card-header" aan
    // Bevat de titel en de favoriete knop.
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header"

    // Toont het genre van de game.
    const genre = document.createElement("p");
    genre.textContent = `Genre: ${game.genre}`;

    // Toont het platform waarop de game gespeeld kan worden.
    const platform = document.createElement("p");
    platform.textContent = `Platform: ${game.platform}`;

    // Toont de releasedatum van de game.
    const releaseDate = document.createElement("p");
    releaseDate.textContent = `Release date: ${game.release_date}`;

    // Maakt een link naar de game aan.
    const link = document.createElement("a");
    link.className = "btn-primary";
    link.href = game.game_url;
    link.textContent = "Play game";
    // Opent de game in een nieuw tabblad.
    link.target = "_blank";
    
    // Bouwt de structuur van de gamekaart op.
    // Met appendChild() voegen we alle elementen toe.
    cardHeader.appendChild(title);
    cardHeader.appendChild(favourite);
    card.appendChild(img);
    card.appendChild(cardHeader);
    card.appendChild(genre);
    card.appendChild(platform);
    card.appendChild(releaseDate);
    card.appendChild(link);

    // Geeft de volledig opgebouwde kaart terug.
    return card;
};
// Toont een lijst met games op de pagina.
const renderData = (listOfGames, emptyMessage = "No games found.") => {
    const gamesContainer = document.getElementById("games-container");
    // Verwijdert eerst de huidige inhoud zodat de resultaten opnieuw opgebouwd kunnen worden.
    gamesContainer.innerHTML = "";

    // Als de lijst leeg is, wordt een passende melding weergegeven.
    if(listOfGames.length === 0) {
        addMessage(emptyMessage);
        return;
    }

    // Maakt voor iedere game een kaart en voegt die toe aan de container.
    listOfGames.forEach((game) => {
        const card = createGameCard(game);
        gamesContainer.appendChild(card);
    });
};

// Haalt eerst de games op en toont ze daarna op de pagina.
const fetchAndRenderData = async () => {
    await fetchData();
    renderData(data);
}

// Geeft alleen games terug waarvan de titel overeenkomt met de zoekterm.
const searchGames = (listOfGames, searchText) => {
    return listOfGames.filter((game) =>
        game.title.toLowerCase().includes(searchText.toLowerCase())
    );
};

// Geeft alleen games terug die op het gekozen platform beschikbaar zijn.
const filterByPlatform = (listOfGames, platform) => {
    return listOfGames.filter((game) =>
        game.platform.toLowerCase().includes(platform.toLowerCase())
    );
};

// Geeft alleen games terug die tot het gekozen genre behoren.
const filterByCategory = (listOfGames, category) => {
    return listOfGames.filter((game) =>
        game.genre.toLowerCase().includes(category.toLowerCase())
    );
};

// Sorteert de games volgens de gekozen sorteeroptie.
const sortGames = (listOfGames, sortOption) => {
    // Maakt eerst een kopie zodat de oorspronkelijke lijst niet rechtstreeks wordt aangepast.
    const sortedGames = [...listOfGames];

    if (sortOption === "title-asc") {
        // Sorteert de titels alfabetisch van A naar Z.
        sortedGames.sort((a, b) => a.title.localeCompare(b.title));

    } else if (sortOption === "title-desc") {
        // Sorteert de titels alfabetisch van Z naar A.
        sortedGames.sort((a, b) => b.title.localeCompare(a.title));

    } else if (sortOption === "newest") {
        // Zet de nieuwste releasedatum eerst.
        sortedGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

    } else if (sortOption === "oldest") {
        // Zet de oudste releasedatum eerst.
        sortedGames.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    }  return sortedGames;
};

// Past alle actieve filters en de gekozen sortering toe.
const filterAndSortGames = () => {
    // Maakt eerst een kopie van de data zodat de oorspronkelijke data niet rechtstreeks wordt aangepast.
    let filteredGames = [...data];

    // Standaardmelding wanneer er geen games gevonden worden.
    let emptyMessage = "No games found.";
    
    // Als de favorietenmodus actief is, worden eerst alleen favorieten behouden.
    if (showFavourites) {
        filteredGames = filterFavouriteGames(filteredGames);
        // Aangepaste melding wanneer er geen favorieten zijn.
        if(filteredGames.length === 0){
            emptyMessage = "No favourite games found.";
        }
    }

    // Haalt de huidige waarde van het zoekveld op.
    const searchText = document.getElementById("search-games").value;

    // Past de zoekfilter alleen toe wanneer er iets ingevuld is.
    if (searchText !== "") {
        filteredGames = searchGames(filteredGames, searchText);
    }

    // Haalt het gekozen platform op.
    const platformInput = document.getElementById("platform").value;

    // Past de platformfilter alleen toe wanneer er een platform gekozen is.
    if (platformInput !== "") {
        filteredGames = filterByPlatform(filteredGames, platformInput);
    }

    // Haalt het gekozen genre op.
    const categoryInput = document.getElementById("category").value;

    // Past de categoriefilter alleen toe wanneer er een genre gekozen is.
    if (categoryInput !== "") {
        filteredGames = filterByCategory(filteredGames, categoryInput);
    }

    // Haalt de gekozen sorteeroptie op.
    const sortInput = document.getElementById("sort").value;

    // Sorteert de overgebleven games wanneer een sorteeroptie gekozen is.
    if (sortInput) {
        filteredGames = sortGames(filteredGames, sortInput);
    }

    // Geeft een melding wanneer de combinatie van favorieten en andere filters geen resultaat opleverd.
    if (showFavourites && filteredGames.length === 0 && emptyMessage !== "No favourite games found.") {
        emptyMessage = "No games found in favourite.";
    }
    // Toont het uiteindelijke resultaat op de pagina.
    renderData(filteredGames, emptyMessage);

};

// Past het uiterlijk en symbool van de favoriete knop aan.
const updateFavouriteButton = (button, game) => {
    if (game.isFavourite) {
        // ★ wordt getoond wanneer de game favoriet is.
        button.textContent = "★";
        button.classList.add("favourite-active");
    } else {
        // ☆ wordt getoond wanneer de game geen favoriet is.
        button.textContent = "☆";
        button.classList.remove("favourite-active");
    }
};

// Geeft true of false terug afhankelijk van de favoriete status van een game.
const isFavourite = (game) => {
    return game.isFavourite;
};

// Geeft alleen de games terug die als favoriet aangeduid zijn.
const filterFavouriteGames = (listOfGames) => {
    return listOfGames.filter(isFavourite);
};

// Toont een boodschap in de games-container.
const addMessage = (message) => {
    const gamesContainer = document.getElementById("games-container");

    const messageElement = document.createElement("p");
    messageElement.textContent = message;

    // Geeft de melding de juiste CSS-klasse voor foutmeldingen.
    messageElement.className = "message-error";

    // Voeg de boodschap toe aan de games-container op de pagina
    gamesContainer.appendChild(messageElement);
};


/*----- EventListeners - buttons -----*/

// Zoekt de input van het zoekveld op.
const searchInput = document.getElementById("search-games");

// Filtert de games opnieuw bij iedere wijziging in het zoekveld.
searchInput.addEventListener("input", () => {
    filterAndSortGames();
});

// Zoekt het platformselectievak op.
const platformInput = document.getElementById("platform");

// Filtert de games opnieuw wanneer een ander platform gekozen wordt.
platformInput.addEventListener("change", () => {
    filterAndSortGames();
});

// Zoekt het categorieselectievak op.
const categoryInput = document.getElementById("category");

// Filtert de games opnieuw wanneer de categorie verandert.
categoryInput.addEventListener("input", () => {
    filterAndSortGames();
});

// Zoekt het sorteervak op.
const sortInput = document.getElementById("sort");

// Sorteert de games opnieuw wanneer een andere optie gekozen wordt.
sortInput.addEventListener("change", () => {
    filterAndSortGames();
});

// Toont alleen de favoriete games wanneer op de favorietenknop wordt geklikt.
const favouriteButton = document.querySelector("#show-favourite");
favouriteButton.addEventListener("click", () => {
    // Wis eerst alle actieve zoek- en filtervelden.
    clearSearchInput("search-games");
    clearSearchInput("platform");
    clearSearchInput("category");

    // Activeert de favorietenmodus.
    showFavourites = true;
    // Past de filters en sortering opnieuw toe.
    filterAndSortGames();

});

// Toont alle games opnieuw wanneer op de knop "show all" wordt geklikt.
const allButton = document.querySelector("#show-all");
allButton.addEventListener("click" , () => {
    // Wis eerst alle actieve zoek- en filtervelden.
    clearSearchInput("search-games");
    clearSearchInput("platform");
    clearSearchInput("category");
    
    // Schakelt de favorietenmodus uit.
    showFavourites = false;

    // Toont opnieuw de volledige dataset.
    renderData(data);
});


/*----- Start applicatie -----*/
// Start het ophalen en weergeven van de games wanneer het script uitgevoerd wordt.
fetchAndRenderData();