'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import { useToolbarPlacement } from './toolbar.context'
import type { ToolbarButtonProps } from './toolbar.types'

export function ToolbarButton({
	icon,
	children,
	onPress,
	hidden,
	disabled,
	tintColor,
	className,
	type = 'button',
	...rest
}: ToolbarButtonProps) {
	const ctx = useToolbarPlacement()
	const color = tintColor ?? ctx.tintColor

	if (hidden) return null

	return (
		<button
			type={type}
			disabled={disabled}
			className={cn(
				'inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-white/10 disabled:opacity-40',
				className,
			)}
			style={color ? { color } : undefined}
			onClick={onPress}
			{...rest}
		>
			{icon ?? children}
		</button>
	)
}

ToolbarButton.displayName = TOOLBAR_DISPLAY_NAME.BUTTON
