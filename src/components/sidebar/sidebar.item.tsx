'use client'

import * as React from 'react'
import { isValidElement } from 'react'
import { mergeSlotProps } from '@/lib/slot'
import { cn } from '@/lib/cn'
import { sidebarItemClass } from './sidebar.styles'
import type { SidebarItemProps } from './sidebar.types'

export function SidebarItem({ asChild, isActive, className, children }: SidebarItemProps) {
	const merged = cn(sidebarItemClass({ active: isActive }), className)

	if (asChild && isValidElement(children)) {
		return mergeSlotProps(children as React.ReactElement<Record<string, unknown>>, {
			className: merged,
		} as Record<string, unknown>)
	}

	return (
		<button type="button" className={merged}>
			{children}
		</button>
	)
}
