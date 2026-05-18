'use client'

import * as React from 'react'

import { cn } from '@/lib/cn'

import { DISPLAY_NAME } from './switch.constants'
import { useSwitchContext } from './switch.context'
import { switchEndContentVariants } from './switch.styles'
import type { SwitchEndContentProps } from './switch.types'

export function SwitchEndContent({ className, children, ...props }: SwitchEndContentProps) {
	useSwitchContext(DISPLAY_NAME.END_CONTENT)

	return (
		<span
			data-slot="switch-end-content"
			className={cn(switchEndContentVariants({ className }))}
			{...props}
		>
			{children}
		</span>
	)
}

SwitchEndContent.displayName = DISPLAY_NAME.END_CONTENT
