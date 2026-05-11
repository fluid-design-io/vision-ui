'use client'

import { cn } from '@/lib/cn'
import { StackChromeBottom } from './stack.bottom'
import { StackChromeProvider } from './stack.context'
import { StackChromeHeader, StackHeader } from './stack.header'
import { StackScreen } from './stack.screen'
import { StackScreenBackButton } from './stack.screen.back-button'
import { StackSearchBar } from './stack.search-bar'
import { StackTitle } from './stack.title'
import type { StackRootProps } from './stack.types'
import { Toolbar } from './toolbar'

function StackRoot({ className, children }: StackRootProps) {
	return (
		<StackChromeProvider>
			<div className={cn('flex min-h-0 flex-1 flex-col', className)}>{children}</div>
		</StackChromeProvider>
	)
}

export const Stack = Object.assign(StackRoot, {
	Header: Object.assign(StackHeader, {
		Slot: StackChromeHeader,
	}),
	Bottom: {
		Slot: StackChromeBottom,
	},
	Title: StackTitle,
	SearchBar: StackSearchBar,
	Screen: Object.assign(StackScreen, {
		BackButton: StackScreenBackButton,
	}),
	Toolbar,
})
