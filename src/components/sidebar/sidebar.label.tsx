'use client'

import { cn } from '@/lib/cn'
import type { SidebarLabelProps } from './sidebar.types'

export function SidebarLabel({ className, children }: SidebarLabelProps) {
	return <span className={cn('min-w-0 flex-1 truncate', className)}>{children}</span>
}
