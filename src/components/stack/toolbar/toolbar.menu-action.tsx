'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import type { ToolbarMenuActionProps } from './toolbar.types'

export function ToolbarMenuAction({
	children,
	onPress,
	destructive,
	className,
	type = 'button',
	...rest
}: ToolbarMenuActionProps) {
	return (
		<button
			type={type}
			role="menuitem"
			className={cn(
				'w-full rounded px-2 py-1.5 text-left text-sm hover:bg-white/10',
				destructive && 'text-red-400',
				className,
			)}
			onClick={onPress}
			{...rest}
		>
			{children}
		</button>
	)
}

ToolbarMenuAction.displayName = TOOLBAR_DISPLAY_NAME.MENU_ACTION
