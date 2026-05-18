export const DISPLAY_NAME = {
	ROOT: 'VisionUI.Switch',
	THUMB: 'VisionUI.Switch.Thumb',
	START_CONTENT: 'VisionUI.Switch.StartContent',
	END_CONTENT: 'VisionUI.Switch.EndContent',
} as const

export const SWITCH_SIZE = {
	default: {
		trackWidth: 51,
		trackHeight: 31,
		thumbSize: 27,
		padding: 2,
	},
	sm: {
		trackWidth: 44,
		trackHeight: 26,
		thumbSize: 22,
		padding: 2,
	},
} as const

export function getSwitchThumbTravel(size: keyof typeof SWITCH_SIZE = 'default') {
	const { trackWidth, thumbSize, padding } = SWITCH_SIZE[size]
	return trackWidth - thumbSize - padding * 2
}
