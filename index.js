// import the JSON data about the crowd-funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// calculate the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// grab the element to display the number of unfunded games
const numUnfundedGamesElement = document.getElementById("num-unfunded-games");

// set the inner HTML of the element to the number of unfunded games
numUnfundedGamesElement.innerHTML = numUnfundedGames;

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
	// iterate over each game in the games array
	games.forEach((game) => {
		// create a new div element for the game card
		const gameCard = document.createElement("div");
		// add the class "game-card" to the div's class list
		gameCard.classList.add("game-card");

		// set the inner HTML of the game card using template literals
		gameCard.innerHTML = `
      <h3>${game.name}</h3>
      <img class="game-img" src="${game.img}" alt="${game.name}">
      <p>Backers: ${game.backers}</p>
      <p>Pledged: $${game.pledged.toLocaleString()}</p>
    `;

		// append the game card to the games container
		gamesContainer.appendChild(gameCard);
	});
}

// call the function with the correct variable to add all the games to the page
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
	deleteChildElements(gamesContainer);

	// use filter() to get a list of games that have not yet met their goal
	const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

	// use the function we previously created to add the unfunded games to the DOM
	addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
	deleteChildElements(gamesContainer);

	// use filter() to get a list of games that have met or exceeded their goal
	const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

	// use the function we previously created to add funded games to the DOM
	addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
	deleteChildElements(gamesContainer);

	// add all games from the JSON data to the DOM
	addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((game1, game2) => game2.pledged - game1.pledged);

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames.slice(0, 2);

// create a new element to hold the name of the top pledged game, then append it to the correct element
const firstGameNameElement = document.createElement("p");
firstGameNameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameNameElement);

// do the same for the runner-up item
const secondGameNameElement = document.createElement("p");
secondGameNameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameNameElement);

/*************************************************************************************
 * Challenge 9: Implement search functionality
 * Skills used: input event, filter
 */

const searchInput = document.getElementById("search-input");

function handleSearch() {
	const searchTerm = searchInput.value.trim().toLowerCase();
	const filteredGames = GAMES_JSON.filter((game) => game.name.toLowerCase().includes(searchTerm));

	deleteChildElements(gamesContainer);
	addGamesToPage(filteredGames);
}

searchInput.addEventListener("input", handleSearch);
