'use client'

import { useReducedMotion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/cn'

import { resolveWindowControlAnimation } from './window-control.animation'
import { WindowControlButton } from './window-control.button'
import { WindowControlClose } from './window-control.close'
import { DISPLAY_NAME } from './window-control.constants'
import { WindowControlProvider } from './window-control.context'
import { WindowControlGrabber } from './window-control.grabber'
import { WindowControlShare } from './window-control.share'
import { windowControlVariants } from './window-control.styles'
import type { WindowControlRootProps } from './window-control.types'

function WindowControlRoot({
	className,
	children,
	animation = true,
	onClose,
	label = 'Window controls',
	onPointerEnter,
	onPointerLeave,
	...props
}: WindowControlRootProps) {
	const reducedMotion = useReducedMotion() ?? false
	const resolvedAnimation = resolveWindowControlAnimation(animation, reducedMotion)
	const [isHovered, setIsHovered] = React.useState(false)

	const contextValue = React.useMemo(
		() => ({ isHovered, animation: resolvedAnimation }),
		[isHovered, resolvedAnimation],
	)

	return (
		<WindowControlProvider value={contextValue}>
			<div
				role="group"
				aria-label={label}
				data-slot="window-control"
				className={cn(windowControlVariants(), className)}
				onPointerEnter={(event) => {
					setIsHovered(true)
					onPointerEnter?.(event)
				}}
				onPointerLeave={(event) => {
					setIsHovered(false)
					onPointerLeave?.(event)
				}}
				{...props}
			>
				{children ?? (
					<>
						<WindowControlClose onClose={onClose} />
						<WindowControlGrabber />
						<WindowControlShare />
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
	Close: WindowControlClose,
	Grabber: WindowControlGrabber,
	Share: WindowControlShare,
})
