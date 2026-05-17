import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import { cn } from '@/lib/cn'

import { useMemo } from 'react'
import { ButtonLabel } from './button.label'
import { buttonVariants } from './button.styles'
import type { ButtonGroupProps, ButtonRootProps } from './button.types'

function ButtonRoot({
	className,
	variant,
	size,
	render,
	cursorSnap,
	children: _children,
	...props
}: ButtonRootProps) {
	// if children is a string, wrap it in a ButtonLabel
	const children = useMemo(() => {
		if (typeof _children === 'string') {
			return <ButtonLabel>{_children}</ButtonLabel>
		}
		return _children
	}, [_children])

	return useRender({
		defaultTagName: 'button',
		render,
		props: {
			...mergeProps<'button'>(
				{ className: cn(buttonVariants({ variant, size, className })) },
				props,
			),
			children,
			'data-slot': 'button',
			...(cursorSnap ? { 'data-cursor-snap': '' } : {}),
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
	Label: ButtonLabel,
	Group: ButtonGroup,
})
