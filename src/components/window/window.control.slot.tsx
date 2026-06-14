'use client'

import { motion } from 'motion/react'

import { cn } from '@/lib/cn'

import { DISPLAY_NAME } from './window.control.constants'
import { useWindowControlContext, type WindowControlSide } from './window.control.context'
import { windowControlSlotVariants } from './window.control.styles'
import type { WindowControlSlotProps } from './window.control.types'

/**
 * Shared implementation for the prefix / suffix slots. Owns the visionOS
 * hover-reveal (the slot fades + scales in once the control is hovered) and
 * reports its own hover to the context so the grabber can recede on this side.
 *
 * The content is whatever you drop in — a {@link WindowControlButton}, an icon,
 * or any custom control — making the slot position-only and unopinionated.
 */
function WindowControlSlot({
	side,
	component,
	className,
	children,
	onPointerEnter,
	onPointerLeave,
	...props
}: WindowControlSlotProps & { side: WindowControlSide; component: string }) {
	const { isHovered, setHoveredSide, animation } = useWindowControlContext(component)
	const reveal = animation.reveal

	const isVisible = reveal === null || isHovered

	return (
		<motion.div
			data-slot={`window-control-${side}`}
			className={cn(windowControlSlotVariants(), className)}
			initial={false}
			animate={{
				opacity: isVisible ? 1 : reveal.hiddenOpacity,
				scale: isVisible ? 1 : reveal.hiddenScale,
			}}
			transition={reveal?.transition}
			style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
			onPointerEnter={(event) => {
				setHoveredSide(side)
				onPointerEnter?.(event)
			}}
			onPointerLeave={(event) => {
				setHoveredSide(null)
				onPointerLeave?.(event)
			}}
			{...props}
		>
			{children}
		</motion.div>
	)
}

/**
 * Left-hand slot. Defaults to the close button when the control renders its
 * defaults, but accepts any content.
 */
export function WindowControlPrefix(props: WindowControlSlotProps) {
	return <WindowControlSlot side="prefix" component={DISPLAY_NAME.PREFIX} {...props} />
}

WindowControlPrefix.displayName = DISPLAY_NAME.PREFIX

/**
 * Right-hand slot. Defaults to the share button when the control renders its
 * defaults, but accepts any content.
 */
export function WindowControlSuffix(props: WindowControlSlotProps) {
	return <WindowControlSlot side="suffix" component={DISPLAY_NAME.SUFFIX} {...props} />
}

WindowControlSuffix.displayName = DISPLAY_NAME.SUFFIX
