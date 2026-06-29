import { Button } from '@/components/button'
import { cn } from '@/lib/cn'
import { ChevronRight, type LucideIcon, User2 } from 'lucide-react'
import type { ReactNode } from 'react'

/** Hides the scrollbar on a scroll container while keeping it scrollable. */
export const HIDE_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/** A squircle app-icon tile: gradient fill + top gloss + a centered glyph. */
export function AppIcon({
	glyph: Glyph,
	gradient,
	className,
}: {
	glyph: LucideIcon
	gradient: string
	className?: string
}) {
	return (
		<div
			className={cn(
				'relative grid shrink-0 place-items-center overflow-hidden rounded-[22%]',
				'shadow-md shadow-black/30 ring-1 ring-inset ring-white/15',
				className,
			)}
			style={{ backgroundImage: gradient }}
		>
			<div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/25 to-transparent" />
			<Glyph className="relative h-1/2 w-1/2 text-white drop-shadow" strokeWidth={2} />
		</div>
	)
}

/** Compact frosted "Get" pill (or price). */
export function GetButton({ label = 'Get' }: { label?: string }) {
	return (
		<Button className="h-8 min-h-0 min-w-[68px] rounded-full px-5 text-[15px] font-semibold tracking-tight">
			{label}
		</Button>
	)
}

/** The "Apple Arcade" eyebrow label used on Arcade cards. */
export function ArcadeLabel({ className }: { className?: string }) {
	return (
		<p className={cn('text-[11px] tracking-wide text-white/70 uppercase', className)}>
			Apple Arcade
		</p>
	)
}

/** Circular profile avatar shown in the top-trailing toolbar. */
export function ProfileAvatar() {
	return (
		<span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-amber-200 via-rose-300 to-indigo-300 text-black/70 ring-1 ring-white/30">
			<User2 className="size-5" strokeWidth={2.25} />
			<span className="sr-only">Account</span>
		</span>
	)
}

/** Section title with a "see all" chevron and an optional subtitle. */
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
	return (
		<div className="px-8">
			<button
				type="button"
				aria-label={`See all ${title}`}
				className="group flex items-center gap-2"
			>
				<h2 className="text-[1.6rem] leading-none font-bold text-foreground">{title}</h2>
				<span className="grid size-6 translate-y-px place-items-center rounded-full bg-white/15 text-foreground transition group-hover:bg-white/25">
					<ChevronRight className="size-4" strokeWidth={2.75} />
				</span>
			</button>
			{subtitle ? <p className="mt-1.5 text-[15px] text-foreground-muted">{subtitle}</p> : null}
		</div>
	)
}

/** Horizontally scrolling, snap-aligned shelf of cards. */
export function Shelf({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<div
			className={cn(
				'flex gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-8 pb-1',
				'snap-x scroll-px-8',
				HIDE_SCROLLBAR,
				className,
			)}
		>
			{children}
		</div>
	)
}
