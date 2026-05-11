'use client'

import * as React from 'react'
import { createContext, use, useMemo, useRef } from 'react'
import { useScroll as useMotionScroll } from 'motion/react'
import type { ScrollViewContextValue } from './scrollview.types'

const ScrollViewContext = createContext<ScrollViewContextValue | null>(null)

export function ScrollViewProvider({ children }: { children: React.ReactNode }) {
	const viewportRef = useRef<HTMLDivElement | null>(null)
	const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useMotionScroll({
		container: viewportRef,
	})

	const value = useMemo<ScrollViewContextValue>(
		() => ({
			viewportRef,
			scrollX,
			scrollY,
			scrollXProgress,
			scrollYProgress,
		}),
		[scrollX, scrollY, scrollXProgress, scrollYProgress],
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
