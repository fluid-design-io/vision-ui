import { EXTERNAL_PATHS, ORNAMENT_PATHS } from './view-transition.constants'

export function isOrnamentPath(pathname?: string) {
	return pathname && ORNAMENT_PATHS.has(pathname)
}

export function isAppPath(pathname?: string) {
	if (!pathname) return false
	return pathname.startsWith('/') && !ORNAMENT_PATHS.has(pathname) && !EXTERNAL_PATHS.has(pathname)
}

/**
 * Based on segment count, determine the direction of the stack transition
 */
export function getStackDirection(fromPath?: string, toPath?: string) {
	const fromSegments = fromPath?.split('/').length ?? 0
	const toSegments = toPath?.split('/').length ?? 0

	if (fromSegments > toSegments) return 'stack-out'
	if (fromSegments < toSegments) return 'stack-in'
	return undefined
}
