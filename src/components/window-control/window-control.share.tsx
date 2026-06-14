'use client'

import { ShareIcon } from 'lucide-react'

import { WindowControlButton } from './window-control.button'
import { DISPLAY_NAME } from './window-control.constants'
import type { WindowControlShareProps } from './window-control.types'

/**
 * Share button. UI-only — pass an `onClick` to give it behavior.
 * Defaults to a `Share` icon.
 */
export function WindowControlShare({
	children,
	label = 'Share',
	...props
}: WindowControlShareProps) {
	return (
		<WindowControlButton label={label} {...props}>
			{children ?? <ShareIcon />}
		</WindowControlButton>
	)
}

WindowControlShare.displayName = DISPLAY_NAME.SHARE
