'use client'

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import { cn } from '@/lib/cn'

import {
	getPressableFeedbackScale,
	getPressableFeedbackTransition,
} from './pressable-feedback.animation'
import { usePressableFeedbackContext } from './pressable-feedback.context'
import { usePressableFeedbackMotionRender } from './pressable-feedback.motion'
import type {
	PressableFeedbackScaleProps,
	PressableFeedbackScaleState,
} from './pressable-feedback.types'

export function PressableFeedbackScale({
	animation,
	render,
	scale = 0.985,
	className,
	style,
	children,
	...props
}: PressableFeedbackScaleProps) {
	const context = usePressableFeedbackContext('PressableFeedback.Scale')
	const state: PressableFeedbackScaleState = {
		active: context.isActive,
		pressed: context.isPressed,
		disabled: context.disabled,
	}

	const motionRender = usePressableFeedbackMotionRender(render)

	return useRender<PressableFeedbackScaleState, HTMLElement>({
		defaultTagName: 'div',
		render: motionRender,
		ref: context.setTarget,
		state,
		props: {
			...mergeProps<'div'>(
				{
					className: cn(
						'relative overflow-hidden [--pressable-feedback-x:0px] [--pressable-feedback-y:0px]',
						className,
					),
					style,
					onPointerEnter(event) {
						if (context.disabled) return
						context.updatePosition(event)
						context.setIsActive(true)
					},
					onPointerMove(event) {
						if (context.disabled) return
						context.updatePosition(event)
						context.setIsActive(true)
					},
					onPointerLeave() {
						if (context.disabled) return
						context.setIsActive(false)
						context.setIsPressed(false)
					},
					onPointerDown(event) {
						if (context.disabled) return
						context.updatePosition(event)
						context.setIsPressed(true)
					},
					onPointerUp() {
						if (context.disabled) return
						context.setIsPressed(false)
					},
					onPointerCancel() {
						if (context.disabled) return
						context.setIsPressed(false)
					},
					onMouseEnter(event) {
						if (context.disabled) return
						context.updatePosition(event)
						context.setIsActive(true)
					},
					onMouseMove(event) {
						if (context.disabled) return
						context.updatePosition(event)
						context.setIsActive(true)
					},
					onMouseLeave() {
						if (context.disabled) return
						context.setIsActive(false)
						context.setIsPressed(false)
					},
					onMouseDown(event) {
						if (context.disabled) return
						context.updatePosition(event)
						context.setIsPressed(true)
					},
					onMouseUp() {
						if (context.disabled) return
						context.setIsPressed(false)
					},
					children,
				},
				props,
			),
			animate: {
				scale: getPressableFeedbackScale({
					animation,
					fallbackScale: scale,
					isPressed: context.isPressed,
				}),
			},
			transition: getPressableFeedbackTransition(animation),
			'data-slot': 'pressable-feedback-scale',
		},
	})
}
