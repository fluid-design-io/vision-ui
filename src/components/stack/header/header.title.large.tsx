import { cn } from '@/lib/cn'
import { motion, type MotionValue } from 'motion/react'
import type * as React from 'react'

interface StackLargeHeaderTitleProps {
	children: React.ReactNode
	scale: MotionValue<number>
	y: MotionValue<number>
}

export function StackLargeHeaderTitle({ children, scale, y }: StackLargeHeaderTitleProps) {
	return (
		<motion.div
			className={cn(
				'min-w-0 flex-1 truncate font-medium text-white/95 text-center',
				'text-xl leading-tight sm:text-2xl',
			)}
			style={{
				scale,
				y,
				transformOrigin: 'center',
			}}
		>
			{children}
		</motion.div>
	)
}
