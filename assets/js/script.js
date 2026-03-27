// Game data with educational aliases
export const games = [
	{ name: "FNAF", eduName: "Physics Simulation", icon: "📐", path: "/embed/g/clFNAF.html" },
	{
		name: "Bacon May Die",
		eduName: "Health & Nutrition",
		icon: "🥗",
		path: "/embed/g/clbaconmaydie.html",
	},
	{
		name: "Baldi's Basics",
		eduName: "Math Fundamentals",
		icon: "📐",
		path: "/embed/g/clbaldisbasics.html",
	},
	{
		name: "Baseball Bros",
		eduName: "Sports Science",
		icon: "⚾",
		path: "/embed/g/clbaseballbros.html",
	},
	{ name: "Basket Bros", eduName: "Team Dynamics", icon: "🏀", path: "/embed/g/clbasketbros.html" },
	{
		name: "Basket Random",
		eduName: "Probability Studies",
		icon: "📊",
		path: "/embed/g/clbasketrandom.html",
	},
	{
		name: "Bloons TD4",
		eduName: "Strategic Planning",
		icon: "🎯",
		path: "/embed/g/clbloonsTD4.html",
	},
	{
		name: "Cheese Rolling",
		eduName: "Newton's Laws Lab",
		icon: "🔬",
		path: "/embed/g/clcheeserolling.html",
	},
	{ name: "Deltarune", eduName: "Creative Writing", icon: "✏️", path: "/embed/g/cldeltarune.html" },
	{ name: "Doom", eduName: "Computer History", icon: "💻", path: "/embed/g/cldoomdos.html" },
	{ name: "Drive Mad", eduName: "Driver Education", icon: "🚗", path: "/embed/g/cldrivemady.html" },
	{
		name: "Escape Road",
		eduName: "Problem Solving",
		icon: "🧩",
		path: "/embed/g/clescaperoad.html",
	},
	{ name: "Fallout", eduName: "Cold War History", icon: "📜", path: "/embed/g/clfallout.html" },
	{
		name: "Friday Night Funkin",
		eduName: "Music Theory",
		icon: "🎵",
		path: "/embed/g/clfridaynightfunkin.html",
	},
	{
		name: "Getaway Shootout",
		eduName: "Physics: Velocity",
		icon: "⚡",
		path: "/embed/g/clgetawayshootout.html",
	},
	{
		name: "House of Hazards",
		eduName: "Safety Training",
		icon: "⚠️",
		path: "/embed/g/clhouseofhazards.html",
	},
	{
		name: "Jacksmith",
		eduName: "Engineering Basics",
		icon: "🔧",
		path: "/embed/g/cljacksmith.html",
	},
	{ name: "OVO", eduName: "Geometry Course", icon: "📏", path: "/embed/g/clovofixed.html" },
	{
		name: "Papa's Freezeria",
		eduName: "Business Management",
		icon: "📈",
		path: "/embed/g/clpapasfreezeria.html",
	},
	{
		name: "Pokemon Emerald",
		eduName: "Biology: Ecosystems",
		icon: "🧬",
		path: "/embed/g/clpokemonemerald.html",
	},
	{
		name: "Ragdoll Archers",
		eduName: "Physics: Gravity",
		icon: "🍎",
		path: "/embed/g/clragdollarchers.html",
	},
	{ name: "Retro Bowl", eduName: "Statistics 101", icon: "📊", path: "/embed/g/clretrobowl.html" },
	{
		name: "Rooftop Snipers",
		eduName: "Architecture Study",
		icon: "🏛️",
		path: "/embed/g/clrooftopsnipers.html",
	},
	{ name: "Run 3", eduName: "Astronomy Course", icon: "🌌", path: "/embed/g/clrun3.html" },
	{
		name: "Snow Rider",
		eduName: "Winter Geography",
		icon: "🏔️",
		path: "/embed/g/clsnowrider.html",
	},
	{
		name: "Subway Surfers Beijing",
		eduName: "World Cultures",
		icon: "🌏",
		path: "/embed/g/clsubwaysurfersbeijing.html",
	},
	{
		name: "Super Mario 64",
		eduName: "3D Modeling Intro",
		icon: "🎮",
		path: "/embed/g/clsupermario64.html",
	},
	{ name: "TOMB", eduName: "Ancient History", icon: "🏺", path: "/embed/g/cltotm.html" },
];

// Check if we're in educational mode (default: true)
export function isEduMode() {
	const stored = localStorage.getItem("eduMode");
	return stored === null ? true : stored === "true";
}

export function toggleEduMode() {
	const current = isEduMode();
	localStorage.setItem("eduMode", (!current).toString());
	window.location.reload();
}

// Open in about:blank
export function openCloaked(url) {
	const win = window.open("about:blank", "_blank");
	if (!win) return false;
	win.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="UTF-8">
			<title>Learning Hub</title>
			<style>
				* { margin: 0; padding: 0; box-sizing: border-box; }
				body { overflow: hidden; background: #000; }
				iframe { width: 100%; height: 100vh; border: none; }
			</style>
		</head>
		<body>
			<iframe src="${url}"></iframe>
		</body>
		</html>
	`);
	win.document.close();
	return true;
}

// Function to create game cards with launch buttons
function createGameCard(game, eduMode) {
	const displayName = eduMode ? game.eduName : game.name;
	const card = document.createElement("div");
	card.className = "game-card";

	card.innerHTML = `
		<div class="game-icon">${game.icon}</div>
		<h2 class="game-title">${displayName}</h2>
		<div class="game-buttons">
			<a href="${game.path}" target="_blank" class="btn-launch">Open</a>
			<button class="btn-cloaked" data-path="${game.path}">about:blank</button>
		</div>
    `;

	// Add cloaked button handler
	const cloakedBtn = card.querySelector(".btn-cloaked");
	cloakedBtn.addEventListener("click", (e) => {
		e.preventDefault();
		openCloaked(game.path);
	});

	return card;
}

// Load games into the grid
function loadGames() {
	const gamesGrid = document.getElementById("gamesGrid");
	const coursesGrid = document.getElementById("coursesGrid");
	const eduMode = isEduMode();

	if (gamesGrid) {
		games.forEach((game, index) => {
			const card = createGameCard(game, eduMode);
			card.style.animationDelay = `${index * 0.1}s`;
			gamesGrid.appendChild(card);
		});
	}

	if (coursesGrid) {
		// Generate random progress for each course
		const progress = games.map(() => Math.floor(Math.random() * 80) + 10);

		games.forEach((game, index) => {
			const card = document.createElement("div");
			card.className = "course-card";
			card.innerHTML = `
				<div class="course-icon">${game.icon}</div>
				<h3>${game.name}</h3>
				<p>Interactive learning module</p>
				<div class="progress-bar"><div class="progress-fill" style="width: ${progress[index]}%"></div></div>
				<p class="progress-text">${progress[index]}% Complete</p>
				<div class="course-buttons">
					<a href="${game.path}" target="_blank" class="btn-open">Open</a>
					<button class="btn-cloak" data-path="${game.path}">about:blank</button>
				</div>
			`;
			const cloakBtn = card.querySelector(".btn-cloak");
			cloakBtn.addEventListener("click", () => openCloaked(game.path));
			coursesGrid.appendChild(card);
		});
	}

	if (!gamesGrid && !coursesGrid) {
		console.error("No games grid element found");
	}
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", loadGames);
