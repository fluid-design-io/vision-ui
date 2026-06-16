import { cn } from '@/lib/cn'
import { HTMLMotionProps, motion } from 'motion/react'

interface StackRegularHeaderTitleProps extends HTMLMotionProps<'div'> {}

export function StackRegularHeaderTitle({ className, ...props }: StackRegularHeaderTitleProps) {
	return (
		<motion.div
			className={cn(
				'min-w-0 flex-1 truncate font-medium text-foreground text-center text-lg',
				className,
			)}
			{...props}
		/>
	)
}
