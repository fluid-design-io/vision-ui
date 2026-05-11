'use client'

import type * as React from 'react'
import { NAV_SPLIT_DETAIL_SLOT } from './navigation-split-view.constants'

export type NavigationSplitViewDetailSlotProps = {
	children: React.ReactNode
}

export function NavigationSplitViewDetail(_props: NavigationSplitViewDetailSlotProps) {
	return null
}

;(NavigationSplitViewDetail as typeof NavigationSplitViewDetail & { slot: string }).slot =
	NAV_SPLIT_DETAIL_SLOT
