import type * as React from 'react'
import type { ToolbarPlacement } from '../stack.types'

export type { ToolbarPlacement }

export interface ToolbarPlacementContextValue {
	placement: ToolbarPlacement
	tintColor?: string
	backgroundColor?: string
	disableImePadding?: boolean
}

export interface StackToolbarOwnProps {
	placement?: ToolbarPlacement
	tintColor?: string
	backgroundColor?: string
	disableImePadding?: boolean
}

export type StackToolbarProps = React.PropsWithChildren<
	StackToolbarOwnProps & {
		className?: string
		hidden?: boolean
	}
>

export interface ToolbarButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
	icon?: React.ReactNode
	onPress?: () => void
	hidden?: boolean
	tintColor?: string
}

export interface ToolbarMenuProps extends React.HTMLAttributes<HTMLDetailsElement> {
	title?: string
	icon?: React.ReactNode
	hidden?: boolean
	tintColor?: string
	children?: React.ReactNode
}

export interface ToolbarMenuActionProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
	onPress?: () => void
	destructive?: boolean
	children?: React.ReactNode
}

export interface ToolbarSpacerProps {
	width?: number
	hidden?: boolean
	className?: string
}

export interface ToolbarViewProps extends React.HTMLAttributes<HTMLDivElement> {
	hidden?: boolean
}

export interface ToolbarLabelProps {
	children: React.ReactNode
	className?: string
}

export interface ToolbarIconProps {
	src?: string
	children?: React.ReactNode
	className?: string
}

export interface ToolbarBadgeProps {
	children: React.ReactNode
	className?: string
}

export interface ToolbarSearchBarSlotProps {
	hidden?: boolean
	className?: string
}
