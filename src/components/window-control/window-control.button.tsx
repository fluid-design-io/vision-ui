'use client'

import { motion } from 'motion/react'

import { cn } from '@/lib/cn'
import { Cursor } from '@/components/cursor'
import { PressableFeedback } from '@/components/pressable-feedback'

import { DISPLAY_NAME } from './window-control.constants'
import { useWindowControlContext } from './window-control.context'
import { windowControlButtonVariants } from './window-control.styles'
import type { WindowControlButtonProps } from './window-control.types'

/**
 * Shared base for the Close / Share glass circles. Wraps the visionOS
 * pressable + cursor-snap composition and applies the hover-reveal motion
 * from {@link useWindowControlContext}.
 */
export function WindowControlButton({
	children,
	label,
	isDisabled = false,
	className,
	...props
}: WindowControlButtonProps) {
	const { isHovered, animation } = useWindowControlContext(DISPLAY_NAME.BUTTON)
	const reveal = animation.reveal

	const isVisible = reveal === null || isHovered

	return (
		<motion.div
			className="inline-flex"
			initial={false}
			animate={{
				opacity: isVisible ? 1 : reveal.hiddenOpacity,
				scale: isVisible ? 1 : reveal.hiddenScale,
			}}
			transition={reveal?.transition}
			style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
		>
			<Cursor.Snap isDisabled={isDisabled}>
				<Cursor.SnapTarget>
					<PressableFeedback
						disabled={isDisabled}
						render={
							<button
								type="button"
								aria-label={label}
								disabled={isDisabled}
								className={cn(
									windowControlButtonVariants(),
									isDisabled && 'cursor-not-allowed opacity-50',
									className,
								)}
								{...props}
							/>
						}
					>
						<PressableFeedback.Highlight />
						<Cursor.SnapTarget factor={0.2}>
							<span className="z-1 flex items-center justify-center text-current">
								{children}
							</span>
						</Cursor.SnapTarget>
					</PressableFeedback>
				</Cursor.SnapTarget>
			</Cursor.Snap>
		</motion.div>
	)
}

WindowControlButton.displayName = DISPLAY_NAME.BUTTON
