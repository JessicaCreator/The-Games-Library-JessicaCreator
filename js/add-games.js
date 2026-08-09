const nameIsUnique = async ({gameName}) => {
    const response = await fetch(`http://localhost:3000/games/name/${gameName}`);
    const result = await response.json(); 
    
    return result === null;
};


const addGame = async () => {
    const name = document.querySelector("#name").value;
    const type = document.querySelector("#type").value;
    const rating = parseFloat(document.querySelector("#rating").value);

    if (!name || !type ||  document.querySelector("#rating").value === "") {
        clearStatusMessage();
        addStatusError("No empty values allowed for name, type and rating.");
        return;
    }

    if (name.length < 2 || name.length > 64) {
        clearStatusMessage();
        addStatusError("The length of a name is invalid.");
        return;
    }

    if (Number.isNaN(rating) || rating < 0 || rating >10) {
        clearStatusMessage();
        addStatusError("The rating is not valid. Give a number between 0 and 10.");
        return;
    }

    if (!(await nameIsUnique({gameName: name}))) {
        clearStatusMessage();
        addStatusError("Game name must be unique in the library.");
        return;
    }


    const game =  {name, type, rating};

    const response =  await fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
  
        body: JSON.stringify(game)
    });

    if(response.ok){
        clearStatusMessage();
        addStatus(`Deze game werd toegevoegd: ${game.name}, type game is: ${game.type}.`)
    } else {
        clearStatusMessage();
        addStatus("Er is iets fout gelopen, de game kan niet worden toegevoegd.");
    }
};

document.querySelector("#add-game-form")
.addEventListener("submit", (event) => {
    event.preventDefault();
    addGame();
    clearSearchInput("name");
    clearSearchInput("type");
    clearSearchInput("rating");

})




