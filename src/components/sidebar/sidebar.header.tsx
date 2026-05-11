'use client'

import { cn } from '@/lib/cn'
import type { SidebarHeaderProps } from './sidebar.types'

export function SidebarHeader({ className, children }: SidebarHeaderProps) {
	return (
		<div
			className={cn('border-b border-white/10 px-2 py-3 text-base font-semibold text-white/95', className)}
		>
			{children}
		</div>
	)
}
