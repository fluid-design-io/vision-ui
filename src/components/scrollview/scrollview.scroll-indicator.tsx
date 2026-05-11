'use client'

import { ScrollArea } from '@base-ui/react/scroll-area'

import { cn } from '@/lib/cn'

import type { ScrollViewScrollIndicatorProps, ScrollViewThumbProps } from './scrollview.types'

export function ScrollViewScrollIndicator({
	className,
	children,
	...props
}: ScrollViewScrollIndicatorProps) {
	return (
		<ScrollArea.Scrollbar
			className={cn(
				'top-1/2! h-[min(100%,100px)]! -translate-y-1/2! mr-1 flex touch-none select-none rounded-full bg-[#4d4d4d]/20 transition-colors',
				'after:absolute after:inset-0 after:rounded-full after:bg-[#fafafa]/20 after:bg-blend-color-dodge',
				'animate-fd-fade-in data-[state=hidden]:animate-fd-fade-out',
				'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3.5 data-[orientation=vertical]:p-[3px]',
				'data-[orientation=horizontal]:h-3.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:p-[3px]',
				className,
			)}
			{...props}
		>
			{children}
		</ScrollArea.Scrollbar>
	)
}

export function ScrollViewIndicatorThumb({ className, ...props }: ScrollViewThumbProps) {
	return (
		<ScrollArea.Thumb
			className={cn('relative flex-1 rounded-full bg-[#aaaaaa]/50', className)}
			{...props}
		/>
	)
}
