const addGame = async () => {
    const name = document.querySelector("#name").value;
    const type = document.querySelector("#type").value;
    const rating = parseFloat(document.querySelector("#rating").value);

     if (name === "" || type === "" || isNaN(rating)) {
        clearStatusMessage();
        addStatus("Vul de velden in om een game toe te voegen.");
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

