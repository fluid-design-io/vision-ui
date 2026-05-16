import environmentAtom from '@/components/environment/environment.atom'
import data from '@/components/environment/environment.data'
import { Environment } from '@/components/environment/environment.types'
import { ListRenderItemInfo } from '@/components/grid-list'
import { cn } from '@/lib/cn'
import { playSoundEffect } from '@/lib/sound/sound.effects'
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

export const renderCell = ({ item }: ListRenderItemInfo<ItemProps>) => {
	const [isLongHover, setIsLongHover] = useState(false)
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const [, setEnvironment] = useAtom(environmentAtom)

	const handleMouseEnter = () => {
		playSoundEffect('homeIconGaze')

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

	const handleMouseUp = () => {
		playSoundEffect('homeIconSelect')
	}

	const handleClick = () => {
		setEnvironment(data.find((environment) => environment.id === item.id)!)
	}

	return (
		<div
			onClick={handleClick}
			onMouseUp={handleMouseUp}
			className="flex flex-col items-center justify-center gap-2"
		>
			<motion.div
				className={cn(
					'relative flex items-center justify-center [--view-diameter:100px] [--view-radius:50px]',
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
				initial={{ width: 100 }}
				animate={{
					width: isLongHover ? 180.4 : 100,
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
				<motion.div
					className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
					animate={{
						height: isLongHover ? 114 : 100,
						y: isLongHover ? -7 : 0,
					}}
					transition={{
						type: 'spring',
						bounce: 0,
					}}
				>
					<motion.img
						src={item.icon}
						alt={item.label}
						className="object-cover size-full bg-center bg-cover"
						initial={{
							scale: 1.27,
						}}
						animate={{
							scale: isLongHover ? 1.1 : 1.27,
						}}
						transition={{
							type: 'spring',
							bounce: 0,
						}}
					/>
					<div
						className={cn(
							'absolute inset-0 z-10 bg-white/4 opacity-0 transition-opacity duration-300',
							'bg-blend-overlay',
							'group-hover/cell:opacity-100',
						)}
					/>
				</motion.div>
			</motion.div>
			<p className="text-xs text-white/85 text-shadow-md">{item.label}</p>
		</div>
	)
}
