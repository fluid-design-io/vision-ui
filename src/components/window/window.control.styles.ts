import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

/**
 * The control row. Centered, with the grabber and the two glass buttons
 * laid out horizontally. `pt-[22px]` separates it from the window above.
 */
export const windowControlVariants = cva(
	cn(
		'flex flex-wrap content-center items-center justify-center gap-6 rounded-[44px] pt-[22px] pb-px',
	),
)

/**
 * A flanking slot wrapper. Lays its content out inline; the reveal motion
 * (opacity / scale) is applied by the slot component itself.
 */
export const windowControlSlotVariants = cva(cn('inline-flex shrink-0'))

/**
 * Glass circle used as the default prefix / suffix content. Transparent at
 * rest; the icon and a faint backdrop blur make it read as glass once revealed.
 */
export const windowControlButtonVariants = cva(
	cn(
		'relative flex size-3.5 shrink-0 items-center justify-center rounded-full',
		'hover:bg-white/95',
		'bg-white/30 backdrop-blur-[10px]',
		'outline-none',
		'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		'[&_svg:not([class*="size-"])]:text-black [&_svg:not([class*="size-"])]:size-2 [&_svg:not([class*="size-"])]:opacity-0',
		'hover:[&_svg:not([class*="size-"])]:opacity-100',
	),
)

/**
 * The grabber handle pill. Always visible; brightens on hover.
 */
export const windowControlGrabberVariants = cva(
	cn('h-2.5 w-34 shrink-0 rounded-full bg-white/50 backdrop-blur-[10px]'),
)
