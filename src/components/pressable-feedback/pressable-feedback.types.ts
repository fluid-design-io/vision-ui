import type { UseRenderRenderProp } from '@base-ui/react/use-render'
import { Transition } from 'motion/react'
import * as React from 'react'

export interface PressableFeedbackScaleAnimation {
	ignoreScaleCoefficient?: boolean
	timingConfig?: Transition
	value?: number
}

export interface PressableFeedbackAnimation {
	scale?: PressableFeedbackScaleAnimation
	transition?: Transition
}

export interface PressableFeedbackRootProps extends React.HTMLAttributes<HTMLElement> {
	animation?: boolean | PressableFeedbackAnimation
	disabled?: boolean
	render?: UseRenderRenderProp<PressableFeedbackScaleState>
	/**
	 * @deprecated Use `animation.scale.value` instead.
	 */
	scale?: number
	xOffset?: number
	yOffset?: number
	children: React.ReactNode
}

export interface PressableFeedbackScaleProps extends React.HTMLAttributes<HTMLElement> {
	animation?: PressableFeedbackAnimation
	render?: UseRenderRenderProp<PressableFeedbackScaleState>
	/**
	 * @deprecated Use `animation.scale.value` instead.
	 */
	scale?: number
}

export interface PressableFeedbackScaleState extends Record<string, unknown> {
	active: boolean
	pressed: boolean
	disabled: boolean
}

export interface PressableFeedbackHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {}
