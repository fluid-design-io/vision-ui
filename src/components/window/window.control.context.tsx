'use client'

import * as React from 'react'

import { DISPLAY_NAME } from './window.control.constants'
import type { ResolvedWindowControlAnimation } from './window.control.animation'

/** Which flanking slot the pointer is currently over. */
export type WindowControlSide = 'prefix' | 'suffix'

export interface WindowControlContextValue {
	/** True while the pointer is anywhere over the control (drives the reveal). */
	isHovered: boolean
	/**
	 * The flanking slot currently hovered, or `null`. The grabber reads this to
	 * shrink on the matching side and free room for the slot's hover scale.
	 */
	hoveredSide: WindowControlSide | null
	/** Set by the prefix / suffix slots on pointer enter / leave. */
	setHoveredSide: (side: WindowControlSide | null) => void
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
