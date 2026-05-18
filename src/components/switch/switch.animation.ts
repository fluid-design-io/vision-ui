import type { Transition } from 'motion/react'

export const SWITCH_PRESS_SCALE = 1
export const SWITCH_PRESS_THUMB_SCALE = 0.857

export const SWITCH_THUMB_SPRING_TRANSITION: Transition = {
	type: 'spring',
	stiffness: 520,
	damping: 32,
	mass: 0.6,
}

export const SWITCH_PRESS_SPRING_TRANSITION: Transition = {
	type: 'spring',
	stiffness: 520,
	damping: 32,
	mass: 0.6,
}

export function getSwitchThumbTransition(reducedMotion: boolean): Transition {
	if (reducedMotion) {
		return { duration: 0 }
	}

	return SWITCH_THUMB_SPRING_TRANSITION
}

export function getSwitchPressTransition(reducedMotion: boolean): Transition {
	if (reducedMotion) {
		return { duration: 0 }
	}

	return SWITCH_PRESS_SPRING_TRANSITION
}
