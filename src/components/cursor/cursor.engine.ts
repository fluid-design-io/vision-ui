import { CURSOR_PARALLAX_MAX_X, CURSOR_PARALLAX_MAX_Y } from './cursor.constants'
import type {
	CursorParallax,
	CursorPoint,
	CursorTargetFrame,
	CursorTargetRegistration,
} from './cursor.types'

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

function getDomDepth(element: HTMLElement) {
	let depth = 0
	let current: HTMLElement | null = element
	while (current) {
		depth += 1
		current = current.parentElement
	}
	return depth
}

function isTargetEligible(target: CursorTargetRegistration, rect: DOMRect) {
	if (target.isDisabled) return false
	if (rect.width <= 0 || rect.height <= 0) return false

	const styles = window.getComputedStyle(target.element)
	return styles.visibility !== 'hidden'
}

function isInsideRect(pointer: CursorPoint, rect: DOMRect) {
	return (
		pointer.x >= rect.left &&
		pointer.x <= rect.right &&
		pointer.y >= rect.top &&
		pointer.y <= rect.bottom
	)
}

function getNumericBorderRadius(element: Element) {
	const radius = Number.parseFloat(window.getComputedStyle(element).borderRadius)
	return Number.isFinite(radius) ? radius : 0
}

function resolveBorderRadius(element: HTMLElement) {
	const radius = getNumericBorderRadius(element)
	if (radius > 0) return `${radius}px`

	// Cursor.Snap often registers a composition wrapper while the visual control
	// lives one level deeper. Use the first rounded descendant as a geometry hint.
	for (const descendant of element.querySelectorAll('*')) {
		const descendantRadius = getNumericBorderRadius(descendant)
		if (descendantRadius > 0) return `${descendantRadius}px`
	}

	return '0px'
}

function computeParallax(
	pointer: CursorPoint,
	rect: DOMRect,
	strength: number,
): CursorParallax {
	const normalizedX = rect.width === 0 ? 0 : ((pointer.x - rect.left) / rect.width - 0.5) * 2
	const normalizedY = rect.height === 0 ? 0 : ((pointer.y - rect.top) / rect.height - 0.5) * 2
	const safeStrength = Number.isFinite(strength) ? strength : 1
	const maxX = CURSOR_PARALLAX_MAX_X * safeStrength
	const maxY = CURSOR_PARALLAX_MAX_Y * safeStrength

	return {
		x: clamp(normalizedX * maxX, -Math.abs(maxX), Math.abs(maxX)),
		y: clamp(normalizedY * maxY, -Math.abs(maxY), Math.abs(maxY)),
	}
}

export function resolveActiveTarget(
	pointer: CursorPoint,
	targets: Iterable<CursorTargetRegistration>,
): CursorTargetRegistration | null {
	let best:
		| {
				target: CursorTargetRegistration
				depth: number
				area: number
		  }
		| null = null

	for (const target of targets) {
		const rect = target.element.getBoundingClientRect()
		if (!isTargetEligible(target, rect) || !isInsideRect(pointer, rect)) continue

		const depth = getDomDepth(target.element)
		const area = rect.width * rect.height
		if (
			!best ||
			depth > best.depth ||
			(depth === best.depth && area < best.area) ||
			(depth === best.depth && area === best.area && target.seq > best.target.seq)
		) {
			best = { target, depth, area }
		}
	}

	return best?.target ?? null
}

export function computeSnapFrame({
	pointer,
	target,
	pressed,
}: {
	pointer: CursorPoint
	target: CursorTargetRegistration
	pressed: boolean
}): CursorTargetFrame {
	const rect = target.element.getBoundingClientRect()

	return {
		id: target.id,
		rect,
		borderRadius: resolveBorderRadius(target.element),
		parallax: computeParallax(pointer, rect, target.strength),
		pressed,
	}
}
