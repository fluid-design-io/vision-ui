import type { VariantProps } from 'class-variance-authority'
import type { SVGMotionProps, Transition } from 'motion/react'

import type { activityIndicatorVariants } from './activity-indicator.styles'

export type ActivityIndicatorVariant = VariantProps<typeof activityIndicatorVariants>

/**
 * One-time 360° spin of the whole icon, played when loading starts.
 */
export interface ActivityIndicatorSpinAnimation {
	/**
	 * Rotation applied during the intro spin.
	 * @default 360
	 */
	degrees?: number
	/** Motion transition for the spin. Plays once. */
	transition?: Transition
}

/**
 * Looping opacity wave that travels around the spokes.
 */
export interface ActivityIndicatorFadeAnimation {
	/**
	 * Opacity of the dimmest (trailing) spoke.
	 * @default 0.15
	 */
	minOpacity?: number
	/**
	 * Opacity of the brightest (leading) spoke.
	 * @default 1
	 */
	maxOpacity?: number
	/** Motion transition for the fade loop. Repeats forever while loading. */
	transition?: Transition
}

export interface ActivityIndicatorAnimation {
	/** Intro spin. `true` uses defaults, `false` disables it, or pass an object to customize. */
	spin?: boolean | ActivityIndicatorSpinAnimation
	/** Looping opacity wave. `true` uses defaults, `false` disables it, or pass an object to customize. */
	fade?: boolean | ActivityIndicatorFadeAnimation
}

export interface ActivityIndicatorRootOwnProps extends ActivityIndicatorVariant {
	/**
	 * Drives the animation. When `true` the icon spins once and the spokes
	 * pulse in a loop; when `false` the indicator is shown frozen.
	 * @default true
	 */
	isLoading?: boolean
	/**
	 * Built-in Motion animation. `true` uses defaults, `false` disables all motion,
	 * or pass an object to customize the `spin` and `fade` parts independently.
	 * @default true
	 */
	animation?: boolean | ActivityIndicatorAnimation
	/**
	 * Accessible label announced by assistive tech.
	 * @default "Loading"
	 */
	label?: string
}

export interface ActivityIndicatorRootProps
	extends
		Omit<SVGMotionProps<SVGSVGElement>, 'children' | 'className'>,
		ActivityIndicatorRootOwnProps {
	className?: string
}

export type ActivityIndicatorProps = ActivityIndicatorRootProps

export interface ActivityIndicatorIconProps
	extends Omit<SVGMotionProps<SVGSVGElement>, 'children' | 'className'>, ActivityIndicatorVariant {
	className?: string
}
