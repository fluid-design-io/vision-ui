import {
	getGridCellStyle,
	getGridCellViewTransitionClass,
	ListRenderItemInfo,
} from '@/components/grid-list'
import { cn } from '@/lib/cn'
import { playSoundEffect } from '@/lib/sound/sound.effects'
import type { FileRoutesByTo } from '@/routeTree.gen'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { CSSProperties } from 'react'

const honeycombIconClassName = cn(
	'pointer-events-none touch-none object-contain p-3 transition-all duration-300',
	'group-hover/cell:!translate-y-[var(--col-offset,-1px)] group-hover/cell:!translate-x-[var(--row-offset,-1px)] translate-x-0 translate-y-0',
	'group-focus-visible/cell:!translate-y-[var(--col-offset,-1px)] group-focus-visible/cell:!translate-x-[var(--row-offset,-1px)]',
	'[filter:drop-shadow(0px_0px_1px_rgba(12,12,12,0))] group-hover/cell:[filter:drop-shadow(calc(var(--row-offset,-1px)*-1.5)_calc(var(--col-offset,-1px)*-1.5)_1px_rgba(0,0,0,0.38))]',
	'group-focus-visible/cell:[filter:drop-shadow(calc(var(--row-offset,-1px)*-1.5)_calc(var(--col-offset,-1px)*-1.5)_1px_rgba(0,0,0,0.38))]',
)

interface ItemProps {
	id: string
	label: string
	icon: string
	background: React.ReactNode
	href?: string
}

export const items: ItemProps[] = [
	{
		id: 'settings',
		label: 'Settings',
		background: <div className="h-full w-full bg-[#2E2E2F]"></div>,
		icon: '/assets/landing/home/icon-settings.avif',
		href: '/settings',
	},
	{
		id: 'app-store',
		label: 'App Store',
		icon: '/assets/landing/home/icon-app-store.avif',
		background: <div className="h-full w-full bg-linear-to-t from-blue-600 to-sky-400"></div>,
		href: '/app-store',
	},
	{
		id: 'photos',
		label: 'Photos',
		icon: '/assets/landing/home/icon-photos.avif',
		background: <div className="h-full w-full bg-white"></div>,
		href: '#photos', // TODO: add back the page
	},
	{
		id: 'github',
		label: 'Source Code',
		icon: '/assets/landing/home/icon-github.avif',
		background: <div className="h-full w-full bg-linear-to-t from-[#060606] to-[#333b40]"></div>,
		href: 'https://github.com/fluid-design-io/vision-ui',
	},
	{
		id: 'docs',
		label: 'API Docs',
		icon: '/assets/landing/home/icon-docs.avif',
		background: <div className="h-full w-full bg-linear-to-t from-[#FCC804] to-[#FFAC04]"></div>,
		href: '/docs',
	},
	{
		id: 'fumadocs',
		label: 'Fumadocs',
		icon: '/assets/landing/home/icon-fumadocs.avif',
		background: <div className="h-full w-full bg-linear-to-t from-[#5A5962] to-[#151515]"></div>,
		href: 'https://fumadocs.vercel.app/',
	},
	...Array.from({ length: process.env.NODE_ENV === 'development' ? 10 : 0 }).map((_, index) => ({
		id: `test${index + 1}`,
		label: `Test ${index + 1}`,
		icon: '/assets/landing/home/icon-fumadocs.avif',
		background: <div className="h-full w-full bg-linear-to-t from-[#5A5962] to-[#151515]"></div>,
		href: `#test${index + 1}`,
	})),
]

type ViewTransitionStyle = CSSProperties & {
	viewTransitionClass?: string
}

const ornamentHrefs = new Set(['/', '/people', '/environments'])

function isAppRouteHref(href: string): href is keyof FileRoutesByTo {
	return href.startsWith('/') && !ornamentHrefs.has(href) && !href.startsWith('/docs')
}

export const renderHomeCell = ({
	item,
	rowIndex,
	colIndex,
	middleRowCols,
}: ListRenderItemInfo<ItemProps>) => {
	const viewTransitionStyle: ViewTransitionStyle = {
		...getGridCellStyle(rowIndex, colIndex, middleRowCols),
		viewTransitionClass: getGridCellViewTransitionClass(rowIndex, colIndex, middleRowCols),
	}

	const playGazeSoundFromStart = () => {
		playSoundEffect('homeIconGaze')
	}

	const playSelectSoundFromStart = () => {
		playSoundEffect('homeIconSelect')
	}

	const handleMouseUp = () => {
		playSelectSoundFromStart()
	}

	const cell = (
		<div data-slot="grid-cell" style={viewTransitionStyle}>
			<motion.div
				className="size-[100px]"
				whileHover={{
					scale: 1.05,
					transition: {
						type: 'spring',
						duration: 0.8,
					},
				}}
			>
				<div
					className={cn(
						'relative flex size-full items-center justify-center overflow-hidden rounded-full bg-neutral-900/70 [--view-diameter:100px] [--view-radius:50px]',
						'group/cell',
					)}
					onMouseEnter={playGazeSoundFromStart}
					onMouseUp={handleMouseUp}
				>
					<div className="pointer-events-none absolute inset-0">
						{item.background}
						<div
							className={cn(
								'absolute inset-0 z-10 bg-white/10 opacity-0 transition-opacity duration-350',
								'bg-blend-overlay',
								'group-hover/cell:opacity-100',
							)}
						/>
					</div>
					<img src={item.icon} alt={item.label} className={honeycombIconClassName} />
				</div>
			</motion.div>
			<p className="text-xs text-white/85 text-shadow-md text-center mt-2">{item.label}</p>
		</div>
	)

	if (item.href && isAppRouteHref(item.href)) {
		return (
			<Link to={item.href} className="block text-center" aria-label={item.label}>
				{cell}
			</Link>
		)
	}

	if (item.href) {
		return (
			<a href={item.href} className="block text-center" aria-label={item.label}>
				{cell}
			</a>
		)
	}

	return cell
}
