'use client'

import { useScroll as useMotionScroll } from 'motion/react'
import * as React from 'react'
import { createContext, use, useMemo, useRef } from 'react'
import { useElementSize } from '@/hooks/use-element-size'
import type { ScrollViewContextValue } from './scrollview.types'

const ScrollViewContext = createContext<ScrollViewContextValue | null>(null)

export function ScrollViewProvider({ children }: { children: React.ReactNode }) {
	const viewportRef = useRef<HTMLDivElement | null>(null)
	// Reactively tracks the viewport's size, so consumers re-render when the
	// window (and therefore the container) resizes.
	const containerDimensions = useElementSize(viewportRef)
	const props = useMotionScroll({
		container: viewportRef,
	})

	const value = useMemo<ScrollViewContextValue>(
		() => ({
			viewportRef,
			containerDimensions,
			...props,
		}),
		[containerDimensions, props],
	)

	return <ScrollViewContext.Provider value={value}>{children}</ScrollViewContext.Provider>
}

export function useScroll(): ScrollViewContextValue {
	const ctx = use(ScrollViewContext)
	if (!ctx) {
		throw new Error('useScroll must be used within <ScrollView.Root> or <ScrollView>.')
	}
	return ctx
}

export function useOptionalScroll(): ScrollViewContextValue | null {
	return use(ScrollViewContext)
}
