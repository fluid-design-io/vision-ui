'use client'

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as React from 'react'

import { cn } from '@/lib/cn'

import {
	getPressableFeedbackScale,
	getPressableFeedbackTransition,
} from './pressable-feedback.animation'
import { PressableFeedbackContext } from './pressable-feedback.context'
import { usePressableFeedbackMotionRender } from './pressable-feedback.motion'
import type {
	PressableFeedbackRootProps,
	PressableFeedbackScaleState,
} from './pressable-feedback.types'

export function PressableFeedbackRoot({
	animation = true,
	disabled = false,
	render,
	xOffset = 48,
	yOffset = 6,
	className,
	style,
	children,
	...props
}: PressableFeedbackRootProps) {
	const targetRef = React.useRef<HTMLElement | null>(null)
	const [isActive, setIsActive] = React.useState(false)
	const [isPressed, setIsPressed] = React.useState(false)

	const setTarget = React.useCallback((node: HTMLElement | null) => {
		targetRef.current = node
	}, [])

	const updateTargetPosition = React.useCallback(
		(target: HTMLElement, clientX: number, clientY: number) => {
			const rect = target.getBoundingClientRect()
			const xProgress = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width
			const yProgress = rect.height === 0 ? 0 : (clientY - rect.top) / rect.height
			const x = (xProgress - 0.5) * 2
			const y = (yProgress - 0.5) * 2

			target.style.setProperty('--pressable-feedback-x', `${x * xOffset}px`)
			target.style.setProperty('--pressable-feedback-y', `${y * yOffset}px`)

			return (
				clientX >= rect.left &&
				clientX <= rect.right &&
				clientY >= rect.top &&
				clientY <= rect.bottom
			)
		},
		[xOffset, yOffset],
	)

	const updatePosition = React.useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			if (disabled) return

			const target = targetRef.current ?? event.currentTarget
			updateTargetPosition(target, event.clientX, event.clientY)
		},
		[disabled, updateTargetPosition],
	)

	const activate = (event: React.MouseEvent<HTMLElement>) => {
		if (disabled) return
		updatePosition(event)
		setIsActive(true)
	}

	const deactivate = () => {
		if (disabled) return
		setIsActive(false)
		setIsPressed(false)
	}

	const press = (event: React.MouseEvent<HTMLElement>) => {
		if (disabled) return
		updatePosition(event)
		setIsPressed(true)
	}

	const release = () => {
		if (disabled) return
		setIsPressed(false)
	}

	React.useEffect(() => {
		if (disabled || (!isActive && !isPressed)) return

		function updateActiveState(event: PointerEvent | MouseEvent) {
			const target = targetRef.current
			if (!target) return

			const isWithinTarget = updateTargetPosition(target, event.clientX, event.clientY)
			setIsActive(isWithinTarget)
			if (!isWithinTarget) {
				setIsPressed(false)
			}
		}

		document.addEventListener('pointermove', updateActiveState)
		document.addEventListener('mousemove', updateActiveState)

		return () => {
			document.removeEventListener('pointermove', updateActiveState)
			document.removeEventListener('mousemove', updateActiveState)
		}
	}, [disabled, isActive, isPressed, updateTargetPosition])

	const value = React.useMemo(
		() => ({
			disabled,
			xOffset,
			yOffset,
			isActive: !disabled && isActive,
			isPressed: !disabled && isPressed,
			setIsActive,
			setIsPressed,
			setTarget,
			updatePosition,
		}),
		[disabled, isActive, isPressed, setTarget, updatePosition, xOffset, yOffset],
	)

	const state: PressableFeedbackScaleState = {
		active: value.isActive,
		pressed: value.isPressed,
		disabled,
	}

	const motionAnimation = typeof animation === 'object' ? animation : undefined
	const isRootAnimationEnabled = animation !== false
	const motionRender = usePressableFeedbackMotionRender(render)

	const renderedRoot = useRender<PressableFeedbackScaleState, HTMLElement>({
		defaultTagName: 'div',
		render: motionRender,
		ref: isRootAnimationEnabled ? setTarget : undefined,
		state,
		props: {
			...mergeProps<'div'>(
				{
					className: cn(
						'relative overflow-hidden [--pressable-feedback-x:0px] [--pressable-feedback-y:0px]',
						className,
					),
					style,
					onPointerEnter: activate,
					onPointerMove: activate,
					onPointerLeave: deactivate,
					onPointerDown: press,
					onPointerUp: release,
					onPointerCancel: release,
					onMouseEnter: activate,
					onMouseMove: activate,
					onMouseLeave: deactivate,
					onMouseDown: press,
					onMouseUp: release,
					children,
				},
				props,
			),
			animate: {
				scale: isRootAnimationEnabled
					? getPressableFeedbackScale({
							animation: motionAnimation,
							isPressed: value.isPressed,
						})
					: 1,
			},
			transition: getPressableFeedbackTransition(motionAnimation),
			'data-slot': 'pressable-feedback-root',
		},
	})

	return <PressableFeedbackContext value={value}>{renderedRoot}</PressableFeedbackContext>
}
