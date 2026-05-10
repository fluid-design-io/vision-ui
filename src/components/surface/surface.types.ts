import type { HTMLElements, HTMLMotionProps } from 'motion/react'

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
}

export type SurfaceRootProps<Tag extends keyof HTMLElements = 'div'> = HTMLMotionProps<Tag> & {
	thickness?: GlassThickness
	as?: Tag
}

export type SurfaceProps = SurfaceRootProps
