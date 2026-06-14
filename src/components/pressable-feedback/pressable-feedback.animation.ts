import type { Transition } from 'motion/react'

import type { PressableFeedbackAnimation } from './pressable-feedback.types'

export const PRESSABLE_FEEDBACK_DEFAULT_SCALE = 0.95

const PRESSABLE_FEEDBACK_DEFAULT_TRANSITION: Transition = {
	type: 'spring',
	stiffness: 520,
	damping: 32,
	mass: 0.6,
}

export function getPressableFeedbackScale({
	animation,
	isPressed,
}: {
	animation?: PressableFeedbackAnimation
	isPressed: boolean
}) {
	if (!isPressed) return 1

	const value = animation?.scale?.value ?? PRESSABLE_FEEDBACK_DEFAULT_SCALE

	return value
}

export function getPressableFeedbackTransition(animation?: PressableFeedbackAnimation) {
	return (
		animation?.scale?.timingConfig ?? animation?.transition ?? PRESSABLE_FEEDBACK_DEFAULT_TRANSITION
	)
}
