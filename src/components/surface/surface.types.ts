import { HTMLElements, HTMLMotionProps } from 'motion/react'

export type GlassThickness =
	| 'none'
	| 'thinnest'
	| 'thinner'
	| 'thin'
	| 'normal'
	| 'thick'
	| 'thicker'
	| 'thickest'

export type SurfaceRootProps<Tag extends keyof HTMLElements = 'div'> = HTMLMotionProps<Tag> & {
	thickness?: GlassThickness
	as?: Tag
}

export type SurfaceProps = SurfaceRootProps
