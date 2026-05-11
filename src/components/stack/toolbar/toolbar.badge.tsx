'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import type { ToolbarBadgeProps } from './toolbar.types'

export function ToolbarBadge({ children, className }: ToolbarBadgeProps) {
	return (
		<span
			className={cn(
				'rounded-full bg-white/15 px-1.5 py-0.5 text-[10px] leading-none font-medium text-white/90',
				className,
			)}
		>
			{children}
		</span>
	)
}

ToolbarBadge.displayName = TOOLBAR_DISPLAY_NAME.BADGE
