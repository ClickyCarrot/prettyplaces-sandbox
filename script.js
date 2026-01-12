// Game data - add your games here
const games = [
	{
		name: "Snake",
		icon: "🐍",
		description: "Classic snake game - eat food and grow longer!",
		path: "/embed/snake",
	},
	{
		name: "Tetris",
		icon: "🧩",
		description: "Stack the falling blocks and clear lines!",
		path: "/embed/tetris",
	},
	{
		name: "Pong",
		icon: "🏓",
		description: "Classic arcade game - hit the ball back and forth!",
		path: "/embed/pong",
	},
	// Add more games here as you create them
];

// Function to create game cards
function createGameCard(game) {
	const card = document.createElement("a");
	card.href = `${game.path}`;
	card.className = "game-card";

	card.innerHTML = `
        <span class="game-icon">${game.icon}</span>
        <h2 class="game-title">${game.name}</h2>
        <p class="game-description">${game.description}</p>
    `;

	return card;
}

// Load games into the grid
function loadGames() {
	const gamesGrid = document.getElementById("gamesGrid");

	if (!gamesGrid) {
		console.error("Games grid element not found");
		return;
	}

	games.forEach((game, index) => {
		const card = createGameCard(game);
		card.style.animationDelay = `${index * 0.1}s`;
		gamesGrid.appendChild(card);
	});
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", loadGames);
