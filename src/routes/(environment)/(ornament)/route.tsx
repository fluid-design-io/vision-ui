import { AppStoreIcon, EnvironmentsIcon, PeopleIcon } from '@/components/icons'
import { Ornament, useOrnament } from '@/components/ornament'
import { useSound } from '@/lib/sound/sound.hooks'
import { useMatchHomeRoute } from '@/screens/home/home.hooks'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'

export const Route = createFileRoute('/(environment)/(ornament)')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Ornament className="flex size-full max-w-5xl mx-auto gap-8">
			<OrnamentTabs />
			<OrnamentOutlet />
		</Ornament>
	)
}

const OrnamentTabs = () => {
	const navigate = useNavigate()
	const { isRootRoute, isPeopleRoute, isEnvironmentsRoute } = useMatchHomeRoute()
	const { play: playOrnamentSelect } = useSound('ornamentSelect', { volume: 0.1 })
	const onNavigate = (to: string) => {
		playOrnamentSelect()
		navigate({
			to,
		})
	}

	return (
		<Ornament.Tabs>
			<Ornament.Tab onClick={() => onNavigate('/')} isActive={!!isRootRoute}>
				<Ornament.TabIcon icon={<AppStoreIcon className="size-6" data-slot="icon" />} />
				<Ornament.TabLabel>Home</Ornament.TabLabel>
			</Ornament.Tab>
			<Ornament.Tab onClick={() => onNavigate('/people')} isActive={!!isPeopleRoute}>
				<Ornament.TabIcon icon={<PeopleIcon className="size-6" data-slot="icon" />} />
				<Ornament.TabLabel>People</Ornament.TabLabel>
			</Ornament.Tab>
			<Ornament.Tab onClick={() => onNavigate('/environments')} isActive={!!isEnvironmentsRoute}>
				<Ornament.TabIcon icon={<EnvironmentsIcon className="size-6" data-slot="icon" />} />
				<Ornament.TabLabel>Environments</Ornament.TabLabel>
			</Ornament.Tab>
		</Ornament.Tabs>
	)
}

const OrnamentOutlet = () => {
	const { isPressed } = useOrnament()
	return (
		<motion.div
			animate={{
				scale: isPressed ? 0.985 : 1,
			}}
			transition={{
				type: 'spring',
				bounce: 0.02,
			}}
			className="w-full h-full flex-1 flex items-center justify-center"
		>
			<Outlet />
		</motion.div>
	)
}
