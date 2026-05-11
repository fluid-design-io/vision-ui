'use client'

import { ScrollArea } from '@base-ui/react/scroll-area'

import { cn } from '@/lib/cn'

import type { ScrollViewCornerProps } from './scrollview.types'

export function ScrollViewCorner({ className, ...props }: ScrollViewCornerProps) {
	return <ScrollArea.Corner className={cn(className)} {...props} />
}
