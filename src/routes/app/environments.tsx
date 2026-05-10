import EnvironmentsScreen from '@/screens/app/environments/environments.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/environments')({
	component: RouteComponent,
})

function RouteComponent() {
	return <EnvironmentsScreen />
}
