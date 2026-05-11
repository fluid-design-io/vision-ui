'use client'

import type * as React from 'react'
import { createContext, use } from 'react'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import type { ToolbarPlacementContextValue } from './toolbar.types'

const ToolbarPlacementContext = createContext<ToolbarPlacementContextValue | null>(null)

export function ToolbarPlacementProvider({
	value,
	children,
}: {
	value: ToolbarPlacementContextValue
	children: React.ReactNode
}) {
	return (
		<ToolbarPlacementContext.Provider value={value}>{children}</ToolbarPlacementContext.Provider>
	)
}

ToolbarPlacementProvider.displayName = `${TOOLBAR_DISPLAY_NAME.ROOT}.PlacementProvider`

export function useToolbarPlacement(): ToolbarPlacementContextValue {
	const ctx = use(ToolbarPlacementContext)
	if (!ctx) {
		throw new Error('Toolbar items must be used within <Stack.Toolbar>.')
	}
	return ctx
}
