'use client'

import { motion } from 'motion/react'

import { Cursor } from '@/components/cursor'
import { PressableFeedback } from '@/components/pressable-feedback'
import { cn } from '@/lib/cn'

import { DISPLAY_NAME } from './window.control.constants'
import { windowControlButtonVariants } from './window.control.styles'
import type { WindowControlButtonProps } from './window.control.types'

/**
 * Glass-circle button — the default content for a prefix / suffix slot. Wraps
 * the visionOS pressable + cursor-snap composition and grows on hover. The
 * hover-reveal is handled by the enclosing slot, so this stays a self-contained
 * button you can also use on its own.
 */
export function WindowControlButton({
	children,
	label,
	isDisabled = false,
	className,
	...props
}: WindowControlButtonProps) {
	return (
		<Cursor.Snap isDisabled={isDisabled}>
			<Cursor.SnapTarget factor={0.3}>
				<PressableFeedback
					disabled={isDisabled}
					render={
						<motion.button
							type="button"
							aria-label={label}
							disabled={isDisabled}
							className={cn(
								windowControlButtonVariants(),
								isDisabled && 'cursor-not-allowed opacity-50',
								className,
							)}
							whileHover={{
								scale: 2.57,
							}}
							whileTap={{
								scale: 2,
							}}
						/>
					}
					{...props}
				>
					<span className="z-1 flex items-center justify-center text-current">{children}</span>
				</PressableFeedback>
			</Cursor.SnapTarget>
		</Cursor.Snap>
	)
}

WindowControlButton.displayName = DISPLAY_NAME.BUTTON
