'use client'

import { motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/cn'

import { DISPLAY_NAME } from './window.control.constants'
import { useWindowControlContext } from './window.control.context'
import { windowControlGrabberVariants } from './window.control.styles'
import type { WindowControlGrabberProps } from './window.control.types'

/**
 * The always-visible grabber handle. Brightens while the control is hovered and
 * shrinks toward the far edge when a flanking slot is hovered — receding on that
 * side so the slot's hover scale has room. Presentational — a window manager
 * could later attach drag handlers here.
 */
export function WindowControlGrabber({ className, style, ...props }: WindowControlGrabberProps) {
	const { isHovered, hoveredSide, animation } = useWindowControlContext(DISPLAY_NAME.GRABBER)
	const grabber = animation.grabber

	const opacity = grabber ? (isHovered ? grabber.hoverOpacity : grabber.restOpacity) : undefined

	// Shrink anchored to the edge opposite the hovered slot, so the grabber
	// visually recedes on the same side as the slot being hovered.
	const scaleX = grabber && hoveredSide ? grabber.shrinkScale : 1

	// Keep the transform-origin pinned to the side it last shrank from while the
	// width animates back to 1. Resetting the origin to center on pointer-leave
	// would re-anchor the still-shrunk pill mid-animation and make it snap; at
	// scaleX === 1 the origin has no visible effect, so retaining it is safe.
	const lastSideRef = React.useRef(hoveredSide)
	if (hoveredSide) {
		lastSideRef.current = hoveredSide
	}
	const originSide = hoveredSide ?? lastSideRef.current
	const transformOrigin =
		originSide === 'prefix'
			? 'right center'
			: originSide === 'suffix'
				? 'left center'
				: 'center'

	return (
		<motion.div
			data-slot="window-control-grabber"
			className={cn(windowControlGrabberVariants(), className)}
			initial={false}
			animate={grabber ? { backgroundColor: `rgba(255,255,255,${opacity})`, scaleX } : undefined}
			transition={grabber?.transition}
			style={{ transformOrigin, ...style }}
			{...props}
		/>
	)
}

WindowControlGrabber.displayName = DISPLAY_NAME.GRABBER
