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
