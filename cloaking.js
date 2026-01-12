(function () {
	function loadSettings() {
		const saved = localStorage.getItem("siteSettings");
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch {
				return {};
			}
		}
		return {};
	}

	function cloakingEnabled() {
		const settings = loadSettings();
		return settings && settings.cloaking === true;
	}

	function isInIframe() {
		try {
			return window.self !== window.top;
		} catch {
			return true;
		}
	}

	function writeCloakedDocument(win, targetUrl) {
		const title = document.title || "";
		const iconEl = document.querySelector('link[rel="icon"]');
		const iconHref = iconEl ? iconEl.href : "";

		const escapedUrl = String(targetUrl).replace(/"/g, "&quot;");
		const escapedTitle = String(title).replace(/</g, "&lt;").replace(/>/g, "&gt;");
		const escapedIcon = String(iconHref).replace(/"/g, "&quot;");

		win.document.write(`
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<title>${escapedTitle}</title>
				<link rel="icon" type="image/svg+xml" href="${escapedIcon}">
				<style>
					* { margin: 0; padding: 0; box-sizing: border-box; }
					body { overflow: hidden; background: #000; }
					iframe { width: 100%; height: 100vh; border: none; }
				</style>
			</head>
			<body>
				<iframe src="${escapedUrl}"></iframe>
			</body>
			</html>
		`);
		win.document.close();
	}

	window.openCloaked = function openCloaked(targetUrl, target) {
		const win = window.open("about:blank", target || "_self");
		if (!win) return false;
		writeCloakedDocument(win, targetUrl);
		return true;
	};

	document.addEventListener(
		"click",
		(e) => {
			if (!cloakingEnabled()) return;
			if (isInIframe()) return;
			if (e.defaultPrevented) return;
			if (e.button !== 0) return;
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

			const anchor = e.target && e.target.closest ? e.target.closest("a") : null;
			if (!anchor) return;
			if (anchor.target && anchor.target !== "_self") return;

			const href = anchor.getAttribute("href");
			if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

			const url = new URL(href, window.location.href).toString();
			const ok = window.openCloaked(url, "_self");
			if (ok) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		{ capture: true }
	);
})();
