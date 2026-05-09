import Environment from '@/components/environment'
import GridListScreen from '@/screens/app/home/home.layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Environment>
			<Outlet />
			<GridListScreen />
		</Environment>
	)
}
