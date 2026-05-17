'use client'

import { cn } from '@/lib/cn'
import { motion } from 'motion/react'
import { Button } from '../button'
import { PressableFeedback } from '../pressable-feedback'
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
	...props
}: OrnamentTabProps) {
	const { setIsFocused } = useOrnament()

	return (
		<PressableFeedback
			animation={false}
			data-slot="ornament-tab"
			data-active={isActive ? 'true' : undefined}
			render={<Button variant={isActive ? 'default' : 'secondary'} isSoundDisabled={true} />}
			className={cn(ornamentClassNames.tab, className)}
			onFocus={(event: React.FocusEvent<HTMLButtonElement>) => {
				setIsFocused(true)
				onFocus?.(event)
			}}
			onBlur={(event: React.FocusEvent<HTMLButtonElement>) => {
				setIsFocused(false)
				onBlur?.(event)
			}}
			{...props}
		>
			<PressableFeedback.Highlight />
			{children}
		</PressableFeedback>
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
