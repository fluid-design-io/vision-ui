/** Past this scroll offset (px), large title and header scrim snap to their collapsed state. */
export const HEADER_COLLAPSE_AFTER_SCROLL_Y = 30
export const HEADER_MIN_HEIGHT = '5rem'

export const HEADER_SCRIM_SPRING = {
	stiffness: 420,
	damping: 38,
	mass: 0.35,
} as const
