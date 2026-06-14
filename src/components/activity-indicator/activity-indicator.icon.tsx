import { motion } from 'motion/react'

import { cn } from '@/lib/cn'

import {
	ACTIVITY_INDICATOR_DEFAULT_MAX_OPACITY,
	ACTIVITY_INDICATOR_DEFAULT_MIN_OPACITY,
	getRectStaticOpacity,
} from './activity-indicator.animation'
import {
	ACTIVITY_INDICATOR_RECT,
	ACTIVITY_INDICATOR_RECTS,
	DISPLAY_NAME,
} from './activity-indicator.constants'
import { activityIndicatorVariants } from './activity-indicator.styles'
import type { ActivityIndicatorIconProps } from './activity-indicator.types'

/**
 * Static, non-animated rendering of the visionOS activity-indicator glyph.
 * Use this when you only need the spokes (e.g. inside a button). For the
 * animated loading state use {@link ActivityIndicator}.
 */
export const ActivityIndicatorIcon = ({ size, className, ...props }: ActivityIndicatorIconProps) => {
	return (
		<motion.svg
			viewBox="0 0 28 28"
			fill="currentColor"
			className={cn(activityIndicatorVariants({ size }), className)}
			aria-hidden="true"
			{...props}
		>
			{ACTIVITY_INDICATOR_RECTS.map((rect, index) => (
				<rect
					key={index}
					x={rect.x}
					y={rect.y}
					width={ACTIVITY_INDICATOR_RECT.width}
					height={ACTIVITY_INDICATOR_RECT.height}
					rx={ACTIVITY_INDICATOR_RECT.rx}
					transform={rect.rotate ? `rotate(${rect.rotate} ${rect.x} ${rect.y})` : undefined}
					fillOpacity={getRectStaticOpacity(
						rect.phase,
						ACTIVITY_INDICATOR_DEFAULT_MIN_OPACITY,
						ACTIVITY_INDICATOR_DEFAULT_MAX_OPACITY,
					)}
				/>
			))}
		</motion.svg>
	)
}

ActivityIndicatorIcon.displayName = DISPLAY_NAME.ICON
