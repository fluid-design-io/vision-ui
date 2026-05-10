'use client'

import { Button } from '@/components/button'
import { cn } from '@/lib/cn'
import { motion } from 'motion/react'
import { DISPLAY_NAME } from './ornament.constants'
import { useOrnament } from './ornament.context'
import { ornamentClassNames } from './ornament.styles'
import type {
	OrnamentTabIconProps,
	OrnamentTabLabelProps,
	OrnamentTabProps,
} from './ornament.types'

export function OrnamentTab({
	isActive,
	className,
	children,
	onFocus,
	onBlur,
	onMouseDown,
	onMouseUp,
	...props
}: OrnamentTabProps) {
	const { setIsFocused, setIsPressed } = useOrnament()

	return (
		<Button
			data-slot="ornament-tab"
			data-active={isActive ? 'true' : undefined}
			variant={isActive ? 'default' : 'secondary'}
			className={cn(ornamentClassNames.tab, className)}
			onFocus={(event) => {
				setIsFocused(true)
				onFocus?.(event)
			}}
			onBlur={(event) => {
				setIsFocused(false)
				onBlur?.(event)
			}}
			onMouseDown={(event) => {
				setIsPressed(true)
				onMouseDown?.(event)
			}}
			onMouseUp={(event) => {
				setIsPressed(false)
				onMouseUp?.(event)
			}}
			{...props}
		>
			{children}
		</Button>
	)
}

OrnamentTab.displayName = DISPLAY_NAME.TAB

export function OrnamentTabIcon({ className, icon, ...props }: OrnamentTabIconProps) {
	return (
		<div
			data-slot="ornament-tab-icon"
			aria-hidden="true"
			className={cn(ornamentClassNames.tabIcon, className)}
			{...props}
		>
			{icon}
		</div>
	)
}

OrnamentTabIcon.displayName = DISPLAY_NAME.TAB_ICON

export function OrnamentTabLabel({ children }: OrnamentTabLabelProps) {
	return (
		<motion.span data-slot="ornament-tab-label" className={ornamentClassNames.tabLabel}>
			{typeof children === 'string' ? (
				<p className={ornamentClassNames.tabLabelText}>{children}</p>
			) : (
				children
			)}
		</motion.span>
	)
}

OrnamentTabLabel.displayName = DISPLAY_NAME.TAB_LABEL
