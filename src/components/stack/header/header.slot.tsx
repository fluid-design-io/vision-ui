'use client'

import { useOptionalScroll } from '@/components/scrollview'
import { cn } from '@/lib/cn'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { DISPLAY_NAME } from '../stack.constants'
import { useStackChromeSnapshot } from '../stack.context'
import { HEADER_COLLAPSE_AFTER_SCROLL_Y, HEADER_MIN_HEIGHT, HEADER_SCRIM_SPRING } from './constants'
import { renderHeaderLeading, renderHeaderTrailing } from './header.render'
import { StackLargeHeaderTitle } from './header.title.large'
import { StackRegularHeaderTitle } from './header.title.regular'

export function StackChromeHeader({ className }: { className?: string }) {
	const snapshot = useStackChromeSnapshot()
	const scroll = useOptionalScroll()
	const fallbackScrollY = useMotionValue(0)
	const scrollY = scroll?.scrollY ?? fallbackScrollY

	const scrimAlphaTarget = useTransform((): number =>
		scrollY.get() > HEADER_COLLAPSE_AFTER_SCROLL_Y ? 0.45 : 0,
	)
	const scrimAlpha = useSpring(scrimAlphaTarget, HEADER_SCRIM_SPRING)
	const headerBackgroundColor = useMotionTemplate`linear-gradient(rgba(0, 0, 0, ${scrimAlpha}), rgba(0, 0, 0, 0))`
	const titleScale = useTransform((): number =>
		scrollY.get() > HEADER_COLLAPSE_AFTER_SCROLL_Y ? 1 : 1.15,
	)
	const titleScaleValue = useSpring(titleScale, HEADER_SCRIM_SPRING)
	const titleY = useTransform((): number =>
		scrollY.get() > HEADER_COLLAPSE_AFTER_SCROLL_Y ? 0 : 8,
	)
	const titleYValue = useSpring(titleY, HEADER_SCRIM_SPRING)
	if (snapshot.headerHidden) return null

	const titleLarge =
		snapshot.titleDisplayMode === 'large' ||
		(snapshot.titleDisplayMode === 'automatic' && snapshot.toolbarPrincipal != null)
	const title = snapshot.toolbarPrincipal ?? snapshot.title

	return (
		<motion.header
			className={cn(
				'z-40 flex shrink-0 flex-col',
				'pointer-events-none absolute inset-x-0 top-1',
				className,
			)}
			style={{
				background: scroll && !snapshot.headerTransparent ? headerBackgroundColor : undefined,
				minHeight: HEADER_MIN_HEIGHT,
				...snapshot.headerStyle,
			}}
			data-slot="stack-header"
		>
			<div
				className={cn(
					'flex min-h-(--stack-header-min,5rem) items-center gap-2 px-3 py-2 w-full',
					snapshot.headerTransparent && 'pointer-events-auto',
				)}
			>
				{renderHeaderLeading(snapshot)}
				<div className="flex min-w-0 flex-1 items-center gap-2">
					{titleLarge ? (
						<StackLargeHeaderTitle scale={titleScaleValue} y={titleYValue}>
							{title}
						</StackLargeHeaderTitle>
					) : (
						<StackRegularHeaderTitle>{title}</StackRegularHeaderTitle>
					)}
				</div>
				{renderHeaderTrailing(snapshot)}
			</div>
		</motion.header>
	)
}

StackChromeHeader.displayName = `${DISPLAY_NAME.STACK}.ChromeHeader`
