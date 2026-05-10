import environmentAtom from '@/components/environment/environment.atom'
import data from '@/components/environment/environment.data'
import { Environment } from '@/components/environment/environment.types'
import { ListRenderItemInfo } from '@/components/grid-list'
import { cn } from '@/lib/cn'
import { useAtom } from '@tanstack/react-store'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'

type ItemProps = Pick<Environment, 'id' | 'label' | 'icon' | 'background'> & {
	href?: string
}

export const items: ItemProps[] = data.map((environment) => ({
	id: environment.id,
	label: environment.label,
	icon: environment.icon,
	background: environment.background,
}))

export const renderCell = ({ item, rowIndex, colIndex }: ListRenderItemInfo<ItemProps>) => {
	const [isLongHover, setIsLongHover] = useState(false)
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const [, setEnvironment] = useAtom(environmentAtom)

	const handleMouseEnter = () => {
		// Clear any existing timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current)
		}

		// Set a new timeout to trigger long hover after 1.1 seconds
		hoverTimeoutRef.current = setTimeout(() => {
			setIsLongHover(true)
		}, 1100)
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
				className={cn(
					'relative flex items-center justify-center overflow-hidden rounded-full bg-neutral-900/70 [--view-diameter:100px] [--view-radius:50px]',
					'group/cell',
				)}
				whileHover={{
					scale: 1.05,
					transition: {
						type: 'spring',
						duration: 3,
					},
				}}
				transition={{
					type: 'spring',
					duration: 0.35,
				}}
				animate={{
					width: isLongHover ? 140 : 100,
					transition: {
						type: 'spring',
						bounce: 0,
					},
				}}
				style={{
					height: 100,
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className={'pointer-events-none absolute inset-0'}>
					<img src={item.icon} alt={item.label} className="size-full object-cover" />
					<div
						className={cn(
							'absolute inset-0 z-10 bg-white/10 opacity-0 transition-opacity duration-300',
							'bg-blend-overlay',
							'group-hover/cell:opacity-100',
						)}
					/>
				</div>
			</motion.div>
			<p className="text-xs text-white/85 text-shadow-md">{item.label}</p>
		</div>
	)
}
