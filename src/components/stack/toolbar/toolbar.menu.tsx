'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import { useToolbarPlacement } from './toolbar.context'
import type { ToolbarMenuProps } from './toolbar.types'

export function ToolbarMenu({
	title,
	icon,
	children,
	hidden,
	tintColor,
	className,
	...rest
}: ToolbarMenuProps) {
	const ctx = useToolbarPlacement()
	const color = tintColor ?? ctx.tintColor

	if (hidden) return null

	return (
		<details className={cn('relative group', className)} {...rest}>
			<summary
				className={cn(
					'flex cursor-pointer list-none items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-white/10',
					'[&::-webkit-details-marker]:hidden',
				)}
				style={color ? { color } : undefined}
			>
				{icon}
				{title ? <span>{title}</span> : null}
			</summary>
			<div
				role="menu"
				className="absolute right-0 z-50 mt-1 flex min-w-[10rem] flex-col rounded-lg border border-white/10 bg-black/90 p-1 shadow-xl backdrop-blur-md"
			>
				{children}
			</div>
		</details>
	)
}

ToolbarMenu.displayName = TOOLBAR_DISPLAY_NAME.MENU
