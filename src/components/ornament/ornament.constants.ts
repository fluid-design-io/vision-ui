export const DISPLAY_NAME = {
	ROOT: 'VisionUI.Ornament',
	TABS: 'VisionUI.Ornament.Tabs',
	TAB: 'VisionUI.Ornament.Tab',
	TAB_ICON: 'VisionUI.Ornament.TabIcon',
	TAB_LABEL: 'VisionUI.Ornament.TabLabel',
} as const

export const ORNAMENT_TIMING = {
	ENTRANCE_TIMEOUT: 700,
	EXIT_TIMEOUT: 500,
	TAB_EXIT_TIMEOUT: 480,
	TEXT_TRANSITION_DURATION: 0.4,
} as const

export const ORNAMENT_SIZE = {
	COLLAPSED_WIDTH: 44,
	EXPANDED_WIDTH: 'fit-content',
	TRACK_THICKNESS: 64,
} as const

export const ORNAMENT_MOTION_VARIANTS = {
	collapsed: {
		width: ORNAMENT_SIZE.COLLAPSED_WIDTH,
		scale: 1.0,
		transition: {
			delay: 0.15,
			type: 'spring',
			bounce: 0,
		},
	},
	expanded: {
		width: ORNAMENT_SIZE.EXPANDED_WIDTH,
		scale: 1.05,
		transition: {
			type: 'spring',
			bounce: 0.06,
			duration: 0.7,
		},
	},
	whileTap: {
		scale: 1,
		type: 'spring',
		bounce: 0.1,
		duration: 0.4,
	},
} as const
