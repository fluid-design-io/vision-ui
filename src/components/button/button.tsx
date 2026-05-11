import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import { cn } from '@/lib/cn'

import { buttonVariants } from './button.styles'
import type { ButtonGroupProps, ButtonRootProps } from './button.types'

function ButtonRoot({ className, variant, size, render, ...props }: ButtonRootProps) {
	return useRender({
		defaultTagName: 'button',
		render,
		props: {
			...mergeProps<'button'>(
				{ className: cn(buttonVariants({ variant, size, className })) },
				props,
			),
			'data-slot': 'button',
		},
	})
}

function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
	return (
		<div
			className={cn(
				'flex items-center justify-center gap-2 p-3',
				'*:rounded-full [&_button:before]:rounded-full',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export const Button = Object.assign(ButtonRoot, {
	Root: ButtonRoot,
	Group: ButtonGroup,
})
