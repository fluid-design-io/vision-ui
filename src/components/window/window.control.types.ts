import type { HTMLMotionProps, Transition } from 'motion/react'
import type * as React from 'react'

/**
 * Hover-reveal of the flanking slots (prefix / suffix).
 */
export interface WindowControlRevealAnimation {
	/** Motion transition for the reveal. */
	transition?: Transition
	/**
	 * Scale the slot starts from while hidden.
	 * @default 0.6
	 */
	hiddenScale?: number
	/**
	 * Opacity the slot has while hidden.
	 * @default 0
	 */
	hiddenOpacity?: number
}

/**
 * Grabber response to hover: brightness on control hover, plus a directional
 * shrink when an adjacent slot is hovered.
 */
export interface WindowControlGrabberAnimation {
	/** Motion transition for the brightness change and side shrink. */
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
	/**
	 * Horizontal scale the grabber shrinks to while an adjacent slot (prefix or
	 * suffix) is hovered. The shrink is anchored to the far edge, so the grabber
	 * recedes on the hovered side to make room for that slot's hover scale.
	 * @default 0.82
	 */
	shrinkScale?: number
}

export interface WindowControlAnimation {
	/** Reveal of the flanking slots. `true` uses defaults, `false` disables (slots stay visible), or an object to customize. */
	reveal?: boolean | WindowControlRevealAnimation
	/** Grabber brightness + side shrink on hover. `true` uses defaults, `false` disables, or an object to customize. */
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
	 * Anchor the control as an absolute overlay centered just below the window
	 * (its nearest positioned ancestor), out of normal flow — so it never affects
	 * the window's size or the surrounding layout. Use `<Window>` to provide the
	 * positioned ancestor. Set `false` to render the control in normal flow.
	 * @default true
	 */
	anchored?: boolean
	/**
	 * Convenience handler wired to the default prefix (close) button.
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

/**
 * A flanking slot (prefix on the left, suffix on the right of the grabber).
 * Drop any content in — typically a `WindowControl.Button`, but anything works.
 * The slot owns the hover-reveal and notifies the grabber to recede on its side.
 */
export interface WindowControlSlotOwnProps {
	/** Content rendered in the slot. */
	children?: React.ReactNode
}

export interface WindowControlSlotProps
	extends Omit<HTMLMotionProps<'div'>, 'className' | 'children'>,
		WindowControlSlotOwnProps {
	className?: string
}

export interface WindowControlGrabberProps extends Omit<HTMLMotionProps<'div'>, 'className'> {
	className?: string
}

export type WindowControlProps = WindowControlRootProps
