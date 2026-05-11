'use client'

import { cn } from '@/lib/cn'
import { ScrollViewCorner } from './scrollview.corner'
import { ScrollViewRoot } from './scrollview.root'
import { ScrollViewIndicatorThumb, ScrollViewScrollIndicator } from './scrollview.scroll-indicator'
import type { ScrollViewProps } from './scrollview.types'
import { ScrollViewViewport } from './scrollview.viewport'

function ScrollViewBase({
	className,
	children,
	viewportProps,
	verticalScrollIndicatorProps,
	horizontalScrollIndicatorProps,
	thumbProps,
	cornerProps,
	showsVerticalScrollIndicator = true,
	showsHorizontalScrollIndicator = false,
	...props
}: ScrollViewProps) {
	const showsCorner = showsVerticalScrollIndicator && showsHorizontalScrollIndicator

	return (
		<ScrollViewRoot className={cn('h-full', className)} {...props}>
			<ScrollViewViewport {...viewportProps}>{children}</ScrollViewViewport>
			<ScrollViewScrollIndicator
				orientation="vertical"
				aria-hidden={!showsVerticalScrollIndicator}
				{...verticalScrollIndicatorProps}
				className={cn(
					!showsVerticalScrollIndicator && 'pointer-events-none opacity-0',
					verticalScrollIndicatorProps?.className,
				)}
			>
				<ScrollViewIndicatorThumb {...thumbProps} />
			</ScrollViewScrollIndicator>
			{showsHorizontalScrollIndicator && (
				<ScrollViewScrollIndicator orientation="horizontal" {...horizontalScrollIndicatorProps}>
					<ScrollViewIndicatorThumb {...thumbProps} />
				</ScrollViewScrollIndicator>
			)}
			{showsCorner && <ScrollViewCorner {...cornerProps} />}
		</ScrollViewRoot>
	)
}

export const ScrollView = Object.assign(ScrollViewBase, {
	Root: ScrollViewRoot,
	Viewport: ScrollViewViewport,
	ScrollIndicator: Object.assign(ScrollViewScrollIndicator, {
		Thumb: ScrollViewIndicatorThumb,
	}),
	Corner: ScrollViewCorner,
})
