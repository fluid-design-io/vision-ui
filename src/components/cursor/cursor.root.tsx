'use client'

import { cn } from '@/lib/cn'
import { useMotionValue, useSpring } from 'motion/react'
import * as React from 'react'

import {
	CURSOR_OPACITY_SPRING,
	CURSOR_POINTER_SPRING,
	CURSOR_SCALE_SPRING,
} from './cursor.constants'
import { CursorProvider, useOptionalCursorContext } from './cursor.context'
import { computeSnapFrame, resolveActiveTarget } from './cursor.engine'
import { createCursorStore } from './cursor.store'
import type { CursorPoint, CursorRootProps, CursorTargetFrame } from './cursor.types'

const CURSOR_DOT_SIZE = 16
const CURSOR_DOT_PRESSED_SIZE = 13.5
const CURSOR_RADIUS_FULL = 9999
const CURSOR_MORPH_OPACITY = 0
const CURSOR_MORPH_PRESSED_OPACITY = 0

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
	const cursorXValue = useMotionValue(0)
	const cursorYValue = useMotionValue(0)
	const cursorWidthValue = useMotionValue(CURSOR_DOT_SIZE)
	const cursorHeightValue = useMotionValue(CURSOR_DOT_SIZE)
	const cursorRadiusValue = useMotionValue(CURSOR_RADIUS_FULL)
	const cursorOpacityValue = useMotionValue(0)
	const pointerScaleValue = useMotionValue(0.8)
	const cursorX = useSpring(cursorXValue, CURSOR_POINTER_SPRING)
	const cursorY = useSpring(cursorYValue, CURSOR_POINTER_SPRING)
	const cursorWidth = useSpring(cursorWidthValue, CURSOR_POINTER_SPRING)
	const cursorHeight = useSpring(cursorHeightValue, CURSOR_POINTER_SPRING)
	const cursorRadius = useSpring(cursorRadiusValue, CURSOR_POINTER_SPRING)
	const cursorOpacity = useSpring(cursorOpacityValue, CURSOR_OPACITY_SPRING)
	const pointerScale = useSpring(pointerScaleValue, CURSOR_SCALE_SPRING)
	const latestPointerRef = React.useRef<CursorPoint>({ x: 0, y: 0 })
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

	const setFreeCursorGeometry = React.useCallback(
		(pointer: CursorPoint, pressed: boolean, visible: boolean) => {
			const size = pressed ? CURSOR_DOT_PRESSED_SIZE : CURSOR_DOT_SIZE
			cursorXValue.set(pointer.x - size / 2)
			cursorYValue.set(pointer.y - size / 2)
			cursorWidthValue.set(size)
			cursorHeightValue.set(size)
			cursorRadiusValue.set(CURSOR_RADIUS_FULL)
			cursorOpacityValue.set(visible ? 1 : 0)
			pointerScaleValue.set(1)
		},
		[
			cursorHeightValue,
			cursorOpacityValue,
			cursorRadiusValue,
			cursorWidthValue,
			cursorXValue,
			cursorYValue,
			pointerScaleValue,
		],
	)

	const setSnapCursorGeometry = React.useCallback(
		(frame: CursorTargetFrame, pressed: boolean) => {
			cursorXValue.set(frame.rect.left)
			cursorYValue.set(frame.rect.top)
			cursorWidthValue.set(frame.rect.width)
			cursorHeightValue.set(frame.rect.height)
			cursorRadiusValue.set(Number.parseFloat(frame.borderRadius) || 0)
			cursorOpacityValue.set(pressed ? CURSOR_MORPH_PRESSED_OPACITY : CURSOR_MORPH_OPACITY)
			pointerScaleValue.set(1)
		},
		[
			cursorHeightValue,
			cursorOpacityValue,
			cursorRadiusValue,
			cursorWidthValue,
			cursorXValue,
			cursorYValue,
			pointerScaleValue,
		],
	)

	const hideCursor = React.useCallback(() => {
		cursorOpacityValue.set(0)
		pointerScaleValue.set(0.8)
	}, [cursorOpacityValue, pointerScaleValue])

	React.useEffect(() => {
		store.setEnabled(isEnabled)
		if (isEnabled) return

		resetActiveTarget()
		store.setInside(false)
		store.setPressed(false)
		hideCursor()
	}, [hideCursor, isEnabled, resetActiveTarget, store])

	const applyPointerFrame = React.useCallback(
		(event: Pick<PointerEvent | React.PointerEvent<HTMLDivElement>, 'clientX' | 'clientY'>) => {
			const current = store.getSnapshot()
			if (!current.isEnabled) return

			const pointer = { x: event.clientX, y: event.clientY }
			latestPointerRef.current = pointer

			const target = resolveActiveTarget(pointer, store.getTargets())
			const previousTargetId = current.activeTargetId

			if (!target) {
				if (previousTargetId) {
					store.getTarget(previousTargetId)?.controller.resetParallax()
				}
				store.setActiveTarget(null)
				setFreeCursorGeometry(pointer, current.isPressed, true)
				return
			}

			const frame = computeSnapFrame({ pointer, target, pressed: current.isPressed })
			if (previousTargetId && previousTargetId !== target.id) {
				store.getTarget(previousTargetId)?.controller.resetParallax()
			}

			target.controller.setParallax(frame.parallax.x, frame.parallax.y)
			store.setActiveTarget(target.id)
			setSnapCursorGeometry(frame, current.isPressed)
		},
		[setFreeCursorGeometry, setSnapCursorGeometry, store],
	)

	const onDocumentRelease = React.useEffectEvent(() => {
		store.setPressed(false)
		const current = store.getSnapshot()
		if (!current.isInside) {
			hideCursor()
			return
		}

		if (current.activeTargetId) {
			const target = store.getTarget(current.activeTargetId)
			if (target) {
				setSnapCursorGeometry(
					computeSnapFrame({ pointer: latestPointerRef.current, target, pressed: false }),
					false,
				)
				return
			}
		}

		setFreeCursorGeometry(latestPointerRef.current, false, true)
	})

	const onWindowBlur = React.useEffectEvent(() => {
		store.setPressed(false)
		store.setInside(false)
		resetActiveTarget()
		hideCursor()
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

		if (
			pointerCountRef.current > 1 &&
			!hasWarnedMultiplePointersRef.current &&
			import.meta.env.DEV
		) {
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
			cursorX,
			cursorY,
			cursorWidth,
			cursorHeight,
			cursorRadius,
			cursorOpacity,
			pointerScale,
			registerPointer,
		}),
		[
			cursorHeight,
			cursorOpacity,
			cursorRadius,
			cursorWidth,
			cursorX,
			cursorY,
			pointerScale,
			registerPointer,
			store,
		],
	)

	const shouldHideNativeCursor =
		snapshot.isEnabled && snapshot.isInside && snapshot.pointerCount > 0

	return (
		<CursorProvider value={context}>
			<div
				{...props}
				data-cursor-root=""
				data-cursor-active={snapshot.isActive ? 'true' : undefined}
				data-cursor-snapped={snapshot.isSnapped ? 'true' : undefined}
				data-cursor-pressed={snapshot.isPressed ? 'true' : undefined}
				className={cn(shouldHideNativeCursor && 'cursor-none [&_*]:cursor-none', className)}
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
					hideCursor()
				}}
				onPointerDown={(event) => {
					onPointerDown?.(event)
					if (!store.getSnapshot().isEnabled) return
					store.setPressed(true)
					const current = store.getSnapshot()
					if (current.activeTargetId) {
						const target = store.getTarget(current.activeTargetId)
						if (target) {
							setSnapCursorGeometry(
								computeSnapFrame({ pointer: latestPointerRef.current, target, pressed: true }),
								true,
							)
						}
						return
					}
					setFreeCursorGeometry(latestPointerRef.current, true, current.isInside)
				}}
			>
				{children}
			</div>
		</CursorProvider>
	)
}
