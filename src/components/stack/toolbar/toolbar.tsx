'use client'

import { useId, useLayoutEffect, useMemo } from 'react'
import { cn } from '@/lib/cn'
import { nextSeq, useStackChrome } from '../stack.context'
import type { ToolbarPlacement } from '../stack.types'
import { ToolbarBadge } from './toolbar.badge'
import { ToolbarButton } from './toolbar.button'
import { ToolbarPlacementProvider } from './toolbar.context'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import { ToolbarIcon } from './toolbar.icon'
import { ToolbarLabel } from './toolbar.label'
import { ToolbarMenu } from './toolbar.menu'
import { ToolbarMenuAction } from './toolbar.menu-action'
import { ToolbarSearchBarSlot } from './toolbar.search-bar-slot'
import { ToolbarSpacer } from './toolbar.spacer'
import type { StackToolbarProps } from './toolbar.types'
import { ToolbarView } from './toolbar.view'

function toolbarRowClass(placement: ToolbarPlacement) {
	switch (placement) {
		case 'bottomBar':
			return 'flex w-full min-w-0 items-center gap-1'
		case 'principal':
			return 'flex min-w-0 items-center justify-center gap-1'
		case 'topBarLeading':
		case 'topBarTrailing':
		default:
			return 'flex min-w-0 items-center gap-1'
	}
}

function ToolbarRoot({
	placement = 'topBarTrailing',
	tintColor,
	backgroundColor,
	disableImePadding,
	hidden,
	className,
	children,
}: StackToolbarProps) {
	const chrome = useStackChrome()
	const owner = useId()

	const wrapped = useMemo(
		() => (
			<ToolbarPlacementProvider
				value={{ placement, tintColor, backgroundColor, disableImePadding }}
			>
				<div
					className={cn(toolbarRowClass(placement), className)}
					data-stack-toolbar-placement={placement}
					style={
						backgroundColor
							? { backgroundColor }
							: placement === 'bottomBar'
								? { paddingBottom: disableImePadding ? 0 : undefined }
								: undefined
					}
				>
					{children}
				</div>
			</ToolbarPlacementProvider>
		),
		[placement, tintColor, backgroundColor, disableImePadding, className, children],
	)

	useLayoutEffect(() => {
		if (hidden) {
			chrome.registerToolbar(owner, nextSeq(), placement, null)
			return () => chrome.clearOwner(owner)
		}
		chrome.registerToolbar(owner, nextSeq(), placement, wrapped)
		return () => chrome.clearOwner(owner)
	}, [chrome, hidden, owner, placement, wrapped])

	return null
}

ToolbarRoot.displayName = TOOLBAR_DISPLAY_NAME.ROOT

export const Toolbar = Object.assign(ToolbarRoot, {
	Button: ToolbarButton,
	Menu: ToolbarMenu,
	MenuAction: ToolbarMenuAction,
	Spacer: ToolbarSpacer,
	View: ToolbarView,
	Label: ToolbarLabel,
	Icon: ToolbarIcon,
	Badge: ToolbarBadge,
	SearchBarSlot: ToolbarSearchBarSlot,
})
