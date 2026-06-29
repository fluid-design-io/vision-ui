'use client'

import { AppStoreIcon, SearchIcon, SpacialIcon } from '@/components/icons'
import { Ornament, useOrnament } from '@/components/ornament'
import { useSoundEffect } from '@/lib/sound/sound.hooks'
import { Outlet, useMatchRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'

/** Which App Store tab the current route maps to (drives the rail's active state). */
function useAppStoreTab(): 'apps' | 'arcade' | 'search' {
	'use no memo'
	const matchRoute = useMatchRoute()
	if (matchRoute({ to: '/app-store/arcade' })) return 'arcade'
	if (matchRoute({ to: '/app-store/search' })) return 'search'
	return 'apps'
}

/**
 * App Store shell: the ornament tab rail + the routed Outlet. Each tab route renders
 * its own Window/Stack so its chrome can be customized per page.
 */
export default function AppStoreLayout() {
	const navigate = useNavigate()
	const playSound = useSoundEffect()
	const tab = useAppStoreTab()

	const onNavigate = (to: string) => {
		playSound('ornamentSelect', { volume: 0.1 })
		navigate({
			to,
			viewTransition: {
				types: ['ornament-tab-switch'],
			},
		})
	}

	return (
		<Ornament className="mx-auto flex h-[min(760px,82dvh)] w-[min(72rem,92vw)] items-center justify-center gap-6">
			<Ornament.Tabs>
				<Ornament.Tab isActive={tab === 'apps'} onClick={() => onNavigate('/app-store')}>
					<Ornament.TabIcon icon={<AppStoreIcon className="size-6" data-slot="icon" />} />
					<Ornament.TabLabel>Apps & Games</Ornament.TabLabel>
				</Ornament.Tab>
				<Ornament.Tab isActive={tab === 'arcade'} onClick={() => onNavigate('/app-store/arcade')}>
					<Ornament.TabIcon icon={<SpacialIcon className="size-6" data-slot="icon" />} />
					<Ornament.TabLabel>Arcade</Ornament.TabLabel>
				</Ornament.Tab>
				<Ornament.Tab isActive={tab === 'search'} onClick={() => onNavigate('/app-store/search')}>
					<Ornament.TabIcon icon={<SearchIcon className="size-6" data-slot="icon" />} />
					<Ornament.TabLabel>Search</Ornament.TabLabel>
				</Ornament.Tab>
			</Ornament.Tabs>
			<AppStoreOutlet />
		</Ornament>
	)
}

/** Scales the routed window down slightly while the rail is pressed. */
function AppStoreOutlet() {
	const { isPressed } = useOrnament()

	return (
		<motion.div
			animate={{ scale: isPressed ? 0.985 : 1 }}
			transition={{ type: 'spring', bounce: 0.02 }}
			className="flex h-full min-w-0 flex-1 items-center justify-center"
		>
			<Outlet />
		</motion.div>
	)
}
