import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

export const activityIndicatorVariants = cva(
	cn('inline-block shrink-0 align-middle text-foreground'),
	{
		variants: {
			size: {
				sm: 'size-5', // 20px
				md: 'size-7', // 28px
				lg: 'size-11', // 44px
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)
