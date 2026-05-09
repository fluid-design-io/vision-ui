import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/cn'

import { buttonVariants } from './button.styles'
import type { ButtonGroupProps, ButtonRootProps } from './button.types'

function ButtonRoot({ className, variant, size, asChild = false, ...props }: ButtonRootProps) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
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
