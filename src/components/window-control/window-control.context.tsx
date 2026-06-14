'use client'

import * as React from 'react'

import { DISPLAY_NAME } from './window-control.constants'
import type { ResolvedWindowControlAnimation } from './window-control.animation'

export interface WindowControlContextValue {
	isHovered: boolean
	animation: ResolvedWindowControlAnimation
}

export const WindowControlContext = React.createContext<WindowControlContextValue | null>(null)

export function WindowControlProvider({
	children,
	value,
}: {
	children: React.ReactNode
	value: WindowControlContextValue
}) {
	return <WindowControlContext value={value}>{children}</WindowControlContext>
}

WindowControlProvider.displayName = `${DISPLAY_NAME.ROOT}.Provider`

export function useWindowControlContext(component: string) {
	const context = React.use(WindowControlContext)

	if (!context) {
		throw new Error(`${component} must be used within <WindowControl>.`)
	}

	return context
}
