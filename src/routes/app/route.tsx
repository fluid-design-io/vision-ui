import Environment from '@/components/environment'
import { AppStoreIcon, EnvironmentsIcon, PeopleIcon } from '@/components/icons'
import { Ornament, useOrnament } from '@/components/ornament'
import { createFileRoute, Outlet, useMatchRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'

export const Route = createFileRoute('/app')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Environment>
			<Ornament className="flex size-full max-w-[52rem] mx-auto gap-8">
				<OrnamentTabs />
				<OrnamentOutlet />
			</Ornament>
		</Environment>
	)
}

const OrnamentTabs = () => {
	const navigate = useNavigate()
	const matchRoute = useMatchRoute()

	const isRootRoute = matchRoute({ to: '/app' })
	const isPeopleRoute = matchRoute({ to: '/app/people' })
	const isEnvironmentsRoute = matchRoute({ to: '/app/environments' })
	return (
		<Ornament.Tabs>
			<Ornament.Tab
				onClick={() => navigate({ to: '/app', viewTransition: { types: ['zoom-out'] } })}
				isActive={!!isRootRoute}
			>
				<Ornament.TabIcon icon={<AppStoreIcon className="size-6" data-slot="icon" />} />
				<Ornament.TabLabel>Home</Ornament.TabLabel>
			</Ornament.Tab>
			<Ornament.Tab
				onClick={() => navigate({ to: '/app/people', viewTransition: { types: ['zoom-out'] } })}
				isActive={!!isPeopleRoute}
			>
				<Ornament.TabIcon icon={<PeopleIcon className="size-6" data-slot="icon" />} />
				<Ornament.TabLabel>People</Ornament.TabLabel>
			</Ornament.Tab>
			<Ornament.Tab
				onClick={() =>
					navigate({ to: '/app/environments', viewTransition: { types: ['zoom-out'] } })
				}
				isActive={!!isEnvironmentsRoute}
			>
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
			data-slot="ornament-outlet"
		>
			<Outlet />
		</motion.div>
	)
}
