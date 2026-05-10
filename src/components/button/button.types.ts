import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { buttonVariants } from './button.styles'

export type ButtonVariant = VariantProps<typeof buttonVariants>

export interface ButtonRootOwnProps extends ButtonVariant {
	asChild?: boolean
}

export interface ButtonRootProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonRootOwnProps {}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export type ButtonProps = ButtonRootProps
