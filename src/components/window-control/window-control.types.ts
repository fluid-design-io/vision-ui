import type { HTMLMotionProps, Transition } from 'motion/react'
import type * as React from 'react'

/**
 * Hover-reveal of the side buttons (Close / Share).
 */
export interface WindowControlRevealAnimation {
	/** Motion transition for the reveal. */
	transition?: Transition
	/**
	 * Scale the button starts from while hidden.
	 * @default 0.6
	 */
	hiddenScale?: number
	/**
	 * Opacity the button has while hidden.
	 * @default 0
	 */
	hiddenOpacity?: number
}

/**
 * Grabber brightness response to hover.
 */
export interface WindowControlGrabberAnimation {
	/** Motion transition for the brightness change. */
	transition?: Transition
	/**
	 * Grabber fill opacity at rest.
	 * @default 0.3
	 */
	restOpacity?: number
	/**
	 * Grabber fill opacity while the control is hovered.
	 * @default 0.5
	 */
	hoverOpacity?: number
}

export interface WindowControlAnimation {
	/** Reveal of the side buttons. `true` uses defaults, `false` disables (buttons stay visible), or an object to customize. */
	reveal?: boolean | WindowControlRevealAnimation
	/** Grabber brightness on hover. `true` uses defaults, `false` disables, or an object to customize. */
	grabber?: boolean | WindowControlGrabberAnimation
}

export interface WindowControlRootOwnProps {
	/**
	 * Built-in Motion animation. `true` uses defaults, `false` disables all motion,
	 * or pass an object to customize the `reveal` and `grabber` parts independently.
	 * @default true
	 */
	animation?: boolean | WindowControlAnimation
	/**
	 * Convenience handler forwarded to the default `WindowControl.Close`.
	 * Only used when no children are provided.
	 */
	onClose?: () => void
	/**
	 * Accessible label for the control group.
	 * @default "Window controls"
	 */
	label?: string
}

export interface WindowControlRootProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
		WindowControlRootOwnProps {
	children?: React.ReactNode
}

export interface WindowControlButtonOwnProps {
	/** Icon (or any content) rendered inside the glass circle. */
	children?: React.ReactNode
	/** Accessible label — required since the button is icon-only. */
	label: string
	/** When true, the button is non-interactive and dimmed. */
	isDisabled?: boolean
}

export interface WindowControlButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
		WindowControlButtonOwnProps {}

export interface WindowControlCloseOwnProps
	extends Omit<WindowControlButtonOwnProps, 'label'> {
	/** Fired before `onClick` when the close button is activated. Bind your router here. */
	onClose?: () => void
	/**
	 * @default "Close"
	 */
	label?: string
}

export interface WindowControlCloseProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
		WindowControlCloseOwnProps {}

export interface WindowControlShareOwnProps extends Omit<WindowControlButtonOwnProps, 'label'> {
	/**
	 * @default "Share"
	 */
	label?: string
}

export interface WindowControlShareProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
		WindowControlShareOwnProps {}

export interface WindowControlGrabberProps extends Omit<HTMLMotionProps<'div'>, 'className'> {
	className?: string
}

export type WindowControlProps = WindowControlRootProps
