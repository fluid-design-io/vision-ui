import type * as React from 'react'

export type NavigationSplitColumnVisibility = 'all' | 'detailOnly' | 'doubleColumn'

export interface NavigationSplitViewRootProps {
	className?: string
	children: React.ReactNode
	/** Mirrors SwiftUI `NavigationSplitViewColumn`. */
	columnVisibility?: NavigationSplitColumnVisibility
	/** Preferred sidebar column width when visible (px). */
	sidebarWidth?: number
}
