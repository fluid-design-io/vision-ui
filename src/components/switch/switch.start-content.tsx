'use client'

import * as React from 'react'

import { cn } from '@/lib/cn'

import { DISPLAY_NAME } from './switch.constants'
import { useSwitchContext } from './switch.context'
import { switchStartContentVariants } from './switch.styles'
import type { SwitchStartContentProps } from './switch.types'

export function SwitchStartContent({ className, children, ...props }: SwitchStartContentProps) {
	useSwitchContext(DISPLAY_NAME.START_CONTENT)

	return (
		<span
			data-slot="switch-start-content"
			className={cn(switchStartContentVariants({ className }))}
			{...props}
		>
			{children}
		</span>
	)
}

SwitchStartContent.displayName = DISPLAY_NAME.START_CONTENT
