import { cn } from '@/lib/cn'
import { useSelector } from '@tanstack/react-store'
import { AnimatePresence, motion } from 'motion/react'
import environmentAtom from './environment.atom'
import { HOME_ENVIRONMENT } from './environment.data'

function Environment({ children }: { children: React.ReactNode }) {
	const environment = useSelector(environmentAtom)
	return (
		<div
			className={cn(
				'h-dvh w-full',
				'relative mx-auto flex items-center justify-center overflow-hidden rounded-[--tile-radius]',
				'px-4 py-1 sm:px-8 md:px-12 lg:px-16',
				'after:pointer-events-none after:absolute after:inset-0 after:z-0 after:overflow-hidden after:rounded-[--tile-radius] after:[box-shadow:inset_0_0_16px_16px_hsl(var(--background))]',
			)}
			data-vision-os-ui
		>
			<div
				style={{ backgroundImage: `url(${HOME_ENVIRONMENT.background})` }}
				className="bg-cover bg-center inset-0 fixed z-[-3]"
			/>
			<AnimatePresence mode="sync">
				{environment && (
					<motion.div
						key={`bg-${environment.id}-background`}
						className="absolute inset-0 z-[-2]"
						style={{
							backgroundImage: `url(${environment.background})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							maskRepeat: 'no-repeat',
							WebkitMaskRepeat: 'no-repeat',
							maskOrigin: 'center',
							WebkitMaskOrigin: 'center',
							maskPosition: 'center',
							WebkitMaskPosition: 'center',
						}}
						initial={{
							maskSize: '10vw 10vh',
							maskImage: 'radial-gradient(circle, black 0%, transparent 0%)',
							opacity: 0,
						}}
						animate={{
							maskSize: '200vw 200vh',
							maskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
							opacity: 1,
							transition: {
								opacity: {
									type: 'tween',
									ease: 'easeInOut',
									delay: 0.35,
									duration: 0.5,
								},
								maskImage: {
									type: 'spring',
									bounce: 0,
									duration: 4,
								},
							},
						}}
						exit={{
							maskSize: '100vw 100vh',
							maskImage: 'radial-gradient(circle, black 0%, transparent 0%)',
							opacity: 0,
							transition: {
								type: 'tween',
								duration: 0.8,
								opacity: {
									delay: 0.3,
									duration: 0.5,
								},
							},
						}}
					>
						{environment?.background && (
							<img
								src={environment?.background}
								alt={`${environment?.label} background`}
								className="size-full object-cover"
								style={{
									backgroundPosition: 'center 10%',
								}}
								sizes="100vw"
							/>
						)}
					</motion.div>
				)}
			</AnimatePresence>
			<div
				className={cn(
					'pointer-events-none absolute inset-0 z-[-1]',
					'transition-colors duration-1000',
					environment?.brightnessOffset ?? 'bg-black/10',
				)}
			/>

			{children}
		</div>
	)
}

export default Environment
