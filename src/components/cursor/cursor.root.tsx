'use client'

import { cn } from '@/lib/cn'
import * as React from 'react'
import { useMotionValue, useSpring } from 'motion/react'

import {
	CURSOR_OPACITY_SPRING,
	CURSOR_POINTER_SPRING,
	CURSOR_SCALE_SPRING,
} from './cursor.constants'
import { CursorProvider, useOptionalCursorContext } from './cursor.context'
import { computeSnapFrame, resolveActiveTarget } from './cursor.engine'
import { createCursorStore } from './cursor.store'
import type { CursorRootProps } from './cursor.types'

function useMediaQuery(query: string) {
	const [matches, setMatches] = React.useState(false)

	React.useEffect(() => {
		if (typeof window === 'undefined') return

		const media = window.matchMedia(query)
		setMatches(media.matches)

		const onChange = () => setMatches(media.matches)
		media.addEventListener('change', onChange)

		return () => {
			media.removeEventListener('change', onChange)
		}
	}, [query])

	return matches
}

export function CursorRoot({
	isDisabled = false,
	className,
	children,
	onPointerEnter,
	onPointerMove,
	onPointerLeave,
	onPointerDown,
	...props
}: CursorRootProps) {
	const parentCursor = useOptionalCursorContext()
	const store = React.useMemo(() => createCursorStore(), [])
	const pointerXValue = useMotionValue(0)
	const pointerYValue = useMotionValue(0)
	const pointerOpacityValue = useMotionValue(0)
	const pointerScaleValue = useMotionValue(0.8)
	const pointerX = useSpring(pointerXValue, CURSOR_POINTER_SPRING)
	const pointerY = useSpring(pointerYValue, CURSOR_POINTER_SPRING)
	const pointerOpacity = useSpring(pointerOpacityValue, CURSOR_OPACITY_SPRING)
	const pointerScale = useSpring(pointerScaleValue, CURSOR_SCALE_SPRING)
	const pointerCountRef = React.useRef(0)
	const hasWarnedNestedRef = React.useRef(false)
	const hasWarnedMultiplePointersRef = React.useRef(false)
	const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
	const coarsePointer = useMediaQuery('(pointer: coarse)')
	const isEnabled = !isDisabled && !prefersReducedMotion && !coarsePointer
	const snapshot = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)

	React.useEffect(() => {
		if (!parentCursor || hasWarnedNestedRef.current || !import.meta.env.DEV) return
		hasWarnedNestedRef.current = true
		console.warn('<Cursor> does not support nested providers in v1.')
	}, [parentCursor])

	const resetActiveTarget = React.useCallback(() => {
		const activeTargetId = store.getSnapshot().activeTargetId
		if (activeTargetId) {
			store.getTarget(activeTargetId)?.controller.resetParallax()
		}
		store.setActiveTarget(null)
	}, [store])

	const setPointerVisual = React.useCallback(
		({
			visible,
			snapped,
			pressed,
		}: {
			visible: boolean
			snapped: boolean
			pressed: boolean
		}) => {
			pointerOpacityValue.set(visible && !snapped ? 1 : 0)
			pointerScaleValue.set(visible ? (pressed ? 0.86 : 1) : 0.8)
		},
		[pointerOpacityValue, pointerScaleValue],
	)

	React.useEffect(() => {
		store.setEnabled(isEnabled)
		if (isEnabled) return

		resetActiveTarget()
		store.setInside(false)
		store.setPressed(false)
		setPointerVisual({ visible: false, snapped: false, pressed: false })
	}, [isEnabled, resetActiveTarget, setPointerVisual, store])

	const applyPointerFrame = React.useCallback(
		(event: Pick<PointerEvent | React.PointerEvent<HTMLDivElement>, 'clientX' | 'clientY'>) => {
			const current = store.getSnapshot()
			if (!current.isEnabled) return

			const pointer = { x: event.clientX, y: event.clientY }
			pointerXValue.set(pointer.x)
			pointerYValue.set(pointer.y)

			const target = resolveActiveTarget(pointer, store.getTargets())
			const previousTargetId = current.activeTargetId

			if (!target) {
				if (previousTargetId) {
					store.getTarget(previousTargetId)?.controller.resetParallax()
				}
				store.setActiveTarget(null)
				setPointerVisual({ visible: true, snapped: false, pressed: current.isPressed })
				return
			}

			const frame = computeSnapFrame({ pointer, target, pressed: current.isPressed })
			if (previousTargetId && previousTargetId !== target.id) {
				store.getTarget(previousTargetId)?.controller.resetParallax()
			}

			target.controller.setParallax(frame.parallax.x, frame.parallax.y)
			store.setActiveTarget(target.id)
			setPointerVisual({ visible: true, snapped: true, pressed: current.isPressed })
		},
		[pointerXValue, pointerYValue, setPointerVisual, store],
	)

	const onDocumentRelease = React.useEffectEvent(() => {
		store.setPressed(false)
		setPointerVisual({
			visible: store.getSnapshot().isInside,
			snapped: store.getSnapshot().isSnapped,
			pressed: false,
		})
	})

	const onWindowBlur = React.useEffectEvent(() => {
		store.setPressed(false)
		store.setInside(false)
		resetActiveTarget()
		setPointerVisual({ visible: false, snapped: false, pressed: false })
	})

	React.useEffect(() => {
		if (!snapshot.isActive) return

		document.addEventListener('pointerup', onDocumentRelease)
		document.addEventListener('pointercancel', onDocumentRelease)
		window.addEventListener('blur', onWindowBlur)

		return () => {
			document.removeEventListener('pointerup', onDocumentRelease)
			document.removeEventListener('pointercancel', onDocumentRelease)
			window.removeEventListener('blur', onWindowBlur)
		}
	}, [onDocumentRelease, onWindowBlur, snapshot.isActive])

	const registerPointer = React.useCallback(() => {
		pointerCountRef.current += 1
		store.setPointerCount(pointerCountRef.current)

		if (pointerCountRef.current > 1 && !hasWarnedMultiplePointersRef.current && import.meta.env.DEV) {
			hasWarnedMultiplePointersRef.current = true
			console.warn('Multiple <Cursor.Pointer> instances are mounted. This is allowed but unusual.')
		}

		return () => {
			pointerCountRef.current = Math.max(0, pointerCountRef.current - 1)
			store.setPointerCount(pointerCountRef.current)
		}
	}, [store])

	const context = React.useMemo(
		() => ({
			store,
			pointerX,
			pointerY,
			pointerOpacity,
			pointerScale,
			registerPointer,
		}),
		[pointerOpacity, pointerScale, pointerX, pointerY, registerPointer, store],
	)

	const shouldHideNativeCursor = snapshot.isEnabled && snapshot.isInside && snapshot.pointerCount > 0

	return (
		<CursorProvider value={context}>
			<div
				{...props}
				data-cursor-root=""
				data-cursor-active={snapshot.isActive ? 'true' : undefined}
				data-cursor-snapped={snapshot.isSnapped ? 'true' : undefined}
				data-cursor-pressed={snapshot.isPressed ? 'true' : undefined}
				className={cn(shouldHideNativeCursor && 'cursor-none *:cursor-none', className)}
				onPointerEnter={(event) => {
					onPointerEnter?.(event)
					if (!store.getSnapshot().isEnabled) return
					store.setInside(true)
				}}
				onPointerMove={(event) => {
					onPointerMove?.(event)
					if (!store.getSnapshot().isEnabled) return
					store.setInside(true)
					applyPointerFrame(event)
				}}
				onPointerLeave={(event) => {
					onPointerLeave?.(event)
					store.setInside(false)
					resetActiveTarget()
					setPointerVisual({ visible: false, snapped: false, pressed: false })
				}}
				onPointerDown={(event) => {
					onPointerDown?.(event)
					if (!store.getSnapshot().isEnabled) return
					store.setPressed(true)
					setPointerVisual({
						visible: store.getSnapshot().isInside,
						snapped: store.getSnapshot().isSnapped,
						pressed: true,
					})
				}}
			>
				{children}
			</div>
		</CursorProvider>
	)
}
