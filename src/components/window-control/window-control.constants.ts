export const DISPLAY_NAME = {
	ROOT: 'VisionUI.WindowControl',
	CLOSE: 'VisionUI.WindowControl.Close',
	GRABBER: 'VisionUI.WindowControl.Grabber',
	SHARE: 'VisionUI.WindowControl.Share',
	BUTTON: 'VisionUI.WindowControl.Button',
} as const

/**
 * Pixel dimensions transcribed from the visionOS window-control asset
 * (Figma node 1:195). The control sits below the window: a central grabber
 * pill flanked by two glass circles revealed on hover.
 */
export const WINDOW_CONTROL_SIZE = {
	/** Close / Share glass circle. */
	button: 14,
	/** Grabber handle. */
	grabber: { width: 136, height: 10 },
	/** Gap between the row items. */
	gap: 24,
	/** Space above the row, separating it from the window edge. */
	paddingTop: 22,
} as const
