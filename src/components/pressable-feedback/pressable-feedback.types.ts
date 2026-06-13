import type { UseRenderRenderProp } from '@base-ui/react/use-render'
import { Transition } from 'motion/react'
import * as React from 'react'

export interface PressableFeedbackScaleAnimation {
	timingConfig?: Transition
	value?: number
}

export interface PressableFeedbackAnimation {
	scale?: PressableFeedbackScaleAnimation
	transition?: Transition
}

export interface PressableFeedbackRootOwnProps {
	/**
	 * Built-in Motion scale feedback. `true` uses defaults, `false` disables root scale only, or pass an object to customize.
	 * @default true
	 */
	animation?: boolean | PressableFeedbackAnimation
	/** When true, pointer handlers and feedback are ignored. */
	disabled?: boolean
	/** Custom element or Base UI render function for the interactive target. */
	render?: UseRenderRenderProp<PressableFeedbackScaleState>
	/**
	 * Horizontal highlight offset multiplier in pixels.
	 * @default 48
	 */
	xOffset?: number
	/**
	 * Vertical highlight offset multiplier in pixels.
	 * @default 6
	 */
	yOffset?: number
}

export interface PressableFeedbackRootProps
	extends React.HTMLAttributes<HTMLElement>, PressableFeedbackRootOwnProps {}

export interface PressableFeedbackScaleOwnProps {
	/** Motion scale animation for this nested target. */
	animation?: PressableFeedbackAnimation
	/** Custom element or Base UI render function for the scale target. */
	render?: UseRenderRenderProp<PressableFeedbackScaleState>
}

export interface PressableFeedbackScaleProps
	extends React.HTMLAttributes<HTMLElement>, PressableFeedbackScaleOwnProps {}

export interface PressableFeedbackScaleState extends Record<string, unknown> {
	active: boolean
	pressed: boolean
	disabled: boolean
}

export interface PressableFeedbackHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {}
