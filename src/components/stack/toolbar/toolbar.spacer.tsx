'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import { useToolbarPlacement } from './toolbar.context'
import type { ToolbarSpacerProps } from './toolbar.types'

export function ToolbarSpacer({ width, hidden, className }: ToolbarSpacerProps) {
	const { placement } = useToolbarPlacement()

	if (hidden) return null

	const flexGrow = placement === 'bottomBar' && width == null

	return (
		<span
			aria-hidden="true"
			className={cn(flexGrow ? 'min-w-[8px] flex-1' : 'inline-block shrink-0', className)}
			style={width != null ? { width } : undefined}
		/>
	)
}

ToolbarSpacer.displayName = TOOLBAR_DISPLAY_NAME.SPACER
