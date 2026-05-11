'use client'

import { useOptionalScroll } from '@/components/scrollview'
import { cn } from '@/lib/cn'
import { motion, useMotionValue, useTransform } from 'motion/react'
import * as React from 'react'
import { DISPLAY_NAME, STACK_LAYOUT } from './stack.constants'
import { nextSeq, useStackChrome, useStackChromeSnapshot } from './stack.context'
import type { StackHeaderProps } from './stack.types'

/** Registers navigation bar chrome options (material / visibility). Renders nothing. */
export function StackHeader({ hidden = false, transparent = false, style }: StackHeaderProps) {
	const chrome = useStackChrome()
	const owner = React.useId()

	React.useLayoutEffect(() => {
		const seq = nextSeq()
		const mergedStyle = { ...style }
		if (transparent) {
			mergedStyle.backgroundColor =
				mergedStyle.backgroundColor ?? ('transparent' as unknown as string)
		}
		chrome.registerHeaderStyle(owner, seq, {
			style: mergedStyle,
			hidden,
			transparent,
		})
		return () => chrome.clearOwner(owner)
	}, [chrome, owner, hidden, transparent, style])

	return null
}

StackHeader.displayName = DISPLAY_NAME.HEADER

export function StackChromeHeader({ className }: { className?: string }) {
	const snapshot = useStackChromeSnapshot()
	const scroll = useOptionalScroll()
	const fallbackScrollY = useMotionValue(0)
	const scrollY = scroll?.scrollY ?? fallbackScrollY
	const headerBackgroundColor = useTransform(
		scrollY,
		[0, 28],
		['rgba(0,0,0,0)', 'rgba(0,0,0,0.25)'],
	)
	const headerBorderColor = useTransform(
		scrollY,
		[0, 28],
		['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)'],
	)
	const titleScale = useTransform(scrollY, [0, 72], [1.08, 1])
	const titleY = useTransform(scrollY, [0, 72], [4, 0])

	if (snapshot.headerHidden) return null

	const titleLarge =
		snapshot.titleDisplayMode === 'large' ||
		(snapshot.titleDisplayMode === 'automatic' && snapshot.toolbarPrincipal != null)

	const titleMotionStyle = titleLarge
		? {
				scale: titleScale,
				y: titleY,
				transformOrigin: 'left center',
			}
		: undefined

	return (
		<motion.header
			className={cn(
				'sticky top-1 z-40 flex shrink-0 flex-col border-b',
				snapshot.headerTransparent && 'pointer-events-none absolute inset-x-0 top-0 border-none',
				className,
			)}
			style={{
				backgroundColor: scroll && !snapshot.headerTransparent ? headerBackgroundColor : undefined,
				borderColor: scroll && !snapshot.headerTransparent ? headerBorderColor : undefined,
				minHeight: STACK_LAYOUT.headerMinHeight,
				...snapshot.headerStyle,
			}}
		>
			<div
				className={cn(
					'flex min-h-[var(--stack-header-min,3rem)] items-center gap-2 px-3 py-2',
					snapshot.headerTransparent && 'pointer-events-auto',
				)}
			>
				<div className="flex min-w-0 flex-1 items-center gap-2">
					<div className="flex shrink-0 items-center gap-1">{snapshot.toolbarTopBarLeading}</div>
					<div className="flex shrink-0">{snapshot.backButton}</div>
					<motion.div
						className={cn(
							'min-w-0 flex-1 truncate font-medium text-white/95',
							titleLarge ? 'text-xl leading-tight sm:text-2xl' : 'text-base',
						)}
						style={titleMotionStyle}
					>
						{snapshot.toolbarPrincipal ?? snapshot.title}
					</motion.div>
				</div>
				<div className="flex max-w-[min(28rem,55vw)] min-w-0 flex-1 items-center justify-end gap-2">
					{snapshot.searchBar}
					<div className="flex shrink-0 items-center gap-1">{snapshot.toolbarTopBarTrailing}</div>
				</div>
			</div>
		</motion.header>
	)
}

StackChromeHeader.displayName = `${DISPLAY_NAME.STACK}.ChromeHeader`
