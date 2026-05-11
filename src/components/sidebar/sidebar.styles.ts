import { cn } from '@/lib/cn'

export function sidebarItemClass({
	active,
	className,
}: {
	active?: boolean
	className?: string
}) {
	return cn(
		'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors',
		active ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white',
		className,
	)
}
