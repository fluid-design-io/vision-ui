import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

/**
 * The control row. Centered, with the grabber and the two glass buttons
 * laid out horizontally. `pt-[22px]` separates it from the window above.
 */
export const windowControlVariants = cva(
	cn('flex flex-wrap content-center items-center justify-center gap-6 rounded-[44px] pt-[22px] pb-px'),
)

/**
 * Close / Share glass circle. Transparent at rest; the icon and a faint
 * backdrop blur make it read as glass once revealed on hover.
 */
export const windowControlButtonVariants = cva(
	cn(
		'relative flex size-3.5 shrink-0 items-center justify-center rounded-full',
		'bg-white/0 backdrop-blur-[10px]',
		'text-white/90 outline-none',
		'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		'[&_svg:not([class*="size-"])]:size-2.5',
	),
)

/**
 * The grabber handle pill. Always visible; brightens on hover.
 */
export const windowControlGrabberVariants = cva(
	cn('h-2.5 w-34 shrink-0 rounded-full bg-white/30 backdrop-blur-[10px]'),
)
