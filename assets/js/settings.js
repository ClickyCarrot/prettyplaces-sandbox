// Settings functionality
const DEFAULT_SETTINGS = {
	pageTitle: "Sandbox",
	faviconUrl: "assets/icons/favicon.svg",
	cloaking: false,
};

// Preset favicons
const FAVICONS = {
	default: {
		name: "Default",
		url: "assets/icons/favicon.svg",
	},
	google: {
		name: "Google",
		url: "https://www.google.com/favicon.ico",
	},
	classroom: {
		name: "Google Classroom",
		url: "https://www.gstatic.com/classroom/favicon.png",
	},
	gmail: {
		name: "Gmail",
		url: "https://www.gmail.com/favicon.ico",
	},
	drive: {
		name: "Google Drive",
		url: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png",
	},
	docs: {
		name: "Google Docs",
		url: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
	},
	sheets: {
		name: "Google Sheets",
		url: "https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico",
	},
	youtube: {
		name: "YouTube",
		url: "https://www.youtube.com/favicon.ico",
	},
	teams: {
		name: "Microsoft Teams",
		url: "https://statics.teams.cdn.office.net/evergreen-assets/favicon/favicon.ico",
	},
	outlook: {
		name: "Outlook",
		url: "https://outlook.live.com/favicon.ico",
	},
	custom: {
		name: "Custom URL",
		url: "",
	},
};

// Load settings from localStorage
function loadSettings() {
	const saved = localStorage.getItem("siteSettings");
	if (saved) {
		try {
			const parsed = JSON.parse(saved);
			// Migrate old settings - reset to defaults if favicon path is wrong
			if (parsed.faviconUrl === "favicon.svg" || !parsed.faviconUrl) {
				parsed.faviconUrl = DEFAULT_SETTINGS.faviconUrl;
			}
			return parsed;
		} catch (e) {
			console.error("Error loading settings:", e);
		}
	}
	return DEFAULT_SETTINGS;
}

// Save settings to localStorage
function saveSettings(settings) {
	localStorage.setItem("siteSettings", JSON.stringify(settings));
}

// Apply settings to the page
function applySettings(settings) {
	// Apply page title
	document.title = settings.pageTitle;

	// Apply favicon
	const faviconLink = document.querySelector('link[rel="icon"]');
	if (settings.faviconUrl) {
		faviconLink.href = settings.faviconUrl;
	}
}

