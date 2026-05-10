import PeopleScreen from '@/screens/app/people/people.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/people')({
	component: RouteComponent,
})

function RouteComponent() {
	return <PeopleScreen />
}
