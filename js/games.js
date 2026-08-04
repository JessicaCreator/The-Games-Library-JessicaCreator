const game1 = { name: "Fifa23", type: "football game", rating: 7.0, isFavourite: false};
const game2 = { name: "AOTennis 2", type: "tennis game", rating: 2.0, isFavourite: true};
const game3 = { name: "Elden Ring", type: "fantasy game", rating: 4.0, isFavourite: false};
const game4 = { name: "Horizon Forbidden West", type: "adventure game", rating: 3.5, isFavourite: false};
const game5 = { name: "Pokemon Legends: Arceus", type: "RPG game", rating: 3.0, isFavourite: true};
const game6 = { name: "GTA V", type: "open world game", rating: 5.0, isFavourite: true};
const game7 = { name: "Gran Turismo", type: "racing game", rating: 6.0, isFavourite: true};

const toString = (myGame) => {
    return `Name: ${myGame.name} - Type: ${myGame.type} - Rating: ${myGame.rating} - ${myGame.isFavourite ? "Favourite game": "Not a favourite game"}`;
};

const getAverageRating = () => {
    const average = (game1.rating + game2.rating + game3.rating + game4.rating + 
                    game5.rating + game6.rating + game7.rating)/7;
    return average
}

const getHighestRating = () => {
    let result = game1;

    if (game2.rating > result.rating) {
        result = game2;
    } 
    
    if (game3.rating > result.rating) {
        result = game3;
    } 
    
    if (game4.rating > result.rating) {
        result = game4;
    } 
    
    if (game5.rating > result.rating) {
        result = game5;
    }

    if (game6.rating > result.rating) {
        result = game6;
    }

    if (game7.rating > result.rating) {
        result = game7;
    }

    return result;
};

const highestGame = getHighestRating();

const isFavourite = (game) => {
    if (game.isFavourite ) {
        return true;
    } else {
        return false;
    }
};

const printFavouriteGames = () => {
    addStatus(isFavourite(game1) ? game1.name : "");
    addStatus(isFavourite(game2) ? game2.name : "");
    addStatus(isFavourite(game3) ? game3.name : "");
    addStatus(isFavourite(game4) ? game4.name : "");
    addStatus(isFavourite(game5) ? game5.name : "");
    addStatus(isFavourite(game6) ? game6.name : "");
    addStatus(isFavourite(game7) ? game7.name : "");
};

const printAllGames = () => {
    addStatus(toString(game1));
    addStatus(toString(game2));
    addStatus(toString(game3));
    addStatus(toString(game4));
    addStatus(toString(game5));
    addStatus(toString(game6));
    addStatus(toString(game7));

    addSubTitle("These are all the favourite games in the library");
    printFavouriteGames()

    addSubTitle("Some statistics... ");
    addStatus("Average rating: " + getAverageRating());
    addStatus (`${highestGame.name} is the game with the highest rating: ${highestGame.rating}`);
}

printAllGames();

