import { ORNAMENT_PATHS } from './view-transition.constants'
import type { ViewTransitionResolver } from './view-transition.types'

export function isOrnamentPath(pathname?: string) {
	return pathname && ORNAMENT_PATHS.has(pathname)
}

/**
 * Ornament tabs switch
 */
const ornamentViewTransition: ViewTransitionResolver<['ornament-tab-switch']> = ({
	fromPath,
	toPath,
}) => {
	if (isOrnamentPath(fromPath) && isOrnamentPath(toPath)) {
		console.log('ornament-tab-switch')
		return ['ornament-tab-switch']
	}
}

export default ornamentViewTransition
