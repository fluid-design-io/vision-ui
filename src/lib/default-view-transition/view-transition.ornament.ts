import type { ViewTransitionResolver } from './view-transition.types'
import { isOrnamentPath } from './view-transition.utils'
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
