import EnvironmentsScreen from '@/screens/environments/environments.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(ornament)/environments')({
	component: RouteComponent,
})

function RouteComponent() {
	return <EnvironmentsScreen />
}
