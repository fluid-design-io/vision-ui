'use client'

import { cn } from '@/lib/cn'
import * as ScrollViewPrimitive from '@radix-ui/react-scroll-area'
import type { ScrollViewCornerProps } from './scrollview.types'

export function ScrollViewCorner({ className, ...props }: ScrollViewCornerProps) {
	return <ScrollViewPrimitive.Corner className={cn(className)} {...props} />
}
