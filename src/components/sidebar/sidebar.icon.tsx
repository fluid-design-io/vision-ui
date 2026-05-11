'use client'

import { cn } from '@/lib/cn'
import type { SidebarIconProps } from './sidebar.types'

export function SidebarIcon({ className, children }: SidebarIconProps) {
	return (
		<span className={cn('inline-flex size-8 shrink-0 items-center justify-center', className)}>
			{children}
		</span>
	)
}
