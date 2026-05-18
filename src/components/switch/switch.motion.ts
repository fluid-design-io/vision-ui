import type { motion } from 'motion/react'
import type * as React from 'react'

type MotionSpanProps = React.ComponentProps<typeof motion.span>

const MOTION_CONFLICT_KEYS = [
	'onDrag',
	'onDragStart',
	'onDragEnd',
	'onAnimationStart',
	'onAnimationEnd',
	'onAnimationIteration',
] as const

export function toMotionSpanProps(props: object): MotionSpanProps {
	const safeProps = { ...props } as Record<string, unknown>

	for (const key of MOTION_CONFLICT_KEYS) {
		delete safeProps[key]
	}

	return safeProps as MotionSpanProps
}
