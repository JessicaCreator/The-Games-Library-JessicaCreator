// Controleert via de server of er nog geen game bestaat met deze naam.
const nameIsUnique = async ({gameName}) => {
    // Stuurt een GET-verzoek naar de server met de naam van de game.
    const response = await fetch(`http://localhost:3000/games/name/${gameName}`);
    // Zet de JSON-response om naar een JavaScript-waarde.
    const result = await response.json(); 
    // Geeft true terug als de server geen bestaande game heeft gevonden.
    return result === null;
};

// Voegt een nieuwe game toe aan de library.
const addGame = async () => {
    // Haalt de waarden op die de gebruiker in het formulier heeft ingevuld.
    const name = document.querySelector("#name").value;
    const type = document.querySelector("#type").value;
    // De rating wordt omgezet naar een kommagetal.
    const rating = parseFloat(document.querySelector("#rating").value);

    // Controleert of de invoervelden name, type of rating leeg is.
    // Bij een lege waarde wordt een foutmelding getoond en stopt de functie.
    if (!name || !type ||  document.querySelector("#rating").value === "") {
        // Maakt de p-elementen uit het statusgedeelte leeg.
        clearStatusMessage();
        addStatusError("No empty values allowed for name, type and rating.");
        return;
    }

    // Controleert of de naam tussen 2 en 64 tekens lang is.
    // Als dat niet zo is, wordt een foutmelding getoond en stopt de functie.
    if (name.length < 2 || name.length > 64) {
        clearStatusMessage();
        addStatusError("The length of a name is invalid.");
        return;
    }

    // Controleert of rating een geldig getal tussen 0 en 10 is.
    // Bij een ongeldige waarde wordt een foutmelding getoond en stopt de functie.
    if (Number.isNaN(rating) || rating < 0 || rating >10) {
        clearStatusMessage();
        addStatusError("The rating is not valid. Give a number between 0 and 10.");
        return;
    }

    // Controleert of de gamenaam nog niet bestaat.
    // Als de naam niet(!) uniek is, wordt een foutmelding getoond en stopt de functie.
    if (!(await nameIsUnique({gameName: name}))) {
        clearStatusMessage();
        addStatusError("Game name must be unique in the library.");
        return;
    }

    // Maakt een object met de gegevens van de nieuwe game.
    const game =  {name, type, rating};

    // Stuurt de nieuwe game met een POST-verzoek naar de server.
    const response =  await fetch("http://localhost:3000/games", {
        method: "POST",
        // Geeft aan welk formaat wordt verwacht en verstuurd de gegevens.
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        // Zet het JavaScript-object om naar een JSON-string
        body: JSON.stringify(game)
    });

    // Controleert of het POST-verzoek succesvol was.
    if(response.ok){
        clearStatusMessage();
        // Toont een bevestiging dat de game werd toegevoegd.
        addStatus(`This game was added: ${game.name}, type game is: ${game.type}.`)
    } else {
        clearStatusMessage();
        // Toont een foutmelding wanneer verzoek niet succesvol verwerkt werd.
        addStatus("Something went wrong, the game cannot be added.");
    }
};

// Reageert wanneer het formulier wordt verzonden.
document.querySelector("#add-game-form")
.addEventListener("submit", (event) => {
    // Voorkomt dat de browser het formulier standaard verzendt en de pagina herlaadt.
    event.preventDefault();
    // Voert de functie uit die de nieuwe game toevoegt.
    addGame();
    // Maakt de drie invoervelden opnieuw leeg.
    clearSearchInput("name");
    clearSearchInput("type");
    clearSearchInput("rating");

})




