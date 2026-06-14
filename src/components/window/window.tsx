'use client'

import * as React from 'react'

import { cn } from '@/lib/cn'

import { WindowControl } from './window.control'
import type { WindowRootProps } from './window.types'

const DISPLAY_NAME = 'VisionUI.Window'

function isWindowControl(child: React.ReactNode): boolean {
	if (!React.isValidElement(child)) return false
	const type = child.type as { displayName?: string }
	return (
		type === WindowControl ||
		type === WindowControl.Root ||
		type?.displayName === WindowControl.displayName
	)
}

/**
 * Frames a window (Stack, NavigationSplitView, Surface, …) and attaches its
 * controls beneath it. Establishes the positioned anchor that `Window.Control`
 * needs, so the control is centered just below the window and — being an
 * absolute overlay — never affects the window's size or the surrounding layout.
 *
 * Pass `onClose` for the default control, or compose your own `Window.Control`
 * as a child for full control.
 */
function WindowRoot({ onClose, className, children, ...props }: WindowRootProps) {
	const childArray = React.Children.toArray(children)
	const control = childArray.find(isWindowControl) ?? null
	const content = childArray.filter((child) => child !== control)

	return (
		<div data-slot="window" className={cn('relative', className)} {...props}>
			{content}
			{control ?? <WindowControl onClose={onClose} />}
		</div>
	)
}

WindowRoot.displayName = DISPLAY_NAME

export const Window = Object.assign(WindowRoot, {
	Root: WindowRoot,
	Control: WindowControl,
})
