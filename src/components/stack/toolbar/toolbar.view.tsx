'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import type { ToolbarViewProps } from './toolbar.types'

export function ToolbarView({ hidden, className, children, ...rest }: ToolbarViewProps) {
	if (hidden) return null
	return (
		<div className={cn('flex items-center gap-1', className)} {...rest}>
			{children}
		</div>
	)
}

ToolbarView.displayName = TOOLBAR_DISPLAY_NAME.VIEW
