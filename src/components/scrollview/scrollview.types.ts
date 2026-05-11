import type * as ScrollViewPrimitive from '@radix-ui/react-scroll-area'
import type * as React from 'react'
import type { MotionValue } from 'motion/react'

export interface ScrollViewRootProps extends React.ComponentPropsWithoutRef<
	typeof ScrollViewPrimitive.Root
> {
	className?: string
}

export interface ScrollViewViewportProps extends React.ComponentPropsWithoutRef<
	typeof ScrollViewPrimitive.Viewport
> {
	className?: string
}

export interface ScrollViewScrollIndicatorProps extends React.ComponentPropsWithoutRef<
	typeof ScrollViewPrimitive.Scrollbar
> {
	className?: string
}

export interface ScrollViewThumbProps extends React.ComponentPropsWithoutRef<
	typeof ScrollViewPrimitive.ScrollAreaThumb
> {
	className?: string
}

export interface ScrollViewCornerProps extends React.ComponentPropsWithoutRef<
	typeof ScrollViewPrimitive.Corner
> {
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
	scrollX: MotionValue<number>
	scrollY: MotionValue<number>
	scrollXProgress: MotionValue<number>
	scrollYProgress: MotionValue<number>
}
