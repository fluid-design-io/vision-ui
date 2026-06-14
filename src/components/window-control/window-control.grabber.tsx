'use client'

import { motion } from 'motion/react'

import { cn } from '@/lib/cn'

import { DISPLAY_NAME } from './window-control.constants'
import { useWindowControlContext } from './window-control.context'
import { windowControlGrabberVariants } from './window-control.styles'
import type { WindowControlGrabberProps } from './window-control.types'

/**
 * The always-visible grabber handle. Brightens on hover. Presentational —
 * a window manager could later attach drag handlers here.
 */
export function WindowControlGrabber({ className, ...props }: WindowControlGrabberProps) {
	const { isHovered, animation } = useWindowControlContext(DISPLAY_NAME.GRABBER)
	const grabber = animation.grabber

	const opacity = grabber
		? isHovered
			? grabber.hoverOpacity
			: grabber.restOpacity
		: undefined

	return (
		<motion.div
			data-slot="window-control-grabber"
			className={cn(windowControlGrabberVariants(), className)}
			initial={false}
			animate={grabber ? { backgroundColor: `rgba(255,255,255,${opacity})` } : undefined}
			transition={grabber?.transition}
			{...props}
		/>
	)
}

WindowControlGrabber.displayName = DISPLAY_NAME.GRABBER
