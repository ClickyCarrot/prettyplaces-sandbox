// Theme loader for game pages - applies theme from main settings
(function () {
	const DEFAULT_SETTINGS = {
		theme: "default",
	};

	const THEMES = {
		default: {
			primaryColor: "#6366f1",
			secondaryColor: "#8b5cf6",
			accentColor: "#ec4899",
			bgDark: "#0f172a",
			bgCard: "#1e293b",
		},
		blue: {
			primaryColor: "#3b82f6",
			secondaryColor: "#2563eb",
			accentColor: "#60a5fa",
			bgDark: "#0c1220",
			bgCard: "#1e2a47",
		},
		green: {
			primaryColor: "#10b981",
			secondaryColor: "#059669",
			accentColor: "#34d399",
			bgDark: "#0a1520",
			bgCard: "#1a2e24",
		},
		purple: {
			primaryColor: "#8b5cf6",
			secondaryColor: "#7c3aed",
			accentColor: "#a78bfa",
			bgDark: "#1a0f2e",
			bgCard: "#2d1b4e",
		},
		red: {
			primaryColor: "#ef4444",
			secondaryColor: "#dc2626",
			accentColor: "#f87171",
			bgDark: "#1f0f0f",
			bgCard: "#2e1a1a",
		},
		orange: {
			primaryColor: "#f59e0b",
			secondaryColor: "#d97706",
			accentColor: "#fbbf24",
			bgDark: "#1f150f",
			bgCard: "#2e1f1a",
		},
		cyan: {
			primaryColor: "#06b6d4",
			secondaryColor: "#0891b2",
			accentColor: "#22d3ee",
			bgDark: "#0a1520",
			bgCard: "#1a2a2e",
		},
		dark: {
			primaryColor: "#64748b",
			secondaryColor: "#475569",
			accentColor: "#94a3b8",
			bgDark: "#0f1419",
			bgCard: "#1e2932",
		},
	};

	function hexToRgba(hex, alpha) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

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

	function applyTheme() {
		const settings = loadSettings();
		const theme = THEMES[settings.theme] || THEMES.default;

		// Apply CSS variables if they exist, or apply directly to elements
		if (document.documentElement.style) {
			document.documentElement.style.setProperty("--primary-color", theme.primaryColor);
			document.documentElement.style.setProperty("--secondary-color", theme.secondaryColor);
			document.documentElement.style.setProperty("--accent-color", theme.accentColor);
			document.documentElement.style.setProperty("--bg-dark", theme.bgDark);
			document.documentElement.style.setProperty("--bg-card", theme.bgCard);
		}

		// Apply to HTML and body
		document.documentElement.style.backgroundColor = theme.bgDark;

		// Apply to body if it exists
		const body = document.body;
		if (body) {
			body.style.background = `linear-gradient(135deg, ${theme.bgDark} 0%, ${theme.bgCard} 100%)`;
		}

		// Apply to elements with specific classes or IDs
		const style = document.createElement("style");
		style.textContent = `
			:root {
				--primary-color: ${theme.primaryColor};
				--secondary-color: ${theme.secondaryColor};
				--accent-color: ${theme.accentColor};
				--bg-dark: ${theme.bgDark};
				--bg-card: ${theme.bgCard};
			}
			body {
				background: linear-gradient(135deg, ${theme.bgDark} 0%, ${theme.bgCard} 100%) !important;
			}
			h1 {
				color: ${theme.primaryColor} !important;
			}
			#gameCanvas {
				border-color: ${theme.primaryColor} !important;
				background: ${theme.bgCard} !important;
			}
			a, a.btn-back {
				background: ${theme.primaryColor} !important;
			}
			a:hover, a.btn-back:hover {
				background: ${theme.secondaryColor} !important;
			}
		`;
		document.head.appendChild(style);
	}

	// Apply theme when DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", applyTheme);
	} else {
		applyTheme();
	}
})();
