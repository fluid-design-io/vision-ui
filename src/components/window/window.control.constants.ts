export const DISPLAY_NAME = {
	ROOT: 'VisionUI.Window.Control',
	PREFIX: 'VisionUI.Window.Control.Prefix',
	SUFFIX: 'VisionUI.Window.Control.Suffix',
	GRABBER: 'VisionUI.Window.Control.Grabber',
	BUTTON: 'VisionUI.Window.Control.Button',
} as const

/**
 * Pixel dimensions transcribed from the visionOS window-control asset
 * (Figma node 1:195). The control sits below the window: a central grabber
 * pill flanked by two glass circles revealed on hover.
 */
export const WINDOW_CONTROL_SIZE = {
	/** Prefix / suffix glass circle. */
	button: 14,
	/** Grabber handle. */
	grabber: { width: 136, height: 10 },
	/** Gap between the row items. */
	gap: 24,
	/** Space above the row, separating it from the window edge. */
	paddingTop: 22,
} as const
