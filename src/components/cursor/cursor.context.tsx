'use client'

import * as React from 'react'
import { createContext, use } from 'react'

import type { CursorContextValue, CursorSnapContextValue } from './cursor.types'

const CursorContext = createContext<CursorContextValue | null>(null)
const CursorSnapContext = createContext<CursorSnapContextValue | null>(null)

export function CursorProvider({
	value,
	children,
}: {
	value: CursorContextValue
	children: React.ReactNode
}) {
	return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export function CursorSnapProvider({
	value,
	children,
}: {
	value: CursorSnapContextValue
	children: React.ReactNode
}) {
	return <CursorSnapContext.Provider value={value}>{children}</CursorSnapContext.Provider>
}

export function useCursorContext(componentName = 'Cursor component'): CursorContextValue {
	const context = use(CursorContext)
	if (!context) {
		throw new Error(`${componentName} must be used within <Cursor>.`)
	}
	return context
}

export function useOptionalCursorContext(): CursorContextValue | null {
	return use(CursorContext)
}

export function useCursorSnapContext(
	componentName = 'Cursor.SnapTarget',
): CursorSnapContextValue {
	const context = use(CursorSnapContext)
	if (!context) {
		throw new Error(`${componentName} must be used within <Cursor.Snap>.`)
	}
	return context
}
