'use client'

import { cn } from '@/lib/cn'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { useMotionValue, useMotionValueEvent, useSpring } from 'motion/react'
import * as React from 'react'

import { CURSOR_PARALLAX_SPRING } from './cursor.constants'
import { CursorSnapProvider, useCursorContext } from './cursor.context'
import { useCursorSnapshot } from './cursor.hooks'
import type { CursorSnapProps, CursorSnapState } from './cursor.types'

let cursorTargetSeq = 0

function nextCursorTargetSeq() {
	cursorTargetSeq += 1
	return cursorTargetSeq
}

export function CursorSnap({
	id,
	strength = 1,
	isDisabled = false,
	render,
	className,
	style,
	children,
	...props
}: CursorSnapProps) {
	const generatedId = React.useId()
	const targetId = id ?? generatedId
	const { store } = useCursorContext('Cursor.Snap')
	const snapshot = useCursorSnapshot()
	const rawX = useMotionValue(0)
	const rawY = useMotionValue(0)
	const x = useSpring(rawX, CURSOR_PARALLAX_SPRING)
	const y = useSpring(rawY, CURSOR_PARALLAX_SPRING)
	const elementRef = React.useRef<HTMLElement | null>(null)
	const seqRef = React.useRef(nextCursorTargetSeq())
	const strengthRef = React.useRef(strength)
	const isDisabledRef = React.useRef(isDisabled)

	strengthRef.current = strength
	isDisabledRef.current = isDisabled

	const setCssVar = React.useCallback((name: string, value: number) => {
		elementRef.current?.style.setProperty(name, `${value}px`)
	}, [])

	useMotionValueEvent(x, 'change', (value) => setCssVar('--cursor-parallax-x', value))
	useMotionValueEvent(y, 'change', (value) => setCssVar('--cursor-parallax-y', value))

	const controller = React.useMemo(
		() => ({
			setParallax(nextX: number, nextY: number) {
				rawX.set(nextX)
				rawY.set(nextY)
			},
			resetParallax() {
				rawX.set(0)
				rawY.set(0)
			},
		}),
		[rawX, rawY],
	)

	const registerNode = React.useCallback(
		(node: HTMLElement | null) => {
			if (elementRef.current === node) return

			if (elementRef.current) {
				store.unregisterTarget(targetId)
			}

			elementRef.current = node

			if (!node) return

			node.style.setProperty('--cursor-parallax-x', `${x.get()}px`)
			node.style.setProperty('--cursor-parallax-y', `${y.get()}px`)
			store.registerTarget({
				id: targetId,
				seq: seqRef.current,
				element: node,
				strength: Number.isFinite(strengthRef.current) ? strengthRef.current : 1,
				isDisabled: isDisabledRef.current,
				controller,
			})
		},
		[controller, store, targetId, x, y],
	)

	React.useLayoutEffect(() => {
		store.updateTarget(targetId, {
			strength: Number.isFinite(strength) ? strength : 1,
			isDisabled,
			controller,
		})

		if (isDisabled) {
			controller.resetParallax()
		}
	}, [controller, isDisabled, store, strength, targetId])

	React.useEffect(() => {
		return () => {
			store.unregisterTarget(targetId)
		}
	}, [store, targetId])

	const isActive = snapshot.activeTargetId === targetId && snapshot.isActive
	const state: CursorSnapState = {
		active: isActive,
		disabled: isDisabled,
	}

	const rendered = useRender<CursorSnapState, HTMLElement>({
		defaultTagName: 'div',
		render,
		ref: registerNode,
		state,
		props: {
			...mergeProps<'div'>(
				{
					className: cn('inline-flex', className),
					style,
					children,
				},
				props,
			),
			'data-cursor-snap': '',
			'data-cursor-id': targetId,
			'data-cursor-active': isActive ? 'true' : undefined,
			'data-cursor-disabled': isDisabled ? 'true' : undefined,
		},
	})

	return (
		<CursorSnapProvider value={{ id: targetId, x, y, isDisabled }}>{rendered}</CursorSnapProvider>
	)
}
