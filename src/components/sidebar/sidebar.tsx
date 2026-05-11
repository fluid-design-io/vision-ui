'use client'

import { cn } from '@/lib/cn'
import { SidebarHeader } from './sidebar.header'
import { SidebarIcon } from './sidebar.icon'
import { SidebarItem } from './sidebar.item'
import { SidebarLabel } from './sidebar.label'
import { SidebarSection } from './sidebar.section'
import type { SidebarRootProps } from './sidebar.types'

function SidebarRoot({ className, children }: SidebarRootProps) {
	return (
		<div
			className={cn('flex h-full min-h-0 flex-col overflow-hidden', className)}
			data-slot="sidebar-root"
		>
			{children}
		</div>
	)
}

export const Sidebar = Object.assign(SidebarRoot, {
	Header: SidebarHeader,
	Section: SidebarSection,
	Item: SidebarItem,
	Label: SidebarLabel,
	Icon: SidebarIcon,
})
