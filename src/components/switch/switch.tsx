'use client'

import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { motion, useReducedMotion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/cn'
import { useSoundEffect } from '@/lib/sound/sound.hooks'

import { getSwitchPressTransition, SWITCH_PRESS_SCALE } from './switch.animation'
import { DISPLAY_NAME } from './switch.constants'
import { SwitchProvider } from './switch.context'
import { toMotionSpanProps } from './switch.motion'
import { SwitchEndContent } from './switch.end-content'
import { SwitchStartContent } from './switch.start-content'
import { switchVariants } from './switch.styles'
import { SwitchThumb } from './switch.thumb'
import type { SwitchBaseRootState, SwitchRootProps } from './switch.types'
import { callRenderProp, resolveSwitchChildren } from './switch.utils'

function SwitchRoot({
	className,
	size,
	isSelected: isSelectedProp,
	defaultIsSelected = false,
	onSelectedChange,
	isDisabled = false,
	isSoundDisabled,
	children,
	render,
	name,
	value,
	uncheckedValue,
	required,
	readOnly,
	form,
	...props
}: SwitchRootProps) {
	const reducedMotion = useReducedMotion()
	const playSound = useSoundEffect()
	const [isPressed, setIsPressed] = React.useState(false)
	const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultIsSelected)
	const isSelected = isSelectedProp ?? uncontrolledSelected

	const handleCheckedChange = (checked: boolean) => {
		if (!isSoundDisabled && !isDisabled && !readOnly) {
			if (checked) playSound('toggleOn')
			else playSound('toggleOff')
		}

		onSelectedChange?.(checked)
		if (isSelectedProp === undefined) {
			setUncontrolledSelected(checked)
		}
	}

	const contextValue = {
		isSelected,
		isDisabled,
		size,
		isPressed,
		setIsPressed,
	}

	const resolvedChildren = callRenderProp(children, { isSelected, isDisabled })
	const { thumb, startContent, endContent, extra } = resolveSwitchChildren(resolvedChildren)

	const resolveClassName = (state: SwitchBaseRootState) =>
		cn(switchVariants({ size }), 'group', typeof className === 'function' ? className(state) : className)

	return (
		<SwitchProvider value={contextValue}>
			<BaseSwitch.Root
				checked={isSelected}
				onCheckedChange={handleCheckedChange}
				disabled={isDisabled}
				name={name}
				value={value}
				uncheckedValue={uncheckedValue}
				required={required}
				readOnly={readOnly}
				form={form}
				className={resolveClassName}
				render={
					render ??
					((rootProps, state) => (
						<motion.span
							{...toMotionSpanProps(rootProps)}
							className={cn(resolveClassName(state), rootProps.className)}
							data-slot="switch"
							whileTap={isDisabled ? undefined : { scale: SWITCH_PRESS_SCALE }}
							transition={getSwitchPressTransition(reducedMotion ?? false)}
							onPointerDown={(event) => {
								rootProps.onPointerDown?.(event)
								if (!isDisabled) setIsPressed(true)
							}}
							onPointerUp={(event) => {
								rootProps.onPointerUp?.(event)
								setIsPressed(false)
							}}
							onPointerCancel={(event) => {
								rootProps.onPointerCancel?.(event)
								setIsPressed(false)
							}}
						/>
					))
				}
				{...props}
			>
				{extra.map((node, index) => (
					<React.Fragment key={index}>{node}</React.Fragment>
				))}
				{startContent}
				{thumb ?? <SwitchThumb />}
				{endContent}
			</BaseSwitch.Root>
		</SwitchProvider>
	)
}

SwitchRoot.displayName = DISPLAY_NAME.ROOT

export const Switch = Object.assign(SwitchRoot, {
	Root: SwitchRoot,
	Thumb: SwitchThumb,
	StartContent: SwitchStartContent,
	EndContent: SwitchEndContent,
})
