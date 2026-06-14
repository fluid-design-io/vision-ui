'use client'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/cn'

import {
	ACTIVITY_INDICATOR_FADE_TIMES,
	getRectOpacityKeyframes,
	getRectStaticOpacity,
	resolveActivityIndicatorAnimation,
} from './activity-indicator.animation'
import {
	ACTIVITY_INDICATOR_RECT,
	ACTIVITY_INDICATOR_RECTS,
	DISPLAY_NAME,
} from './activity-indicator.constants'
import { ActivityIndicatorIcon } from './activity-indicator.icon'
import { activityIndicatorVariants } from './activity-indicator.styles'
import type { ActivityIndicatorRootProps } from './activity-indicator.types'

function ActivityIndicatorRoot({
	size,
	className,
	isLoading = true,
	animation = true,
	label = 'Loading',
	...props
}: ActivityIndicatorRootProps) {
	const reducedMotion = useReducedMotion() ?? false
	const { spin, fade } = resolveActivityIndicatorAnimation(animation, reducedMotion)

	const isSpinning = isLoading && spin !== null
	const isFading = isLoading && fade !== null
	const min = fade?.minOpacity ?? 0.15
	const max = fade?.maxOpacity ?? 1

	return (
		<motion.svg
			viewBox="0 0 28 28"
			fill="currentColor"
			role="status"
			aria-label={label}
			aria-busy={isLoading}
			className={cn(activityIndicatorVariants({ size }), className)}
			animate={isSpinning ? { rotate: spin.degrees } : { rotate: 0 }}
			transition={isSpinning ? spin.transition : { duration: 0 }}
			{...props}
		>
			{ACTIVITY_INDICATOR_RECTS.map((rect, index) => {
				const transform = rect.rotate
					? `rotate(${rect.rotate} ${rect.x} ${rect.y})`
					: undefined

				return (
					<motion.rect
						key={index}
						x={rect.x}
						y={rect.y}
						width={ACTIVITY_INDICATOR_RECT.width}
						height={ACTIVITY_INDICATOR_RECT.height}
						rx={ACTIVITY_INDICATOR_RECT.rx}
						transform={transform}
						animate={
							isFading
								? { fillOpacity: getRectOpacityKeyframes(rect.phase, min, max) }
								: { fillOpacity: getRectStaticOpacity(rect.phase, min, max) }
						}
						transition={
							isFading
								? { ...fade.transition, times: ACTIVITY_INDICATOR_FADE_TIMES }
								: { duration: 0 }
						}
					/>
				)
			})}
		</motion.svg>
	)
}

ActivityIndicatorRoot.displayName = DISPLAY_NAME.ROOT

export const ActivityIndicator = Object.assign(ActivityIndicatorRoot, {
	Root: ActivityIndicatorRoot,
	Icon: ActivityIndicatorIcon,
})
