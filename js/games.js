const games = [
{ name: "Fifa23", type: "football game", rating: 7.0, isFavourite: false},
{ name: "AOTennis 2", type: "tennis game", rating: 2.0, isFavourite: true},
{ name: "Elden Ring", type: "fantasy game", rating: 4.0, isFavourite: false},
{ name: "Horizon Forbidden West", type: "adventure game", rating: 3.5, isFavourite: false},
{ name: "Pokemon Legends: Arceus", type: "RPG game", rating: 3.0, isFavourite: true},
{ name: "GTA V", type: "open world game", rating: 5.0, isFavourite: true},
{ name: "Gran Turismo", type: "racing game", rating: 6.0, isFavourite: true}];

const [firstGame, secondGame] = games;

const toString = (myGame) => {
    return `Name: ${myGame.name} - Type: ${myGame.type} - Rating: ${myGame.rating} - ${myGame.isFavourite ? "Favourite game": "Not a favourite game"}`;
};

const getAverageRating = () => {
    let som = 0;

    for(const game of games){
        som += game.rating;
    }
    const average = (som/games.length).toFixed(1);
    return average
}

const getHighestRating = () => {
    let result = games[0];

    for(const game of games){
        if(game.rating > result.rating){
            result = game;
        }
    }
    return result;
};

const highestGame = getHighestRating();

const isFavourite = (game) => {
    return game.isFavourite;
};

const printFavouriteGames = () => {
    for (const game of games) {
        if(isFavourite(game)) {
            addStatus(game.name)
        }
    }  
};

const printAllGames = () => {
    for(const game of games) {
        addStatus(toString(game));
    }


    if(games.length > 0){

        addSubTitle("These are all the favourite games in the library");
        printFavouriteGames()

        addSubTitle("Some statistics... ");

    
        addStatus(`Average rating: ${getAverageRating()}`);
        addStatus (`${highestGame.name} is the game with the highest rating: ${highestGame.rating}`);

        if (games.length >= 2) {
            addSubTitle("My first 2 games are: ");
            addStatus(firstGame.name);
            addStatus(secondGame.name); 
        } 

    } else {
        addStatus("Er zijn geen games beschikbaar");
    }  

    
}

printAllGames();

