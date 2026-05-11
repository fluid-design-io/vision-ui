'use client'

import { cn } from '@/lib/cn'
import type { SidebarSectionProps } from './sidebar.types'

export function SidebarSection({ title, className, children }: SidebarSectionProps) {
	return (
		<div className={cn('flex flex-col gap-1 py-2', className)}>
			{title ? (
				<div className="px-2 pb-1 text-[11px] font-semibold tracking-wide text-white/45 uppercase">
					{title}
				</div>
			) : null}
			<div className="flex flex-col gap-0.5">{children}</div>
		</div>
	)
}
