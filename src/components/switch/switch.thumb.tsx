'use client'

import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { motion, useReducedMotion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/cn'

import { getSwitchThumbTransition, SWITCH_PRESS_THUMB_SCALE } from './switch.animation'
import { DISPLAY_NAME } from './switch.constants'
import { useSwitchContext } from './switch.context'
import { toMotionSpanProps } from './switch.motion'
import { getSwitchThumbTravelPx, switchThumbVariants } from './switch.styles'
import type { SwitchThumbProps } from './switch.types'
import { callRenderProp } from './switch.utils'

export function SwitchThumb({ className, size, children, render, ...props }: SwitchThumbProps) {
	const context = useSwitchContext(DISPLAY_NAME.THUMB)
	const reducedMotion = useReducedMotion()
	const resolvedSize = size ?? context.size ?? 'default'
	const thumbTravel = getSwitchThumbTravelPx(resolvedSize)
	const thumbChildren = callRenderProp(children, { isSelected: context.isSelected })

	if (render) {
		return (
			<BaseSwitch.Thumb
				className={cn(switchThumbVariants({ size: resolvedSize, className }))}
				render={render as React.ComponentProps<typeof BaseSwitch.Thumb>['render']}
				{...props}
			/>
		)
	}

	return (
		<BaseSwitch.Thumb
			className={cn(switchThumbVariants({ size: resolvedSize, className }))}
			{...props}
			render={(thumbProps, state) => (
				<motion.span
					{...toMotionSpanProps(thumbProps)}
					animate={{
						x: state.checked ? thumbTravel : 0,
						scale: context.isPressed ? SWITCH_PRESS_THUMB_SCALE : 1,
					}}
					transition={getSwitchThumbTransition(reducedMotion ?? false)}
				>
					{thumbChildren}
				</motion.span>
			)}
		/>
	)
}

SwitchThumb.displayName = DISPLAY_NAME.THUMB
