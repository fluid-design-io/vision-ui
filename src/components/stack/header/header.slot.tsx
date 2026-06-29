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
		scrollY.get() > HEADER_COLLAPSE_AFTER_SCROLL_Y ? 0.25 : 0,
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
			className={cn('z-40 flex shrink-0 flex-col', 'absolute inset-x-0 top-0', className)}
			style={{
				minHeight: HEADER_MIN_HEIGHT,
				...snapshot.headerStyle,
				background:
					scroll && !snapshot.headerTransparent
						? `linear-gradient(to top, transparent, ${headerBackgroundColor})`
						: undefined,
				maskImage: `linear-gradient(to bottom, black 50%, transparent)`,
				WebkitBackdropFilter: `blur(7px)`,
				backdropFilter: `blur(7px)`,
			}}
			data-slot="stack-header"
		>
			<div
				className={cn(
					'flex min-h-(--stack-header-min,5rem) items-center gap-2 py-2 w-full',
					snapshot.headerTransparent && 'pointer-events-auto',
				)}
			>
				{renderHeaderLeading(snapshot)}

				{titleLarge ? (
					<StackLargeHeaderTitle scale={titleScaleValue} y={titleYValue}>
						{title}
					</StackLargeHeaderTitle>
				) : (
					<StackRegularHeaderTitle>{title}</StackRegularHeaderTitle>
				)}

				{renderHeaderTrailing(snapshot)}
			</div>
		</motion.header>
	)
}

StackChromeHeader.displayName = `${DISPLAY_NAME.STACK}.ChromeHeader`
