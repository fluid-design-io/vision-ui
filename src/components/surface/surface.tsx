import { cn } from '@/lib/cn'
import type { ComponentType } from 'react'
import {
	type HTMLMotionProps,
	type HTMLElements,
	type MotionStyle,
	motion,
} from 'motion/react'
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
import type { SurfaceRootProps } from './surface.types'

type SurfaceMotionRootProps<Tag extends keyof HTMLElements> = Omit<
	HTMLMotionProps<Tag>,
	'children'
>

const SurfaceRoot = <Tag extends keyof HTMLElements = 'div'>({
	thickness = 'normal',
	className,
	style,
	children,
	as,
	...rest
}: SurfaceRootProps<Tag>) => {
	const blur = getThickness(thickness)
	const surfaceStyle: MotionStyle = {
		backdropFilter:
			thickness === 'none'
				? 'none'
				: `saturate(${SATURATION}) blur(${blur}px) brightness(0.85)`,
		WebkitBackdropFilter:
			thickness === 'none'
				? 'none'
				: `saturate(${SATURATION}) blur(${blur}px) brightness(0.85)`,
		borderRadius: `var(--view-radius)`,
		...style,
	}
	const tag = as ?? 'div'
	// Dynamic `motion[tag]` is typed as a union; narrow via ComponentType + assertion.
	const Component = motion[tag] as ComponentType<SurfaceMotionRootProps<Tag>>

	const props = {
		className: cn(
			'relative',
			// 'before:absolute before:inset-0 before:z-[-1] before:rounded-[var(--view-radius)]',
			// 'before:bg-[#80808030]',
			'min-h-[64px] min-w-[64px]',
			SURFACE_LAYOUT_VARS.VAR_DIAMETER,
			SURFACE_LAYOUT_VARS.VAR_RADIUS,
			className,
		),
		style: surfaceStyle,
		...rest,
	} as unknown as SurfaceMotionRootProps<Tag>

	return (
		<Component {...props}>
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
			{children}
		</Component>
	)
}

export const Surface = Object.assign(SurfaceRoot, {
	Root: SurfaceRoot,
})
