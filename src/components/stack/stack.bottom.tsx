'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { DISPLAY_NAME, STACK_LAYOUT } from './stack.constants'
import { useStackChromeSnapshot } from './stack.context'

export function StackChromeBottom({ className }: { className?: string }) {
	const snapshot = useStackChromeSnapshot()

	if (!snapshot.toolbarBottomBar) return null

	return (
		<footer
			className={cn(
				'sticky bottom-0 z-40 flex shrink-0 items-center gap-2 border-t border-white/10 bg-black/25 px-3 py-2 backdrop-blur-xl',
				className,
			)}
			style={{ minHeight: STACK_LAYOUT.bottomBarMinHeight }}
		>
			{snapshot.toolbarBottomBar}
		</footer>
	)
}

StackChromeBottom.displayName = `${DISPLAY_NAME.STACK}.ChromeBottom`
