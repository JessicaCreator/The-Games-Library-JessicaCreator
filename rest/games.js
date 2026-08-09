const games = [
{ name: "Fifa23", type: "football game", rating: 7.0, isFavourite: false},
{ name: "AOTennis 2", type: "tennis game", rating: 2.0, isFavourite: true},
{ name: "Elden Ring", type: "fantasy game", rating: 4.0, isFavourite: false},
{ name: "Horizon Forbidden West", type: "adventure game", rating: 3.5, isFavourite: false},
{ name: "Pokemon Legends: Arceus", type: "RPG game", rating: 3.0, isFavourite: true},
{ name: "GTA V", type: "open world game", rating: 5.0, isFavourite: true},
{ name: "Gran Turismo", type: "racing game", rating: 6.0, isFavourite: true}];

const friendGames = [
{ name: "Minecraft", type: "open world game", rating: 5.0, isFavourite: true},
{ name: "Tetris", type: "puzzle game", rating: 5.0, isFavourite: false}
];

const allGames = [...games, ...friendGames];


const toString = (myGame) => {
    return `Name: ${myGame.name} - Type: ${myGame.type} - Rating: ${myGame.rating} - ${myGame.isFavourite ? "Favourite game": "Not a favourite game"}`;
};

const getAverageRating = (listOfGames) => {
    let som = 0;

    listOfGames.forEach((game) => {
        som += game.rating;
    });
    
    const average = (som/listOfGames.length).toFixed(1);
    return average;
}

const getHighestRating = (listOfGames) => {
    let result = listOfGames[0];

    listOfGames.forEach((game) => {
        if(game.rating > result.rating){
            result = game;
        }    
    });
    return result;
};

const printGamesRatingAbove = (listOfGames,rating) => {
    listOfGames
    .filter((game) => (game.rating > rating))
    .forEach((game) => {
        addStatus(toString(game));
    });
};

const filterAndPrintGames = (listOfGames, customFilter) => {
    listOfGames
    .filter(customFilter)
    .forEach((game) => {
        addStatus(toString(game));
    });
};

const type = "open world game"
const isType = (game) => game.type === type;

const isFavourite = (game) => {
    return game.isFavourite;
};

const printFavouriteGames = (listOfGames) => {
    listOfGames
    .filter((game) => isFavourite(game))
    .forEach((game) => {
        addStatus(game.name);
    });
};

const printAllGames = (listOfGames) => {
    const highestGame = getHighestRating(listOfGames);

    listOfGames
    .map(toString)
    .forEach((game) => {
        addStatus(game);
    });

    if(listOfGames.length > 0){

        addSubTitle("Favourite games in the library");
        printFavouriteGames(listOfGames);

        addSubTitle("Some statistics...");

    
        addStatus(`Average rating: ${getAverageRating(listOfGames)}`);
        addStatus (`${highestGame.name} is the game with the highest rating: ${highestGame.rating}`);

        if (listOfGames.length >= 2) {
            addSubTitle("The first 2 games are");
            addStatus(listOfGames[0].name);
            addStatus(listOfGames[1].name); 
        } 

    } else {
        addStatus("Er zijn geen games beschikbaar");
    }  
    
}

addSubTitle("My own games");
printAllGames(games);

addSubTitle("My best friend's games");
printAllGames(friendGames);

addSubTitle("All the games in our library");
printAllGames(allGames);

const rating = 3
addSubTitle(`These are all games with rating above ${rating}`);
printGamesRatingAbove(games,rating);

addSubTitle("Favourite games");
filterAndPrintGames(games, isFavourite);

addSubTitle(`These games have type "${type}"`);
filterAndPrintGames(games, isType);

