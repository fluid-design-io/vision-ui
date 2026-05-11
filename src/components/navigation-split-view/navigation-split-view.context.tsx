'use client'

import { createContext, use, useMemo } from 'react'
import type * as React from 'react'
import type { NavigationSplitColumnVisibility } from './navigation-split-view.types'

export type NavigationSplitViewContextValue = {
	columnVisibility: NavigationSplitColumnVisibility
}

const NavigationSplitViewContext = createContext<NavigationSplitViewContextValue | null>(null)

export function NavigationSplitViewProvider({
	columnVisibility,
	children,
}: {
	columnVisibility: NavigationSplitColumnVisibility
	children: React.ReactNode
}) {
	const value = useMemo(() => ({ columnVisibility }), [columnVisibility])
	return (
		<NavigationSplitViewContext.Provider value={value}>{children}</NavigationSplitViewContext.Provider>
	)
}

NavigationSplitViewProvider.displayName = 'NavigationSplitView.Provider'

export function useNavigationSplitView(): NavigationSplitViewContextValue {
	const ctx = use(NavigationSplitViewContext)
	if (!ctx) {
		throw new Error('useNavigationSplitView must be used within <NavigationSplitView>.')
	}
	return ctx
}
