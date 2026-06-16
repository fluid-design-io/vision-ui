import { cn } from '@/lib/cn'
import { HTMLMotionProps, motion, type MotionValue } from 'motion/react'

interface StackLargeHeaderTitleProps extends HTMLMotionProps<'div'> {
	scale: MotionValue<number>
	y: MotionValue<number>
}
export function StackLargeHeaderTitle({
	className,
	scale,
	y,
	...props
}: StackLargeHeaderTitleProps) {
	return (
		<motion.div
			className={cn(
				'min-w-0 flex-1 truncate font-medium text-white/95 text-center',
				'text-xl leading-tight sm:text-2xl',
				className,
			)}
			style={{
				scale,
				y,
				transformOrigin: 'center',
			}}
			{...props}
		/>
	)
}
