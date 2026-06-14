export const DISPLAY_NAME = {
	ROOT: 'VisionUI.ActivityIndicator',
	ICON: 'VisionUI.ActivityIndicator.Icon',
} as const

/**
 * Pixel dimensions for each size. The component is always square.
 */
export const ACTIVITY_INDICATOR_SIZE = {
	sm: 20,
	md: 28,
	lg: 44,
} as const

export type ActivityIndicatorSize = keyof typeof ACTIVITY_INDICATOR_SIZE

/**
 * Geometry for the eight spokes, transcribed from the visionOS activity
 * indicator asset (28×28 viewBox, capsule spokes with fully rounded ends).
 *
 * `phase` is the spoke's position in the rotation sequence (0 = head / brightest),
 * derived from the asset's original `fill-opacity` trail. The fade animation walks
 * a brightness ramp around the ring in `phase` order, so the lit spot appears to
 * rotate. Every spoke shares the same width / height / rx.
 */
export const ACTIVITY_INDICATOR_RECT = {
	width: 3.73333,
	height: 9.33333,
	rx: 1.86667,
} as const

export const ACTIVITY_INDICATOR_RECTS = [
	{ x: 12.1333, y: 0, rotate: 0, phase: 0 },
	{ x: 12.0201, y: 9.38024, rotate: 135, phase: 1 },
	{ x: 9.33333, y: 12.1333, rotate: 90, phase: 2 },
	{ x: 9.38073, y: 15.9799, rotate: 45, phase: 3 },
	{ x: 12.1333, y: 18.6667, rotate: 0, phase: 4 },
	{ x: 25.2219, y: 22.5796, rotate: 135, phase: 5 },
	{ x: 28, y: 12.1333, rotate: 90, phase: 6 },
	{ x: 22.5823, y: 2.78063, rotate: 45, phase: 7 },
] as const

export const ACTIVITY_INDICATOR_RECT_COUNT = ACTIVITY_INDICATOR_RECTS.length
