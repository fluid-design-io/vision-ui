import type { SpringOptions } from 'motion/react'

export const CURSOR_PARALLAX_MAX_X = 8
export const CURSOR_PARALLAX_MAX_Y = 4

export const CURSOR_POINTER_SPRING = {
	stiffness: 900,
	damping: 48,
	mass: 0.45,
} satisfies SpringOptions

export const CURSOR_PARALLAX_SPRING = {
	stiffness: 420,
	damping: 34,
	mass: 0.7,
} satisfies SpringOptions

export const CURSOR_OPACITY_SPRING = {
	stiffness: 520,
	damping: 40,
	mass: 0.5,
} satisfies SpringOptions

export const CURSOR_SCALE_SPRING = {
	stiffness: 640,
	damping: 36,
	mass: 0.45,
} satisfies SpringOptions
