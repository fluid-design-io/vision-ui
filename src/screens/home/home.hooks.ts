import { useMatchRoute } from '@tanstack/react-router'

export function useMatchHomeRoute() {
	'use no memo'
	const matchRoute = useMatchRoute()

	const isRootRoute = matchRoute({ to: '/' })
	const isPeopleRoute = matchRoute({ to: '/people' })
	const isEnvironmentsRoute = matchRoute({ to: '/environments' })

	return {
		isHomeRoute: isRootRoute || isPeopleRoute || isEnvironmentsRoute,
		isRootRoute,
		isPeopleRoute,
		isEnvironmentsRoute,
		matchRoute,
	}
}
