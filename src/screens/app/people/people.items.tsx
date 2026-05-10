import { ListRenderItemInfo } from '@/components/grid-list'
import { Surface } from '@/components/surface'
import { cn } from '@/lib/cn'

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

const rowIndexClassName = {
	'0': '[--col-offset:-2px]',
	'1': '[--col-offset:-1px]',
	'2': '[--col-offset:2px]',
}

const colIndexClassName = {
	'0': '[--row-offset:-1.75px]',
	'1': '[--row-offset:-0.75px]',
	'2': '[--row-offset:0px]',
	'3': '[--row-offset:1.25px]',
	'4': '[--row-offset:1.75px]',
}

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

export const renderCell = ({ item, rowIndex, colIndex }: ListRenderItemInfo<ItemProps>) => (
	<div className="flex flex-col items-center justify-center gap-2">
		<Surface
			className={cn(
				'relative flex size-[100px] items-center justify-center overflow-hidden rounded-full bg-neutral-600/70 duration-300 [--view-diameter:100px] [--view-radius:50px]',
				'group/cell',
				rowIndexClassName[rowIndex.toString() as keyof typeof rowIndexClassName],
				colIndexClassName[colIndex.toString() as keyof typeof colIndexClassName],
			)}
			whileHover={{
				scale: 1.05,
				transition: {
					type: 'spring',
					duration: 2,
				},
			}}
			transition={{
				type: 'spring',
				duration: 0.35,
			}}
		>
			<div className={'pointer-events-none absolute inset-0'}>
				<div
					className={cn(
						'absolute inset-0 z-10 bg-white/10 opacity-0 transition-opacity duration-300',
						'bg-blend-overlay',
						'group-hover/cell:opacity-100',
					)}
				/>
			</div>
			<div className="absolute inset-0 transition-all duration-300">
				<img src={item.icon} alt={item.label} className={honeycombIconClassName} />
			</div>
		</Surface>
		<p className="text-xs text-white/85">{item.label}</p>
	</div>
)
