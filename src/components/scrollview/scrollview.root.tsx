'use client'

import { ScrollArea } from '@base-ui/react/scroll-area'

import { cn } from '@/lib/cn'

import { ScrollViewProvider } from './scrollview.context'
import type { ScrollViewRootProps } from './scrollview.types'

export function ScrollViewRoot({ className, children, ...props }: ScrollViewRootProps) {
	return (
		<ScrollViewProvider>
			<ScrollArea.Root className={cn('relative', className)} {...props}>
				{children}
			</ScrollArea.Root>
		</ScrollViewProvider>
	)
}
