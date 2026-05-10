import { cva } from 'class-variance-authority'

export const ornamentTabsContainer = cva('h-full place-content-center gap-4 md:gap-7', {
	variants: {
		orientation: {
			vertical: 'w-[64px]',
			horizontal: 'h-[64px]',
		},
	},
	defaultVariants: {
		orientation: 'vertical',
	},
})

export const ornamentTabsTrack = cva('flex items-start gap-2 p-2.5', {
	variants: {
		orientation: {
			vertical: 'flex-col',
			horizontal: 'flex-row',
		},
	},
	defaultVariants: {
		orientation: 'vertical',
	},
})

export const ornamentClassNames = {
	tabsSurface: 'relative z-42 self-center',
	tab: 'group flex w-full items-center justify-stretch rounded-full px-[10px] before:rounded-full',
	tabIcon:
		"relative shrink-0 **:data-[slot='icon']:size-6 group-hover:**:data-[slot='icon']:opacity-95 **:text-white",
	tabLabel: 'ml-4 flex-1 overflow-hidden text-start [&>p]:text-white',
	tabLabelText:
		'line-clamp-1 w-fit min-w-[60px] truncate font-medium leading-[24px] opacity-60 group-hover:opacity-95',
} as const
