'use client'

import { XIcon } from 'lucide-react'

import { WindowControlButton } from './window-control.button'
import { DISPLAY_NAME } from './window-control.constants'
import type { WindowControlCloseProps } from './window-control.types'

/**
 * Close button. The only control bound to behavior — wire your router via
 * `onClose` (fired before `onClick`). Defaults to an `X` icon.
 */
export function WindowControlClose({
	children,
	label = 'Close',
	onClose,
	onClick,
	...props
}: WindowControlCloseProps) {
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClose?.()
		onClick?.(event)
	}

	return (
		<WindowControlButton label={label} onClick={handleClick} {...props}>
			{children ?? <XIcon />}
		</WindowControlButton>
	)
}

WindowControlClose.displayName = DISPLAY_NAME.CLOSE
