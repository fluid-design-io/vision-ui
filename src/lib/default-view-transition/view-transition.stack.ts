import type { ViewTransitionResolver } from './view-transition.types'
import { getStackDirection, isAppPath } from './view-transition.utils'

export function isSettingsPath(pathname?: string) {
	return pathname?.startsWith('/settings')
}

/**
 * Stack transitions
 *
 * Nested stack routes scales in/out based on the direction of the transition.
 */
const stackViewTransition: ViewTransitionResolver<
	['stack'] | ['stack', 'stack-in'] | ['stack', 'stack-out']
> = ({ fromPath, toPath }) => {
	if (isAppPath(fromPath) && isAppPath(toPath)) {
		if (isSettingsPath(fromPath) && isSettingsPath(toPath)) {
			const direction = getStackDirection(fromPath, toPath)
			console.log('stack-transition', direction)
			if (direction) {
				return ['stack', direction]
			}
		}
		return ['stack']
	}
}

export default stackViewTransition
