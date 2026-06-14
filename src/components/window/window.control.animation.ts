import type { Transition } from 'motion/react'

import type {
	WindowControlAnimation,
	WindowControlGrabberAnimation,
	WindowControlRevealAnimation,
} from './window.control.types'

export const WINDOW_CONTROL_DEFAULT_HIDDEN_SCALE = 0.85
export const WINDOW_CONTROL_DEFAULT_HIDDEN_OPACITY = 0
export const WINDOW_CONTROL_DEFAULT_GRABBER_REST_OPACITY = 0.3
export const WINDOW_CONTROL_DEFAULT_GRABBER_HOVER_OPACITY = 0.75
export const WINDOW_CONTROL_DEFAULT_GRABBER_SHRINK_SCALE = 0.92

export const WINDOW_CONTROL_DEFAULT_REVEAL_TRANSITION: Transition = {
	opacity: {
		delay: 0.15,
		duration: 0.75,
		ease: 'easeOut',
	},
	type: 'spring',
	stiffness: 520,
	damping: 32,
	mass: 0.6,
}

export const WINDOW_CONTROL_DEFAULT_GRABBER_TRANSITION: Transition = {
	type: 'spring',
	stiffness: 520,
	damping: 32,
	mass: 0.6,
}

export type ResolvedWindowControlAnimation = {
	reveal: Required<WindowControlRevealAnimation> | null
	grabber: Required<WindowControlGrabberAnimation> | null
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
 * Normalizes the public `animation` prop into concrete reveal / grabber configs.
 * Returns `null` for a part when it is disabled (via `false`, the whole prop being
 * `false`, or reduced motion). When reveal is disabled the flanking slots stay visible.
 */
export function resolveWindowControlAnimation(
	animation: boolean | WindowControlAnimation | undefined,
	reducedMotion: boolean,
): ResolvedWindowControlAnimation {
	if (animation === false || reducedMotion) {
		return { reveal: null, grabber: null }
	}

	const value: WindowControlAnimation =
		animation === true || animation === undefined ? {} : animation

	const reveal = resolvePart<Required<WindowControlRevealAnimation>>(value.reveal, {
		transition: WINDOW_CONTROL_DEFAULT_REVEAL_TRANSITION,
		hiddenScale: WINDOW_CONTROL_DEFAULT_HIDDEN_SCALE,
		hiddenOpacity: WINDOW_CONTROL_DEFAULT_HIDDEN_OPACITY,
	})

	const grabber = resolvePart<Required<WindowControlGrabberAnimation>>(value.grabber, {
		transition: WINDOW_CONTROL_DEFAULT_GRABBER_TRANSITION,
		restOpacity: WINDOW_CONTROL_DEFAULT_GRABBER_REST_OPACITY,
		hoverOpacity: WINDOW_CONTROL_DEFAULT_GRABBER_HOVER_OPACITY,
		shrinkScale: WINDOW_CONTROL_DEFAULT_GRABBER_SHRINK_SCALE,
	})

	return { reveal, grabber }
}
