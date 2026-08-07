const addGame = async () => {
    const name = document.querySelector("#name").value;
    const type = document.querySelector("#type").value;
    const rating = parseFloat(document.querySelector("#rating").value);

    const game =  {name, type, rating};

    const response =  await fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
  
        body: JSON.stringify(game)
    });
    
    addStatus(`Deze game werd toegevoegd: ${game.name}, type game is: ${game.type}.`)
};

document.querySelector("#add-game-form")
.addEventListener("submit", (event) => {
    event.preventDefault();
    addGame();
})

