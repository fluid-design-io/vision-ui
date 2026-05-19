import type { UseRenderRenderProp } from '@base-ui/react/use-render'
import type { HTMLMotionProps } from 'motion/react'
import type * as React from 'react'

export const glassThicknessValues = {
	none: 'none',
	thinnest: 'thinnest',
	thinner: 'thinner',
	thin: 'thin',
	normal: 'normal',
	thick: 'thick',
	thicker: 'thicker',
	thickest: 'thickest',
} as const

export type GlassThickness = (typeof glassThicknessValues)[keyof typeof glassThicknessValues]

export interface SurfaceOwnProps {
	thickness?: GlassThickness
	/** Custom element or Base UI render function for the root. */
	render?: UseRenderRenderProp
}

export interface SurfaceRootProps
	extends Omit<HTMLMotionProps<'div'>, 'children'>, SurfaceOwnProps {
	children?: React.ReactNode
}

export type SurfaceProps = SurfaceRootProps
