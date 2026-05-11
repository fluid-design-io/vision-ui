import GridListScreen from '@/screens/home/home.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(ornament)/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <GridListScreen />
}
