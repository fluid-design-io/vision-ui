import { cn } from '@/lib/cn'
import { motion } from 'motion/react'
import type * as React from 'react'

interface StackRegularHeaderTitleProps {
	children: React.ReactNode
}

export function StackRegularHeaderTitle({ children }: StackRegularHeaderTitleProps) {
	return (
		<motion.div
			className={cn('min-w-0 flex-1 truncate font-medium text-white/95 text-center', 'text-lg')}
		>
			{children}
		</motion.div>
	)
}
