import { UseRenderRenderProp } from '@base-ui/react/use-render'
import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { buttonVariants } from './button.styles'

export type ButtonVariant = VariantProps<typeof buttonVariants>

export interface ButtonLabelProps {
	className?: string
	render?: UseRenderRenderProp
	children?: React.ReactNode
}

export interface ButtonRootOwnProps extends ButtonVariant {
	/**
	 * Allows you to replace the component's HTML element with a different tag,
	 * or compose it with another component.
	 *
	 * Accepts a `ReactElement` or a function that returns the element to render.
	 */
	render?: UseRenderRenderProp
	/**
	 * When true, the button will not play a sound when clicked.
	 */
	isSoundDisabled?: boolean
}

export interface ButtonRootProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonRootOwnProps {}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export type ButtonProps = ButtonRootProps
