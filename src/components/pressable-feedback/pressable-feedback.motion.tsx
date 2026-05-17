'use client'

import type { UseRenderRenderProp } from '@base-ui/react/use-render'
import { motion } from 'motion/react'
import * as React from 'react'

import type { PressableFeedbackScaleState } from './pressable-feedback.types'

export function usePressableFeedbackMotionRender(
	render?: UseRenderRenderProp<PressableFeedbackScaleState>,
) {
	const renderType = React.isValidElement(render) ? render.type : null

	const MotionComponent = React.useMemo(() => {
		if (!renderType) return motion.div
		return motion.create(renderType as React.ComponentType)
	}, [renderType])

	if (typeof render === 'function') {
		return render
	}

	if (React.isValidElement(render)) {
		const props = render.props as Record<string, unknown>
		const Component = MotionComponent as React.ComponentType<Record<string, unknown>>
		return <Component {...props} />
	}

	const Component = MotionComponent as React.ComponentType<Record<string, unknown>>
	return <Component />
}
