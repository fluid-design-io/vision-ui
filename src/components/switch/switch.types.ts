import type { ComponentRenderFn } from '@base-ui/react/types'
import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { switchThumbVariants, switchVariants } from './switch.styles'

export type SwitchBaseRootState = {
	checked: boolean
	disabled: boolean
	readOnly: boolean
	required: boolean
}

export type SwitchVariant = VariantProps<typeof switchVariants>
export type SwitchThumbVariant = VariantProps<typeof switchThumbVariants>

export type SwitchRootState = {
	isSelected: boolean
	isDisabled: boolean
}

export type SwitchThumbState = {
	isSelected: boolean
}

export type SwitchRenderProp<State> = React.ReactNode | ((state: State) => React.ReactNode)

export interface SwitchRootOwnProps extends SwitchVariant {
	isSelected?: boolean
	defaultIsSelected?: boolean
	onSelectedChange?: (isSelected: boolean) => void
	isDisabled?: boolean
	/**
	 * When true, the switch will not play toggle sounds on change.
	 */
	isSoundDisabled?: boolean
	children?: SwitchRenderProp<SwitchRootState>
	render?:
		| React.ReactElement
		| ComponentRenderFn<React.ComponentProps<'span'>, SwitchBaseRootState>
	className?: string | ((state: SwitchBaseRootState) => string | undefined)
	name?: string
	value?: string
	uncheckedValue?: string
	required?: boolean
	readOnly?: boolean
	form?: string
}

export interface SwitchRootProps
	extends Omit<
			React.HTMLAttributes<HTMLElement>,
			'children' | 'defaultChecked' | 'className' | 'defaultValue'
		>,
		SwitchRootOwnProps {}

export interface SwitchThumbOwnProps extends SwitchThumbVariant {
	children?: SwitchRenderProp<SwitchThumbState>
	render?:
		| React.ReactElement
		| ComponentRenderFn<React.ComponentProps<'span'>, SwitchThumbState>
}

export interface SwitchThumbProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
		SwitchThumbOwnProps {}

export interface SwitchStartContentProps extends React.HTMLAttributes<HTMLSpanElement> {
	children?: React.ReactNode
}

export interface SwitchEndContentProps extends React.HTMLAttributes<HTMLSpanElement> {
	children?: React.ReactNode
}

export type SwitchProps = SwitchRootProps
