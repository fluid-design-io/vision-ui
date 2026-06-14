'use client'

import { XIcon } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/cn'

import { ShareWindowIcon } from '../icons'
import { resolveWindowControlAnimation } from './window.control.animation'
import { WindowControlButton } from './window.control.button'
import { DISPLAY_NAME } from './window.control.constants'
import { WindowControlProvider, type WindowControlSide } from './window.control.context'
import { WindowControlGrabber } from './window.control.grabber'
import { WindowControlPrefix, WindowControlSuffix } from './window.control.slot'
import { windowControlVariants } from './window.control.styles'
import type { WindowControlRootProps } from './window.control.types'

function WindowControlRoot({
	className,
	children,
	animation = true,
	anchored = true,
	onClose,
	label = 'Window controls',
	onPointerEnter,
	onPointerLeave,
	...props
}: WindowControlRootProps) {
	const reducedMotion = useReducedMotion() ?? false
	const resolvedAnimation = resolveWindowControlAnimation(animation, reducedMotion)
	const [isHovered, setIsHovered] = React.useState(false)
	const [hoveredSide, setHoveredSide] = React.useState<WindowControlSide | null>(null)

	const contextValue = React.useMemo(
		() => ({ isHovered, hoveredSide, setHoveredSide, animation: resolvedAnimation }),
		[isHovered, hoveredSide, resolvedAnimation],
	)

	return (
		<WindowControlProvider value={contextValue}>
			<div
				role="group"
				aria-label={label}
				data-slot="window-control"
				className={cn(
					windowControlVariants(),
					anchored && 'absolute top-full left-1/2 -translate-x-1/2',
					className,
				)}
				onPointerEnter={(event) => {
					setIsHovered(true)
					onPointerEnter?.(event)
				}}
				onPointerLeave={(event) => {
					setIsHovered(false)
					setHoveredSide(null)
					onPointerLeave?.(event)
				}}
				{...props}
			>
				{children ?? (
					<>
						<WindowControlPrefix>
							<WindowControlButton label="Close" onClick={onClose}>
								<XIcon />
							</WindowControlButton>
						</WindowControlPrefix>
						<WindowControlGrabber />
						<WindowControlSuffix>
							<WindowControlButton label="Share">
								<ShareWindowIcon />
							</WindowControlButton>
						</WindowControlSuffix>
					</>
				)}
			</div>
		</WindowControlProvider>
	)
}

WindowControlRoot.displayName = DISPLAY_NAME.ROOT

export const WindowControl = Object.assign(WindowControlRoot, {
	Root: WindowControlRoot,
	Button: WindowControlButton,
	Prefix: WindowControlPrefix,
	Suffix: WindowControlSuffix,
	Grabber: WindowControlGrabber,
})
