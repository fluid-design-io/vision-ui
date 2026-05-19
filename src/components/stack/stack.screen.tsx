'use client'

import { useRender } from '@base-ui/react/use-render'
import { DISPLAY_NAME } from './stack.constants'
import type { StackScreenProps } from './stack.types'

export function StackScreen({ render, className, style, children }: StackScreenProps) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: {
			className,
			style,
			children,
			'data-slot': 'stack-screen',
		},
		enabled: children != null,
	})
}

StackScreen.displayName = DISPLAY_NAME.SCREEN
