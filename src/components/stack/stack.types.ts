import type { useRender } from '@base-ui/react/use-render'
import type * as React from 'react'

export type StackTitleDisplayMode = 'inline' | 'large' | 'automatic'

export type ToolbarPlacement = 'topBarLeading' | 'topBarTrailing' | 'bottomBar' | 'principal'

export type StackSearchBarPlacement = 'automatic' | 'navigationBarDrawer' | 'toolbar'

export interface StackChromeRegistrySnapshot {
	title: React.ReactNode | null
	headerStyle: React.CSSProperties | undefined
	headerHidden: boolean
	headerTransparent: boolean
	titleDisplayMode: StackTitleDisplayMode
	searchBar: React.ReactNode | null
	backButton: React.ReactNode | null
	toolbarTopBarLeading: React.ReactNode | null
	toolbarTopBarTrailing: React.ReactNode | null
	toolbarBottomBar: React.ReactNode | null
	toolbarPrincipal: React.ReactNode | null
}

export interface StackRootProps {
	className?: string
	children: React.ReactNode
}

export interface StackHeaderProps {
	hidden?: boolean
	transparent?: boolean
	style?: React.CSSProperties
}

export interface StackTitleProps {
	render?: useRender.RenderProp
	displayMode?: StackTitleDisplayMode
	className?: string
	style?: React.CSSProperties
	children?: React.ReactNode
}

export interface StackSearchBarProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
	prompt?: string
	placement?: StackSearchBarPlacement
	onChangeText?: (text: string) => void
	text?: string
	hidden?: boolean
}

export interface StackScreenProps {
	name?: string
	/** TanStack Router `to` match target */
	to?: string
	children: React.ReactNode
}

export interface StackScreenBackButtonProps {
	render?: useRender.RenderProp
	hidden?: boolean
	onPress?: () => void
	className?: string
	children?: React.ReactNode
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
}
