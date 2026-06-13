export const DISPLAY_NAME = {
	ROOT: 'VisionUI.Switch',
	THUMB: 'VisionUI.Switch.Thumb',
	START_CONTENT: 'VisionUI.Switch.StartContent',
	END_CONTENT: 'VisionUI.Switch.EndContent',
} as const

export const SWITCH_SIZE = {
	default: {
		trackHeight: 28,
		padding: 4,
		trackWidth: 28 * 2.15,
		thumbSize: 28 - 4 * 2,
	},
	sm: {
		trackHeight: 24,
		padding: 4,
		trackWidth: 24 * 2.15,
		thumbSize: 24 - 4 * 2,
	},
} as const

export function getSwitchThumbTravel(size: keyof typeof SWITCH_SIZE = 'default') {
	const { trackWidth, thumbSize, padding } = SWITCH_SIZE[size]
	return trackWidth - thumbSize * 1.65 - padding * 2
}
