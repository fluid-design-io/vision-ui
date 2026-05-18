import {
	getGridCellStyle,
	getGridCellViewTransitionClass,
	ListRenderItemInfo,
} from '@/components/grid-list'
import { Surface } from '@/components/surface'
import { cn } from '@/lib/cn'
import { playSoundEffect } from '@/lib/sound/sound.effects'
import type { CSSProperties } from 'react'

interface ItemProps {
	id: string
	label: string
	icon: string
}

const honeycombIconClassName = cn(
	'pointer-events-none touch-none object-contain transition-all duration-300 opacity-70',
	'group-hover/cell:!translate-y-[var(--col-offset,-1px)] group-hover/cell:!translate-x-[var(--row-offset,-1px)] translate-x-0 translate-y-0',
	'group-focus-visible/cell:!translate-y-[var(--col-offset,-1px)] group-focus-visible/cell:!translate-x-[var(--row-offset,-1px)]',
	'[filter:drop-shadow(0px_0px_1px_rgba(12,12,12,0))] group-hover/cell:[filter:drop-shadow(calc(var(--row-offset,-1px)*-1.5)_calc(var(--col-offset,-1px)*-1.5)_1px_rgba(0,0,0,0.38))]',
	'group-focus-visible/cell:[filter:drop-shadow(calc(var(--row-offset,-1px)*-1.5)_calc(var(--col-offset,-1px)*-1.5)_1px_rgba(0,0,0,0.38))]',
	'group-hover/cell:opacity-100',
	'group-focus-visible/cell:opacity-100',
)

export const items: ItemProps[] = [
	{
		id: 'new-facetime',
		label: 'New FaceTime',
		icon: '/assets/landing/people/new-facetime.png',
	},
	{
		id: 'nearby',
		label: 'Nearby',
		icon: '/assets/landing/people/nearby.png',
	},
	{
		id: 'recents',
		label: 'Recents',
		icon: '/assets/landing/people/recents.png',
	},
]

type ViewTransitionStyle = CSSProperties & {
	viewTransitionClass?: string
}
export const renderCell = ({
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

	return (
		<div
			className="flex flex-col items-center justify-center gap-2"
			data-slot="grid-cell"
			style={viewTransitionStyle}
		>
			<Surface
				className={cn(
					'relative flex size-[100px] bg-neutral-600/35 items-center justify-center overflow-hidden rounded-full [--view-diameter:100px] [--view-radius:50px]',
					'group/cell',
				)}
				whileHover={{
					scale: 1.05,
					transition: {
						type: 'spring',
						duration: 0.8,
					},
				}}
				transition={{
					type: 'spring',
					duration: 0.35,
				}}
				onMouseEnter={playGazeSoundFromStart}
				onMouseUp={playSelectSoundFromStart}
			>
				<div className={'pointer-events-none absolute inset-0'}>
					<div
						className={cn(
							'absolute inset-0 z-10 bg-white/10 opacity-0 transition-opacity duration-350',
							'bg-blend-overlay',
							'group-hover/cell:opacity-100',
						)}
					/>
				</div>
				<div className="absolute inset-0 transition-all duration-350">
					<img src={item.icon} alt={item.label} className={honeycombIconClassName} />
				</div>
			</Surface>

			<p className="text-xs text-white/85 text-shadow-md">{item.label}</p>
		</div>
	)
}
