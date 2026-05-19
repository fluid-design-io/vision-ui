'use client'

import { cn } from '@/lib/cn'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { StackChromeHeader, StackHeader } from './header'
import { StackChromeBottom } from './stack.bottom'
import { StackChromeProvider } from './stack.context'
import { StackScreen } from './stack.screen'
import { StackScreenBackButton } from './stack.screen.back-button'
import { StackSearchBar } from './stack.search-bar'
import { StackTitle } from './stack.title'
import type { StackRootProps } from './stack.types'
import { Toolbar } from './toolbar'

function StackRoot({ render, className, children, ...props }: StackRootProps) {
	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			slot: 'stack-root',
		},
		props: mergeProps(
			{
				className: cn('overflow-hidden', className),
				children: <StackChromeProvider>{children}</StackChromeProvider>,
			},
			props,
		),
	})
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
