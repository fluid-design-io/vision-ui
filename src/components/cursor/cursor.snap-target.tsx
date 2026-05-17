'use client'

import { useRender } from '@base-ui/react/use-render'
import { motion, useTransform } from 'motion/react'
import * as React from 'react'

import { useCursorSnapContext } from './cursor.context'
import type { CursorSnapTargetProps, CursorSnapTargetState } from './cursor.types'

function useCursorSnapTargetRender(render: CursorSnapTargetProps['render']) {
	const renderType = React.isValidElement(render) ? render.type : null

	const MotionComponent = React.useMemo(() => {
		if (!renderType) return motion.div
		return motion.create(renderType as React.ComponentType)
	}, [renderType])

	if (typeof render === 'function') return render

	if (React.isValidElement(render)) {
		const props = render.props as Record<string, unknown>
		const Component = MotionComponent as React.ComponentType<Record<string, unknown>>
		return <Component {...props} />
	}

	const Component = MotionComponent as React.ComponentType<Record<string, unknown>>
	return <Component />
}

export function CursorSnapTarget({
	factor = 1,
	isDisabled = false,
	render,
	style,
	children,
	...props
}: CursorSnapTargetProps) {
	const snap = useCursorSnapContext('Cursor.SnapTarget')
	const safeFactor = Number.isFinite(factor) ? factor : 1
	const isTargetDisabled = isDisabled || snap.isDisabled
	const x = useTransform(snap.x, (value) => (isTargetDisabled ? 0 : value * safeFactor))
	const y = useTransform(snap.y, (value) => (isTargetDisabled ? 0 : value * safeFactor))
	const state: CursorSnapTargetState = {
		disabled: isTargetDisabled,
	}
	const motionRender = useCursorSnapTargetRender(render)
	const mergedStyle = style as React.CSSProperties | undefined

	return useRender<CursorSnapTargetState, HTMLElement>({
		defaultTagName: 'div',
		render: motionRender,
		state,
		props: {
			...props,
			children: children as React.ReactNode,
			style: {
				...mergedStyle,
				x,
				y,
			},
			'data-cursor-snap-target': '',
			'data-cursor-disabled': isTargetDisabled ? 'true' : undefined,
		},
	})
}
