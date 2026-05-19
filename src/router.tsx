import { NotFound } from '@/components/not-found'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import defaultViewTransition from './lib/default-view-transition'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	return createTanStackRouter({
		routeTree,
		defaultPreload: 'intent',
		defaultViewTransition,
		scrollRestoration: true,
		defaultNotFoundComponent: NotFound,
	})
}
