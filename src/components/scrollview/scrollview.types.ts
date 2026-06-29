import type {
	ScrollAreaCornerProps,
	ScrollAreaRootProps,
	ScrollAreaScrollbarProps,
	ScrollAreaThumbProps,
	ScrollAreaViewportProps,
} from '@base-ui/react/scroll-area'
import type { MotionValue } from 'motion/react'
import type * as React from 'react'
import type { Size } from '@/hooks/use-element-size'

export interface ScrollViewRootProps extends ScrollAreaRootProps {
	className?: string
}

export interface ScrollViewViewportProps extends ScrollAreaViewportProps {
	className?: string
}

export interface ScrollViewScrollIndicatorProps extends ScrollAreaScrollbarProps {
	className?: string
}

export interface ScrollViewThumbProps extends ScrollAreaThumbProps {
	className?: string
}

export interface ScrollViewCornerProps extends ScrollAreaCornerProps {
	className?: string
}

export interface ScrollViewProps extends ScrollViewRootProps {
	viewportProps?: ScrollViewViewportProps
	verticalScrollIndicatorProps?: Omit<ScrollViewScrollIndicatorProps, 'orientation'>
	horizontalScrollIndicatorProps?: Omit<ScrollViewScrollIndicatorProps, 'orientation'>
	thumbProps?: ScrollViewThumbProps
	cornerProps?: ScrollViewCornerProps
	showsVerticalScrollIndicator?: boolean
	showsHorizontalScrollIndicator?: boolean
}

export interface ScrollViewContextValue {
	viewportRef: React.RefObject<HTMLDivElement | null>
	containerDimensions: Size
	scrollX: MotionValue<number>
	scrollY: MotionValue<number>
	scrollXProgress: MotionValue<number>
	scrollYProgress: MotionValue<number>
}
