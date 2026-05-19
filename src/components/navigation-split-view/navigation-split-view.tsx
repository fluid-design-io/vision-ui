'use client'

import { cn } from '@/lib/cn'
import { motion } from 'motion/react'
import * as React from 'react'
import { Children, isValidElement } from 'react'
import { Surface } from '../surface'
import { NAV_SPLIT_DETAIL_SLOT, NAV_SPLIT_SIDEBAR_SLOT } from './navigation-split-view.constants'
import { NavigationSplitViewProvider } from './navigation-split-view.context'
import { NavigationSplitViewDetail } from './navigation-split-view.detail'
import { NavigationSplitViewSidebar } from './navigation-split-view.sidebar'
import { navigationSplitRootClass } from './navigation-split-view.styles'
import type { NavigationSplitViewRootProps } from './navigation-split-view.types'

function extractSlot(
	children: React.ReactNode,
	slotMarker: typeof NAV_SPLIT_SIDEBAR_SLOT | typeof NAV_SPLIT_DETAIL_SLOT,
): React.ReactNode {
	let found: React.ReactNode = null
	Children.forEach(children, (child) => {
		if (!isValidElement(child)) return
		const Type = child.type as { slot?: string }
		if (Type.slot === slotMarker) {
			const props = child.props as { children: React.ReactNode }
			found = props.children
		}
	})
	return found
}

function NavigationSplitViewRoot({
	columnVisibility = 'all',
	sidebarWidth = 260,
	className,
	children,
}: NavigationSplitViewRootProps) {
	const sidebarContent = extractSlot(children, NAV_SPLIT_SIDEBAR_SLOT)
	const detailContent = extractSlot(children, NAV_SPLIT_DETAIL_SLOT)

	const hideSidebar = columnVisibility === 'detailOnly'

	return (
		<NavigationSplitViewProvider columnVisibility={columnVisibility}>
			<Surface
				thickness="thick"
				className={navigationSplitRootClass({ className })}
				data-slot="navigation-split-view-root"
			>
				<motion.aside
					initial={false}
					animate={{
						width: hideSidebar ? 0 : sidebarWidth,
						opacity: hideSidebar ? 0 : 1,
					}}
					transition={{ type: 'spring', stiffness: 420, damping: 38 }}
					className={cn(
						'relative',
						'before:absolute before:inset-0 before:size-full before:bg-neutral-600/15 before:brightness-35',
						hideSidebar && 'pointer-events-none border-none',
					)}
					aria-hidden={hideSidebar}
				>
					<div
						className="flex h-full min-h-0 flex-col overflow-auto"
						style={{
							width: hideSidebar ? 0 : sidebarWidth,
							minWidth: hideSidebar ? 0 : sidebarWidth,
						}}
					>
						{sidebarContent}
					</div>
				</motion.aside>
				<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{detailContent}</div>
			</Surface>
		</NavigationSplitViewProvider>
	)
}

export const NavigationSplitView = Object.assign(NavigationSplitViewRoot, {
	Sidebar: NavigationSplitViewSidebar,
	Detail: NavigationSplitViewDetail,
})
