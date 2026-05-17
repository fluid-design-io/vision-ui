'use client'

import { cn } from '@/lib/cn'
import { motion, type HTMLMotionProps } from 'motion/react'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { useCursorContext } from './cursor.context'
import { useCursorSnapshot } from './cursor.hooks'
import type { CursorPointerProps, CursorPointerRenderState } from './cursor.types'

function useIsMounted() {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	return isMounted
}

export function CursorPointer({
	isDisabled = false,
	render,
	className,
	style,
	children,
	...props
}: CursorPointerProps) {
	const context = useCursorContext('Cursor.Pointer')
	const snapshot = useCursorSnapshot()
	const isMounted = useIsMounted()

	React.useEffect(() => {
		if (isDisabled) return
		return context.registerPointer()
	}, [context, isDisabled])

	if (!isMounted || isDisabled || typeof document === 'undefined') return null

	const state: CursorPointerRenderState = {
		...snapshot,
		x: context.pointerX,
		y: context.pointerY,
		opacity: context.pointerOpacity,
		scale: context.pointerScale,
	}

	const internalStyle = {
		...style,
		x: context.pointerX,
		y: context.pointerY,
		opacity: context.pointerOpacity,
		scale: context.pointerScale,
		translate: '-50% -50%',
	} as CursorPointerProps['style']

	const internalProps = {
		...props,
		'aria-hidden': true,
		'data-cursor-pointer': '',
		'data-cursor-active': snapshot.isActive ? 'true' : undefined,
		'data-cursor-snapped': snapshot.isSnapped ? 'true' : undefined,
		'data-cursor-pressed': snapshot.isPressed ? 'true' : undefined,
		className: cn(
			'fixed left-0 top-0 size-4 rounded-full pointer-events-none',
			'bg-neutral-300/70 shadow-[0_1px_3px_rgba(0,0,0,0.24),inset_0_0_0_0.5px_rgba(255,255,255,0.28)]',
			'z-[var(--cursor-z-index,1000)]',
			className,
		),
		style: internalStyle,
		children,
	} as HTMLMotionProps<'div'> & Record<string, unknown>

	if (typeof render === 'function') {
		return createPortal(render(internalProps, state), document.body)
	}

	const element = React.isValidElement(render) ? (
		React.cloneElement(render, {
			...internalProps,
			...(render.props as Record<string, unknown>),
			className: cn(internalProps.className, (render.props as { className?: string }).className),
			style: {
				...((render.props as { style?: React.CSSProperties }).style ?? {}),
				...internalStyle,
			},
		} as Record<string, unknown>)
	) : (
		<motion.div {...internalProps} />
	)

	return createPortal(element, document.body)
}
