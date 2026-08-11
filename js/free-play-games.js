const data = [];
let showFavourites = false;

/*----- Functions -----*/
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
        
    if (response.ok) {
        const result = await response.json();
        data.push(...result);
    } else {
        addMessage("Unable to load games.");
    }
};

const createGameCard = (game) => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = game.thumbnail;
    img.alt = game.title;

    const title = document.createElement("h3");
    title.textContent = game.title;

    const favourite = document.createElement("button");
    favourite.className = "star-button";

    updateFavouriteButton(favourite, game);

    favourite.addEventListener("click", () => {
    game.isFavourite = !game.isFavourite;

    updateFavouriteButton(favourite, game);
    });

    const genre = document.createElement("p");
    genre.textContent = `Genre: ${game.genre}`;

    const platform = document.createElement("p");
    platform.textContent = `Platform: ${game.platform}`;

    const link = document.createElement("a");
    link.className = "btn-primary";
    link.href = game.game_url;
    link.textContent = "Play game";
    link.target = "_blank";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(favourite);
    card.appendChild(genre);
    card.appendChild(platform);
    card.appendChild(link);

    return card;
};

const renderData = (listOfGames, emptyMessage = "No games found.") => {
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.innerHTML = "";

    if(listOfGames.length === 0) {
        addMessage(emptyMessage);
        return;
    }

    listOfGames.forEach((game) => {
        const card = createGameCard(game);
        gamesContainer.appendChild(card);
    });
};

const fetchAndRenderData = async () => {
    await fetchData();
    renderData(data);
}

const searchGames = (listOfGames, searchText) => {
    return listOfGames.filter((game) =>
        game.title.toLowerCase().includes(searchText.toLowerCase())
    );
};

const filterByPlatform = (listOfGames, platform) => {
    return listOfGames.filter((game) =>
        game.platform.toLowerCase().includes(platform.toLowerCase())
    );
};

const filterByCategory = (listOfGames, category) => {
    return listOfGames.filter((game) =>
        game.genre.toLowerCase().includes(category.toLowerCase())
    );
};

const sortGames = (listOfGames, sortOption) => {
    const sortedGames = [...listOfGames];

    if (sortOption === "title-asc") {
        sortedGames.sort((a, b) => a.title.localeCompare(b.title));

    } else if (sortOption === "title-desc") {
        sortedGames.sort((a, b) => b.title.localeCompare(a.title));

    } else if (sortOption === "newest") {
        sortedGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

    } else if (sortOption === "oldest") {
        sortedGames.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    }  return sortedGames;
};

const filterAndSortGames = () => {
    let filteredGames = [...data];

    let emptyMessage = "No games found.";
    
    if (showFavourites) {
        filteredGames = filterFavouriteGames(filteredGames);

        if(filteredGames.length === 0){
            emptyMessage = "No favourite games found.";
        }
    }

    const searchText = document.getElementById("search-games").value;

    if (searchText !== "") {
        filteredGames = searchGames(filteredGames, searchText);
    }

    const platformInput = document.getElementById("platform").value;

    if (platformInput !== "") {
        filteredGames = filterByPlatform(filteredGames, platformInput);
    }

    const categoryInput = document.getElementById("category").value;

    if (categoryInput !== "") {
        filteredGames = filterByCategory(filteredGames, categoryInput);
    }

    const sortInput = document.getElementById("sort").value;

    if (sortInput) {
        filteredGames = sortGames(filteredGames, sortInput);
    }

    if (showFavourites && filteredGames.length === 0 && emptyMessage !== "No favourite games found.") {
        emptyMessage = "No games found in favourite.";
    }

    renderData(filteredGames, emptyMessage);

};

const updateFavouriteButton = (button, game) => {
    if (game.isFavourite) {
        button.textContent = "★";
    } else {
        button.textContent = "☆";
    }
};

const isFavourite = (game) => {
    return game.isFavourite;
};

const filterFavouriteGames = (listOfGames) => {
    return listOfGames.filter(isFavourite);
};

const addMessage = (message) => {
    const gamesContainer = document.getElementById("games-container");

    const messageElement = document.createElement("p");
    messageElement.textContent = message;

    messageElement.className = "message-error";

    gamesContainer.appendChild(messageElement);
};


/*----- EventListeners - buttons -----*/
const searchInput = document.getElementById("search-games");

searchInput.addEventListener("input", () => {
    filterAndSortGames();
});

const platformInput = document.getElementById("platform");

platformInput.addEventListener("input", () => {
    filterAndSortGames();
});

const categoryInput = document.getElementById("category");

categoryInput.addEventListener("input", () => {
    filterAndSortGames();
});

const sortInput = document.getElementById("sort");

sortInput.addEventListener("change", () => {
    filterAndSortGames();
});

const favouriteButton = document.querySelector("#show-favourite");
favouriteButton.addEventListener("click", () => {
    clearSearchInput("search-games");
    clearSearchInput("platform");
    clearSearchInput("category");

    showFavourites = true;
    filterAndSortGames();

});

const allButton = document.querySelector("#show-all");
allButton.addEventListener("click" , () => {
    clearSearchInput("search-games");
    clearSearchInput("platform");
    clearSearchInput("category");
    
    showFavourites = false;
    renderData(data);
});


/*-----  -----*/
fetchAndRenderData();