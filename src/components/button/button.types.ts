import type { VariantProps } from 'class-variance-authority'

import type { buttonVariants } from './button.styles'

export type ButtonVariant = VariantProps<typeof buttonVariants>

export interface ButtonRootProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariant {
	asChild?: boolean
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export type ButtonProps = ButtonRootProps
