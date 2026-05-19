import homeViewTransition from './view-transition.home'
import ornamentViewTransition from './view-transition.ornament'
import { DefaultViewTransitionOptions } from './view-transition.types'

const defaultViewTransition = {
	types: ({ fromLocation, toLocation }) => {
		const options = {
			fromPath: fromLocation?.pathname,
			toPath: toLocation.pathname,
		}

		return (
			ornamentViewTransition(options) ??
			homeViewTransition(options) ??
			[] // enable browser default transition
		)
	},
} satisfies DefaultViewTransitionOptions

export default defaultViewTransition
