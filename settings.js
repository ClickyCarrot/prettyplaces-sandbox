// Settings functionality
const DEFAULT_SETTINGS = {
	pageTitle: "Sandbox Hub - For your sandboxing needs",
	faviconUrl: "favicon.svg",
	primaryColor: "#6366f1",
	secondaryColor: "#8b5cf6",
	accentColor: "#ec4899",
};

// Load settings from localStorage
function loadSettings() {
	const saved = localStorage.getItem("siteSettings");
	if (saved) {
		try {
			return JSON.parse(saved);
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

	// Apply theme colors
	document.documentElement.style.setProperty("--primary-color", settings.primaryColor);
	document.documentElement.style.setProperty("--secondary-color", settings.secondaryColor);
	document.documentElement.style.setProperty("--accent-color", settings.accentColor);

	// Update glow color (lighter version of primary)
	const glowColor = hexToRgba(settings.primaryColor, 0.5);
	document.documentElement.style.setProperty("--glow-color", glowColor);
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
	const closeSettings = document.getElementById("closeSettings");
	const saveSettingsBtn = document.getElementById("saveSettings");
	const resetSettingsBtn = document.getElementById("resetSettings");
	const pageTitleSelect = document.getElementById("pageTitle");
	const customPageTitleInput = document.getElementById("customPageTitle");
	const faviconUrlInput = document.getElementById("faviconUrl");
	const primaryColorInput = document.getElementById("primaryColor");
	const secondaryColorInput = document.getElementById("secondaryColor");
	const accentColorInput = document.getElementById("accentColor");

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

		faviconUrlInput.value = currentSettings.faviconUrl === "favicon.svg" ? "" : currentSettings.faviconUrl;
		primaryColorInput.value = currentSettings.primaryColor;
		secondaryColorInput.value = currentSettings.secondaryColor;
		accentColorInput.value = currentSettings.accentColor;
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

	// Save settings
	saveSettingsBtn.addEventListener("click", () => {
		let pageTitle = pageTitleSelect.value;
		if (pageTitle === "Custom") {
			pageTitle = customPageTitleInput.value || DEFAULT_SETTINGS.pageTitle;
		}

		const newSettings = {
			pageTitle: pageTitle,
			faviconUrl: faviconUrlInput.value || DEFAULT_SETTINGS.faviconUrl,
			primaryColor: primaryColorInput.value,
			secondaryColor: secondaryColorInput.value,
			accentColor: accentColorInput.value,
		};

		saveSettings(newSettings);
		applySettings(newSettings);
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

	// Close on Escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && settingsModal.classList.contains("active")) {
			settingsModal.classList.remove("active");
		}
	});
});

