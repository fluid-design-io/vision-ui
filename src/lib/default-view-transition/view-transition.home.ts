import type { ViewTransitionResolver } from './view-transition.types'
import { isAppPath } from './view-transition.utils'

/**
 * Home app launches need their own transition type so CSS can opt home cells into
 * browser view-transition snapshots. Keep this route-shape based so new app routes
 * automatically get the same launch/back animation without adding per-route cases.
 */
const homeViewTransition: ViewTransitionResolver<['home-app-launch']> = ({ fromPath, toPath }) => {
	if (
		(fromPath === '/' && isAppPath(toPath)) ||
		(fromPath && isAppPath(fromPath) && toPath === '/')
	) {
		console.log('home-app-launch')
		return ['home-app-launch']
	}
}

export default homeViewTransition
