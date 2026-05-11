import type { useRender } from '@base-ui/react/use-render'
import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { buttonVariants } from './button.styles'

export type ButtonVariant = VariantProps<typeof buttonVariants>

export interface ButtonRootOwnProps extends ButtonVariant {
	/**
	 * Allows you to replace the component's HTML element with a different tag,
	 * or compose it with another component.
	 *
	 * Accepts a `ReactElement` or a function that returns the element to render.
	 */
	render?: useRender.RenderProp
}

export interface ButtonRootProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
		ButtonRootOwnProps {}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export type ButtonProps = ButtonRootProps
