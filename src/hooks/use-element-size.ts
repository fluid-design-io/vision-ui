import { useCallback, useRef, useSyncExternalStore } from 'react'
import type { RefObject } from 'react'

export type Size = { width: number; height: number }

const ZERO_SIZE: Size = { width: 0, height: 0 }

function measure(element: HTMLElement | null | undefined): Size {
	if (element) {
		return { width: element.clientWidth, height: element.clientHeight }
	}
	if (typeof window === 'undefined') {
		return ZERO_SIZE
	}
	return { width: window.innerWidth, height: window.innerHeight }
}

function getServerSnapshot(): Size {
	return ZERO_SIZE
}

/**
 * Subscribes to the size of the element referenced by `ref`, or to the window
 * when no ref (or a currently-null ref) is provided.
 *
 * Elements are observed with a `ResizeObserver`, so the size tracks layout
 * changes as well as window resizes; the window is observed via its `resize`
 * event. Built on `useSyncExternalStore`, so it is concurrent-safe and returns
 * a referentially stable snapshot while the size is unchanged.
 */
export function useElementSize<T extends HTMLElement = HTMLElement>(
	ref?: RefObject<T | null>,
): Size {
	// Per-instance cache so an unchanged size returns a stable reference, which
	// useSyncExternalStore requires to avoid an infinite re-render loop.
	const cache = useRef<Size>(ZERO_SIZE)

	const subscribe = useCallback(
		(onStoreChange: () => void) => {
			const element = ref?.current
			if (element) {
				const observer = new ResizeObserver(onStoreChange)
				observer.observe(element)
				return () => observer.disconnect()
			}
			window.addEventListener('resize', onStoreChange)
			return () => window.removeEventListener('resize', onStoreChange)
		},
		[ref],
	)

	const getSnapshot = useCallback((): Size => {
		const next = measure(ref?.current)
		const prev = cache.current
		if (prev.width === next.width && prev.height === next.height) {
			return prev
		}
		cache.current = next
		return next
	}, [ref])

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Tracks the window's inner size. Shorthand for `useElementSize()`. */
export function useWindowSize(): Size {
	return useElementSize()
}
