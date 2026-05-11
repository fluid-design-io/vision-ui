'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import type { ToolbarLabelProps } from './toolbar.types'

export function ToolbarLabel({ children, className }: ToolbarLabelProps) {
	return <span className={cn('text-sm text-white/90', className)}>{children}</span>
}

ToolbarLabel.displayName = TOOLBAR_DISPLAY_NAME.LABEL
