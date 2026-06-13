import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { SWITCH_SIZE } from './switch.constants'

export const switchVariants = cva(
	cn(
		'[--switch-padding:4px]',
		'relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-(--switch-padding)',
		'transition-colors duration-200 ease-out',
		'data-checked:shadow-[inset_0_-0.85px_1px_0_rgba(255,255,255,0.50),inset_0_-0.85px_1px_0_rgba(255,255,255,0.25),inset_1px_1.5px_4px_0_rgba(0,0,0,0.18),inset_1px_1.5px_4px_0_rgba(0,0,0,0.2)]',
		'data-unchecked:shadow-[inset_0_-0.85px_1px_0_rgba(94,94,94,0.50),inset_0_-0.85px_1px_0_rgba(255,255,255,0.20),inset_0_3px_3px_0_rgba(128,128,128,0.3),inset_0_3px_3px_0_rgba(0,0,0,0.3)]',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		'data-disabled:cursor-not-allowed data-disabled:opacity-50',
		'data-unchecked:bg-[rgb(208_208_208/0.5)]',
		'data-checked:bg-[#32D74B]',
	),
	{
		variants: {
			size: {
				default: cn(
					'[--switch-track-height:28px]',
					'h-(--switch-track-height) w-[calc(var(--switch-track-height)*2.15)]',
					'[--switch-thumb-size:calc(var(--switch-track-height)-var(--switch-padding)*2)]',
				),
				sm: cn(
					'[--switch-track-height:24px]',
					'h-(--switch-track-height) w-[calc(var(--switch-track-height)*2.15)]',
					'[--switch-thumb-size:calc(var(--switch-track-height)-var(--switch-padding)*2)]',
				),
			},
		},
		defaultVariants: {
			size: 'default',
		},
	},
)

export const switchThumbVariants = cva(
	cn(
		'pointer-events-none relative z-10 block rounded-full bg-white',
		'shadow-[0_1px_3px_rgba(0,0,0,0.28),0_1px_1px_rgba(0,0,0,0.12)]',
	),
	{
		variants: {
			size: {
				default: 'h-(--switch-thumb-size) w-[calc(var(--switch-thumb-size)*1.65)]',
				sm: 'h-(--switch-thumb-size) w-[calc(var(--switch-thumb-size)*1.65)]',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	},
)

export const switchStartContentVariants = cva(
	cn(
		'pointer-events-none absolute top-1/2 left-1.5 z-1 flex -translate-y-1/2 items-center justify-center',
		'text-white/90 opacity-100 transition-opacity duration-200',
		'[&_svg:not([class*="size-"])]:size-3.5 [&_svg:not([class*="text-"])]:text-green-800',
	),
)

export const switchEndContentVariants = cva(
	cn(
		'pointer-events-none absolute top-1/2 right-1.5 z-1 flex -translate-y-1/2 items-center justify-center',
		'text-white/90 opacity-0 transition-opacity duration-200 not-group-data-checked:opacity-100',
		'[&_svg:not([class*="size-"])]:size-3.5 [&_svg:not([class*="text-"])]:text-foreground/50',
	),
)

export function getSwitchThumbTravelPx(size: keyof typeof SWITCH_SIZE = 'default') {
	const { trackWidth, thumbSize, padding } = SWITCH_SIZE[size]
	return trackWidth - thumbSize * 1.65 - padding * 2
}
