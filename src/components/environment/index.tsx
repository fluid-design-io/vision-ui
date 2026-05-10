import { cn } from '@/lib/cn'
import { useSelector } from '@tanstack/react-store'
import { AnimatePresence, motion } from 'motion/react'
import environmentAtom from './environment.atom'

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
			<AnimatePresence>
				{environment && (
					<motion.div
						key={`bg-${environment.id}-background`}
						className="absolute inset-0 z-[-2]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 2 }}
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

				{/* Current background with mask effect */}
				<motion.div
					key={`bg-${environment.id}`}
					className="absolute inset-0 z-[-1]"
					style={{
						backgroundImage: `url(${environment.background})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						maskImage: 'radial-gradient(circle, black 10%, transparent 15%)',
						WebkitMaskImage: 'radial-gradient(circle, black 10%, transparent 15%)',
						maskRepeat: 'no-repeat',
						WebkitMaskRepeat: 'no-repeat',
						maskOrigin: 'center',
						WebkitMaskOrigin: 'center',
						maskPosition: 'center',
						WebkitMaskPosition: 'center',
					}}
					initial={{
						maskSize: '100vw 100vh',
						opacity: 0,
					}}
					animate={{
						maskSize: '1200vw 1200vh',
						opacity: 1,
					}}
					transition={{
						type: 'spring',
						bounce: 0,
						duration: 3.5,
					}}
				>
					<img
						src={environment.background}
						alt={`${environment.label} background`}
						className="size-full object-cover"
						style={{
							backgroundPosition: 'center 10%',
						}}
						sizes="100vw"
					/>
				</motion.div>
			</AnimatePresence>
			<div
				className={cn(
					'pointer-events-none absolute inset-0 z-[-1]',
					'transition-colors duration-1000',
					environment.brightnessOffset ?? 'bg-black/10',
				)}
			/>

			{children}
			{environment.credit && (
				<div className="pointer-events-none fixed inset-x-0 bottom-0 px-4 pb-4 text-right">
					<a href={environment.credit.url ?? '#'} target="_blank" rel="noopener noreferrer">
						<AnimatePresence mode="popLayout">
							<motion.p
								initial={{
									opacity: 0,
									filter: 'blur(10px)',
								}}
								animate={{
									opacity: 0.6,
									filter: 'blur(0px)',
									transition: {
										delay: 2,
									},
								}}
								exit={{ opacity: 0, filter: 'blur(10px)' }}
								whileHover={{
									opacity: 1,
									filter: 'blur(0px)',
								}}
								className="pointer-events-auto"
							>
								Photo by <span className="underline">{environment.credit.name}</span>
							</motion.p>
						</AnimatePresence>
					</a>
				</div>
			)}
		</div>
	)
}

export default Environment
