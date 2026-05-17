import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import { cn } from '@/lib/cn'

import { useSound } from '@/lib/sound/sound.hooks'
import { useMemo } from 'react'
import { ButtonLabel } from './button.label'
import { buttonVariants } from './button.styles'
import type { ButtonGroupProps, ButtonRootProps } from './button.types'

function ButtonRoot({
	className,
	variant,
	size,
	render,
	children: _children,
	onMouseUp,
	isSoundDisabled,
	...props
}: ButtonRootProps) {
	// Play sound on click
	const { play } = useSound('gridSelect')
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
				{
					className: cn(buttonVariants({ variant, size, className })),
					onMouseUp: (e) => onMouseUp?.(e) ?? (!isSoundDisabled && play()),
				},
				props,
			),
			children,
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
	Label: ButtonLabel,
	Group: ButtonGroup,
})
