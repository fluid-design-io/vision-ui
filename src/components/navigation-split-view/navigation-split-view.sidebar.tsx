'use client'

import type * as React from 'react'
import { NAV_SPLIT_SIDEBAR_SLOT } from './navigation-split-view.constants'

export type NavigationSplitViewSidebarSlotProps = {
	children: React.ReactNode
}

export function NavigationSplitViewSidebar(_props: NavigationSplitViewSidebarSlotProps) {
	return null
}

;(NavigationSplitViewSidebar as typeof NavigationSplitViewSidebar & { slot: string }).slot =
	NAV_SPLIT_SIDEBAR_SLOT
