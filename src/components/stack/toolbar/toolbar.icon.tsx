'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import type { ToolbarIconProps } from './toolbar.types'

export function ToolbarIcon({ src, children, className }: ToolbarIconProps) {
	if (children) {
		return <span className={cn('inline-flex size-5 items-center justify-center', className)}>{children}</span>
	}
	if (src) {
		return (
			<img src={src} alt="" className={cn('size-5 object-contain', className)} draggable={false} />
		)
	}
	return null
}

ToolbarIcon.displayName = TOOLBAR_DISPLAY_NAME.ICON
