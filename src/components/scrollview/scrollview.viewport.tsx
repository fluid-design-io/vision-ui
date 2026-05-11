'use client'

import { cn } from '@/lib/cn'
import * as ScrollViewPrimitive from '@radix-ui/react-scroll-area'
import { motion } from 'motion/react'
import * as React from 'react'
import type { ComponentType } from 'react'
import { useScroll } from './scrollview.context'
import type { ScrollViewViewportProps } from './scrollview.types'

const MotionViewport = motion.create(ScrollViewPrimitive.Viewport) as ComponentType<
	ScrollViewViewportProps & React.RefAttributes<HTMLDivElement>
>

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		for (const ref of refs) {
			if (!ref) continue
			if (typeof ref === 'function') {
				ref(node)
			} else {
				ref.current = node
			}
		}
	}
}

export const ScrollViewViewport = React.forwardRef<HTMLDivElement, ScrollViewViewportProps>(
	function ScrollViewViewport({ className, children, ...props }, forwardedRef) {
		const { viewportRef } = useScroll()

		return (
			<MotionViewport
				ref={composeRefs(viewportRef, forwardedRef)}
				className={cn('h-full w-full rounded-[inherit]', className)}
				{...props}
			>
				{children}
			</MotionViewport>
		)
	},
)
