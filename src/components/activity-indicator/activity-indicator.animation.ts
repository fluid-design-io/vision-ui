import type { Transition } from 'motion/react'

import { ACTIVITY_INDICATOR_RECT_COUNT } from './activity-indicator.constants'
import type {
	ActivityIndicatorAnimation,
	ActivityIndicatorFadeAnimation,
	ActivityIndicatorSpinAnimation,
} from './activity-indicator.types'

export const ACTIVITY_INDICATOR_DEFAULT_SPIN_DEGREES = 360
export const ACTIVITY_INDICATOR_DEFAULT_MIN_OPACITY = 0.15
export const ACTIVITY_INDICATOR_DEFAULT_MAX_OPACITY = 1

export const ACTIVITY_INDICATOR_DEFAULT_SPIN_TRANSITION: Transition = {
	duration: 1.825,
	ease: [0.25, 0.1, 0.25, 1],
}

export const ACTIVITY_INDICATOR_DEFAULT_FADE_TRANSITION: Transition = {
	duration: 0.9,
	ease: 'linear',
	repeat: Infinity,
}

/**
 * Even keyframe stops for the fade loop. The opacity arrays produced by
 * {@link getRectOpacityKeyframes} have `count + 1` frames (the first frame is
 * repeated at the end to close the loop seamlessly), so this matches.
 */
export const ACTIVITY_INDICATOR_FADE_TIMES = Array.from(
	{ length: ACTIVITY_INDICATOR_RECT_COUNT + 1 },
	(_, index) => index / ACTIVITY_INDICATOR_RECT_COUNT,
)

type ResolvedAnimation = {
	spin: Required<ActivityIndicatorSpinAnimation> | null
	fade: Required<ActivityIndicatorFadeAnimation> | null
}

function resolvePart<T extends object>(
	value: boolean | Partial<T> | undefined,
	defaults: T,
): T | null {
	if (value === false) return null
	if (value === true || value === undefined) return defaults
	return { ...defaults, ...value }
}

/**
 * Normalizes the public `animation` prop into concrete spin / fade configs.
 * Returns `null` for a part when it is disabled (via `false`, or because the
 * whole `animation` prop is `false`, or because the user prefers reduced motion).
 */
export function resolveActivityIndicatorAnimation(
	animation: boolean | ActivityIndicatorAnimation | undefined,
	reducedMotion: boolean,
): ResolvedAnimation {
	if (animation === false || reducedMotion) {
		return { spin: null, fade: null }
	}

	const value: ActivityIndicatorAnimation =
		animation === true || animation === undefined ? {} : animation

	const spin = resolvePart<Required<ActivityIndicatorSpinAnimation>>(value.spin, {
		degrees: ACTIVITY_INDICATOR_DEFAULT_SPIN_DEGREES,
		transition: ACTIVITY_INDICATOR_DEFAULT_SPIN_TRANSITION,
	})

	const fade = resolvePart<Required<ActivityIndicatorFadeAnimation>>(value.fade, {
		minOpacity: ACTIVITY_INDICATOR_DEFAULT_MIN_OPACITY,
		maxOpacity: ACTIVITY_INDICATOR_DEFAULT_MAX_OPACITY,
		transition: ACTIVITY_INDICATOR_DEFAULT_FADE_TRANSITION,
	})

	return { spin, fade }
}

/**
 * Brightness ramp from the lit head (`maxOpacity`) down to the trailing tail
 * (`minOpacity`), one stop per spoke.
 */
function buildRamp(min: number, max: number): number[] {
	const count = ACTIVITY_INDICATOR_RECT_COUNT
	return Array.from({ length: count }, (_, index) => max - (max - min) * (index / (count - 1)))
}

/**
 * Opacity keyframes for a single spoke over one loop. Each spoke walks the full
 * brightness ramp, offset by its `phase`, so neighbouring spokes are one ramp
 * step apart and the lit spot travels around the ring. The first frame is
 * repeated at the end so the loop closes without a jump.
 */
export function getRectOpacityKeyframes(phase: number, min: number, max: number): number[] {
	const count = ACTIVITY_INDICATOR_RECT_COUNT
	const ramp = buildRamp(min, max)
	const frames = Array.from({ length: count }, (_, step) => ramp[(step + phase) % count])
	frames.push(frames[0])
	return frames
}

/**
 * Static opacity for a spoke when the indicator is not animating — the same
 * value the fade loop starts from, so it freezes on a coherent trail.
 */
export function getRectStaticOpacity(phase: number, min: number, max: number): number {
	return buildRamp(min, max)[phase % ACTIVITY_INDICATOR_RECT_COUNT]
}
