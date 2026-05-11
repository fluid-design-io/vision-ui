'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import type { ToolbarSearchBarSlotProps } from './toolbar.types'

/** Reserves horizontal space in the bottom toolbar row for a companion search field (use with `Stack.SearchBar`). */
export function ToolbarSearchBarSlot({ hidden, className }: ToolbarSearchBarSlotProps) {
	if (hidden) return null
	return (
		<span
			className={cn('inline-flex min-h-[36px] min-w-[120px] flex-1 rounded-lg border border-dashed border-white/15', className)}
			aria-hidden="true"
		/>
	)
}

ToolbarSearchBarSlot.displayName = TOOLBAR_DISPLAY_NAME.SEARCH_BAR_SLOT
