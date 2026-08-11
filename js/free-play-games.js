const data = [];

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
    const result = await response.json();
    // console.log("Data is: ", result);
    
    data.push(...result);   
};

const createGameCard = (game) => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = game.thumbnail;
    img.alt = game.title;

    const title = document.createElement("h3");
    title.textContent = game.title;

    const favourite = document.createElement("span");
    if (game.isFavourite) {
        favourite.textContent = "★";
    } else {
        favourite.textContent = "☆";
    }       

    favourite.addEventListener("click", () => {
    game.isFavourite = !game.isFavourite;

    if (game.isFavourite) {
        favourite.textContent = "★";
    } else {
        favourite.textContent = "☆";
    }
    });

    const genre = document.createElement("p");
    genre.textContent = `Genre: ${game.genre}`;

    const platform = document.createElement("p");
    platform.textContent = `Plaform: ${game.platform}`;

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

const renderData = (listOfGames) => {
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.innerHTML = "";

    console.log(gamesContainer);
    console.log(listOfGames);

    listOfGames.forEach((game) => {
        const card = createGameCard(game);
        gamesContainer.appendChild(card);
    });
};

const fetchAndRenderData = async () => {
    await fetchData();
    renderData(data);
}

fetchAndRenderData();

//---

const searchGames = (listOfGames, searchText) => {
    return listOfGames.filter((game) =>
        game.title.toLowerCase().includes(searchText.toLowerCase())
    );
};

const searchInput = document.getElementById("search-games");

searchInput.addEventListener("input", () => {
    filterAndSortGames();
});

//----

const filterByPlatform = (listOfGames, platform) => {
    return listOfGames.filter((game) =>
        game.platform.toLowerCase().includes(platform.toLowerCase())
    );
};

const platformInput = document.getElementById("platform");

platformInput.addEventListener("input", () => {
    filterAndSortGames();
});

//----

const filterByCategory = (listOfGames, category) => {
    return listOfGames.filter((game) =>
        game.genre.toLowerCase().includes(category.toLowerCase())
    );
};

const categoryInput = document.getElementById("category");

categoryInput.addEventListener("input", () => {
    filterAndSortGames();
});

//----

const sortGames = (listOfGames, sortOption) => {
    const sortedGames = [...listOfGames];

    if (sortOption === "title-asc") {
        sortedGames.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "title-desc") {
        sortedGames.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortOption === "newest") {
        sortedGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    if (sortOption === "oldest") {
        sortedGames.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    return sortedGames;
};

const sortInput = document.getElementById("sort");

sortInput.addEventListener("change", () => {
    filterAndSortGames();
});

//---

let showFavourites = false;

const filterAndSortGames = () => {
    let filteredGames = [...data];

    if (showFavourites) {
    filteredGames = filterFavouriteGames(filteredGames);
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

    renderData(filteredGames);

};

//---

const isFavourite = (game) => {
    return game.isFavourite;
};

const filterFavouriteGames = (listOfGames) => {
    return listOfGames.filter(isFavourite);
};

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