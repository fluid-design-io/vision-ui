import PeopleScreen from '@/screens/people/people.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(ornament)/people')({
	component: RouteComponent,
})

function RouteComponent() {
	return <PeopleScreen />
}
