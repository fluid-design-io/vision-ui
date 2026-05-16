import { NotFound } from '@/components/not-found'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const ornamentPaths = new Set(['/', '/people', '/environments'])

function isAppPath(pathname: string) {
	return (
		pathname.startsWith('/') &&
		!ornamentPaths.has(pathname) &&
		!pathname.startsWith('/api') &&
		!pathname.startsWith('/docs') &&
		!pathname.startsWith('/llms')
	)
}

export function getRouter() {
	return createTanStackRouter({
		routeTree,
		defaultPreload: 'intent',
		defaultViewTransition: {
			types: ({ fromLocation, toLocation }) => {
				const fromPath = fromLocation?.pathname
				const toPath = toLocation.pathname

				// Home app launches need their own transition type so CSS can opt home cells into
				// browser view-transition snapshots. Keep this route-shape based so new app routes
				// automatically get the same launch/back animation without adding per-route cases.
				if (
					(fromPath === '/' && isAppPath(toPath)) ||
					(fromPath && isAppPath(fromPath) && toPath === '/')
				) {
					return ['home-app-launch']
				}

				return ['route']
			},
		},
		scrollRestoration: true,
		defaultNotFoundComponent: NotFound,
	})
}
