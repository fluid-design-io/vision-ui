'use client'

import { cn } from '@/lib/cn'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import {
	getHighlightOpacity,
	getHighlightStroke,
	getRings,
	getThickness,
	leftTopHighlightStyle,
	rightBottomHighlightStyle,
	SATURATION,
	SURFACE_LAYOUT_VARS,
} from './surface.styles'
import type { GlassThickness, SurfaceRootProps } from './surface.types'

function SurfaceOverlays({ thickness }: { thickness: GlassThickness }) {
	return (
		<>
			<div
				className="pointer-events-none absolute inset-x-0 z-40 h-full w-full"
				style={{
					boxShadow: getRings(thickness),
					borderRadius: `var(--view-radius)`,
					top: 0,
				}}
				aria-hidden="true"
			/>
			<div
				className={cn(
					getHighlightStroke(thickness),
					'pointer-events-none absolute inset-[-0.75px] z-40',
					'[--mask-inner-distance:calc(50%-var(--mask-stroke)-var(--mask-stroke))] [--mask-outer-distance:calc(50%-var(--mask-stroke))]',
				)}
				style={{
					...leftTopHighlightStyle,
					opacity: getHighlightOpacity(thickness) + 0.35,
				}}
				aria-hidden="true"
			/>
			<div
				className={cn(
					getHighlightStroke(thickness),
					'pointer-events-none absolute inset-[-0.5px] z-40',
					'[--mask-inner-distance:calc(50%-var(--mask-stroke)-var(--mask-stroke))] [--mask-outer-distance:calc(50%-var(--mask-stroke))]',
				)}
				style={{
					...rightBottomHighlightStyle,
					opacity: getHighlightOpacity(thickness) - 0.025,
				}}
				aria-hidden="true"
			/>
		</>
	)
}

function SurfaceRoot({
	thickness = 'normal',
	className,
	children,
	render,
	...rest
}: SurfaceRootProps) {
	const blur = getThickness(thickness)
	const surfaceStyle = {
		backdropFilter:
			thickness === 'none' ? 'none' : `saturate(${SATURATION}) blur(${blur}px) brightness(0.85)`,
		WebkitBackdropFilter:
			thickness === 'none' ? 'none' : `saturate(${SATURATION}) blur(${blur}px) brightness(0.85)`,
		borderRadius: `var(--view-radius)`,
	}

	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			slot: 'surface',
		},
		props: mergeProps(
			{
				className: cn(
					'relative',
					'min-h-[64px] min-w-[64px]',
					SURFACE_LAYOUT_VARS.VAR_DIAMETER,
					SURFACE_LAYOUT_VARS.VAR_RADIUS,
					className,
				),
				style: surfaceStyle,
				children: (
					<>
						<SurfaceOverlays thickness={thickness} />
						{children}
					</>
				),
			},
			rest,
		),
	})
}

export const Surface = Object.assign(SurfaceRoot, {
	Root: SurfaceRoot,
})
