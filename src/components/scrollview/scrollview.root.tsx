'use client'

import { cn } from '@/lib/cn'
import * as ScrollViewPrimitive from '@radix-ui/react-scroll-area'
import { ScrollViewProvider } from './scrollview.context'
import type { ScrollViewRootProps } from './scrollview.types'

export function ScrollViewRoot({ className, children, ...props }: ScrollViewRootProps) {
	return (
		<ScrollViewProvider>
			<ScrollViewPrimitive.Root className={cn('relative', className)} {...props}>
				{children}
			</ScrollViewPrimitive.Root>
		</ScrollViewProvider>
	)
}
