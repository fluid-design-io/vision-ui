import { EXTERNAL_PATHS } from './view-transition.constants'
import type { ViewTransitionProps } from './view-transition.types'

// also checks subpaths
export function isExternalPath(pathname?: string) {
	if (!pathname) return false
	const externalPaths = Array.from(EXTERNAL_PATHS)
	return externalPaths.some((path) => pathname.startsWith(path))
}

/**
 * External links need no transition
 */
const isExternalViewTransition = ({ fromPath, toPath }: ViewTransitionProps): boolean => {
	return !!(isExternalPath(fromPath) && isExternalPath(toPath))
}

export default isExternalViewTransition
