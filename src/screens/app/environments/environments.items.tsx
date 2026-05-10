import environmentAtom from '@/components/environment/environment.atom'
import data from '@/components/environment/environment.data'
import { Environment } from '@/components/environment/environment.types'
import { ListRenderItemInfo } from '@/components/grid-list'
import { cn } from '@/lib/cn'
import { useAtom } from '@tanstack/react-store'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'

const honeycombIconClassName = cn(
	'pointer-events-none touch-none object-contain p-3 transition-all duration-300',
	'group-hover/cell:!translate-y-[var(--col-offset,-1px)] group-hover/cell:!translate-x-[var(--row-offset,-1px)] translate-x-0 translate-y-0',
	'group-focus-visible/cell:!translate-y-[var(--col-offset,-1px)] group-focus-visible/cell:!translate-x-[var(--row-offset,-1px)]',
	'[filter:drop-shadow(0px_0px_1px_rgba(12,12,12,0))] group-hover/cell:[filter:drop-shadow(calc(var(--row-offset,-1px)*-1.5)_calc(var(--col-offset,-1px)*-1.5)_1px_rgba(0,0,0,0.38))]',
	'group-focus-visible/cell:[filter:drop-shadow(calc(var(--row-offset,-1px)*-1.5)_calc(var(--col-offset,-1px)*-1.5)_1px_rgba(0,0,0,0.38))]',
)

type ItemProps = Pick<Environment, 'id' | 'label' | 'icon' | 'background'> & {
	href?: string
}

export const items: ItemProps[] = data.map((environment) => ({
	id: environment.id,
	label: environment.label,
	icon: environment.icon,
	background: environment.background,
}))

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

export const renderCell = ({ item, rowIndex, colIndex }: ListRenderItemInfo<ItemProps>) => {
	const [isLongHover, setIsLongHover] = useState(false)
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const [, setEnvironment] = useAtom(environmentAtom)

	const handleMouseEnter = () => {
		// Clear any existing timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current)
		}

		// Set a new timeout to trigger long hover after 1.2 seconds
		hoverTimeoutRef.current = setTimeout(() => {
			setIsLongHover(true)
		}, 1200)
	}

	const handleMouseLeave = () => {
		// Clear the timeout and reset the state
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current)
			hoverTimeoutRef.current = null
		}
		setIsLongHover(false)
	}
	return (
		<div
			onClick={() => setEnvironment(data.find((environment) => environment.id === item.id)!)}
			className="flex flex-col items-center justify-center gap-2"
		>
			<motion.div
				//! This causes firefox to not render the cell properly
				// material={{ thickness: 'thin' }}
				className={cn(
					'relative flex items-center justify-center overflow-hidden rounded-full bg-neutral-900/70 duration-300 [--view-diameter:100px] [--view-radius:50px]',
					'group/cell',
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
				style={{
					width: isLongHover ? 140 : 100,
					height: 100,
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className={'pointer-events-none absolute inset-0'}>
					<img src={item.background} alt={item.label} className="size-full object-cover" />
					<div
						className={cn(
							'absolute inset-0 z-10 bg-white/10 opacity-0 transition-opacity duration-300',
							'bg-blend-overlay',
							'group-hover/cell:opacity-100',
						)}
					/>
				</div>
			</motion.div>
			<p className="text-xs text-white/85">{item.label}</p>
		</div>
	)
}
