export function isChromiumBasedBrowser(): boolean {
	if (typeof navigator === 'undefined') {
		return true
	}

	const ua = navigator.userAgent

	if (/Firefox|FxiOS/i.test(ua)) {
		return false
	}

	if (/Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR/i.test(ua)) {
		return false
	}

	return /Chrome|Chromium|CriOS|Edg\/|OPR\/|Brave/i.test(ua)
}