// Convert hex to rgba
function hexToRgba(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Initialize settings modal
document.addEventListener("DOMContentLoaded", () => {
	const settings = loadSettings();
	applySettings(settings);

	const settingsBtn = document.getElementById("settingsBtn");
	const settingsModal = document.getElementById("settingsModal");

	if (!settingsBtn || !settingsModal) {
		console.error("Settings button or modal not found");
		return;
	}

	const closeSettings = document.getElementById("closeSettings");
	const saveSettingsBtn = document.getElementById("saveSettings");
	const resetSettingsBtn = document.getElementById("resetSettings");
	const pageTitleSelect = document.getElementById("pageTitle");
	const customPageTitleInput = document.getElementById("customPageTitle");
	const faviconSelect = document.getElementById("faviconSelect");
	const customFaviconInput = document.getElementById("customFaviconUrl");
	const cloakingToggle = document.getElementById("cloakingToggle");
	const openCloakedBtn = document.getElementById("openCloaked");

	// Populate favicon select
	Object.entries(FAVICONS).forEach(([key, favicon]) => {
		const option = document.createElement("option");
		option.value = key;
		option.textContent = favicon.name;
		faviconSelect.appendChild(option);
	});

	// Populate form with current settings
	function populateForm(currentSettings) {
		// Set page title
		const presetOptions = Array.from(pageTitleSelect.options)
			.map((opt) => opt.value)
			.filter((val) => val !== "Custom");
		if (presetOptions.includes(currentSettings.pageTitle)) {
			pageTitleSelect.value = currentSettings.pageTitle;
			customPageTitleInput.style.display = "none";
		} else {
			pageTitleSelect.value = "Custom";
			customPageTitleInput.style.display = "block";
			customPageTitleInput.value = currentSettings.pageTitle;
		}

		// Set favicon
		const currentFaviconUrl = currentSettings.faviconUrl || DEFAULT_SETTINGS.faviconUrl;
		const faviconKey = Object.keys(FAVICONS).find((key) => FAVICONS[key].url === currentFaviconUrl);
		if (faviconKey && faviconKey !== "custom") {
			faviconSelect.value = faviconKey;
			customFaviconInput.style.display = "none";
			customFaviconInput.value = "";
		} else {
			faviconSelect.value = "custom";
			customFaviconInput.style.display = "block";
			customFaviconInput.value =
				currentFaviconUrl === "assets/icons/favicon.svg" ? "" : currentFaviconUrl;
		}

		// Set cloaking
		cloakingToggle.checked = currentSettings.cloaking || false;
		openCloakedBtn.style.display = currentSettings.cloaking ? "block" : "none";
	}

	populateForm(settings);

	// Show settings modal
	settingsBtn.addEventListener("click", () => {
		populateForm(loadSettings());
		settingsModal.classList.add("active");
	});

	// Close settings modal
	closeSettings.addEventListener("click", () => {
		settingsModal.classList.remove("active");
	});

	settingsModal.addEventListener("click", (e) => {
		if (e.target === settingsModal) {
			settingsModal.classList.remove("active");
		}
	});

	// Handle page title select change
	pageTitleSelect.addEventListener("change", () => {
		if (pageTitleSelect.value === "Custom") {
			customPageTitleInput.style.display = "block";
			customPageTitleInput.focus();
		} else {
			customPageTitleInput.style.display = "none";
		}
	});

	// Handle favicon select change
	faviconSelect.addEventListener("change", () => {
		if (faviconSelect.value === "custom") {
			customFaviconInput.style.display = "block";
			customFaviconInput.focus();
		} else {
			customFaviconInput.style.display = "none";
		}
	});

	// Save settings
	saveSettingsBtn.addEventListener("click", () => {
		let pageTitle = pageTitleSelect.value;
		if (pageTitle === "Custom") {
			pageTitle = customPageTitleInput.value || DEFAULT_SETTINGS.pageTitle;
		}

		let faviconUrl = DEFAULT_SETTINGS.faviconUrl;
		if (faviconSelect.value === "custom") {
			faviconUrl = customFaviconInput.value || DEFAULT_SETTINGS.faviconUrl;
		} else {
			faviconUrl = FAVICONS[faviconSelect.value].url;
		}

		const newSettings = {
			pageTitle: pageTitle,
			faviconUrl: faviconUrl,
			cloaking: cloakingToggle.checked,
		};

		saveSettings(newSettings);
		applySettings(newSettings);
		openCloakedBtn.style.display = cloakingToggle.checked ? "block" : "none";
		settingsModal.classList.remove("active");
	});

	// Reset settings
	resetSettingsBtn.addEventListener("click", () => {
		if (confirm("Are you sure you want to reset all settings to default?")) {
			saveSettings(DEFAULT_SETTINGS);
			applySettings(DEFAULT_SETTINGS);
			populateForm(DEFAULT_SETTINGS);
		}
	});

	// Handle cloaking toggle change
	cloakingToggle.addEventListener("change", () => {
		openCloakedBtn.style.display = cloakingToggle.checked ? "block" : "none";
	});

	// Open cloaked window
	openCloakedBtn.addEventListener("click", () => {
		if (typeof window.openCloaked === "function") {
			window.openCloaked(window.location.origin + "/", "_blank");
			return;
		}
		const cloakedWindow = window.open("about:blank", "_blank");
		if (!cloakedWindow) return;
		cloakedWindow.document.write(`
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<title>${document.title}</title>
				<link rel="icon" type="image/svg+xml" href="${document.querySelector('link[rel="icon"]').href}">
				<style>
					* { margin: 0; padding: 0; box-sizing: border-box; }
					body { overflow: hidden; }
					iframe { width: 100%; height: 100vh; border: none; }
				</style>
			</head>
			<body>
				<iframe src="${window.location.origin + "/"}"></iframe>
			</body>
			</html>
		`);
		cloakedWindow.document.close();
	});

	// Close on Escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && settingsModal.classList.contains("active")) {
			settingsModal.classList.remove("active");
		}
	});
});
