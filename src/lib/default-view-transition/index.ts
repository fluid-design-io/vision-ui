import isExternalViewTransition from './view-transition.external'
import homeViewTransition from './view-transition.home'
import ornamentViewTransition from './view-transition.ornament'
import stackViewTransition from './view-transition.stack'
import { DefaultViewTransitionOptions } from './view-transition.types'

const defaultViewTransition = {
	types: ({ fromLocation, toLocation }) => {
		const options = {
			fromPath: fromLocation?.pathname,
			toPath: toLocation.pathname,
		}
		if (isExternalViewTransition(options)) {
			console.log('external view transition')
			return false
		}

		return (
			ornamentViewTransition(options) ??
			homeViewTransition(options) ??
			stackViewTransition(options) ??
			[] // enable browser default transition
		)
	},
} satisfies DefaultViewTransitionOptions

export default defaultViewTransition
