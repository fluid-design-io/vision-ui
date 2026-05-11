'use client'

import { ScrollArea } from '@base-ui/react/scroll-area'
import * as React from 'react'

import { cn } from '@/lib/cn'

import { useScroll } from './scrollview.context'
import type { ScrollViewViewportProps } from './scrollview.types'

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
			<ScrollArea.Viewport
				ref={composeRefs(viewportRef, forwardedRef)}
				className={cn('h-full w-full rounded-[inherit]', className)}
				{...props}
			>
				<ScrollArea.Content>{children}</ScrollArea.Content>
			</ScrollArea.Viewport>
		)
	},
)
