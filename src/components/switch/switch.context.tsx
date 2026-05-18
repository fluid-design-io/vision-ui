'use client'

import * as React from 'react'

import { DISPLAY_NAME } from './switch.constants'
import type { SwitchRootState, SwitchVariant } from './switch.types'

export type SwitchContextValue = SwitchRootState &
	SwitchVariant & {
		setIsPressed: React.Dispatch<React.SetStateAction<boolean>>
		isPressed: boolean
	}

export const SwitchContext = React.createContext<SwitchContextValue | null>(null)

export function SwitchProvider({
	children,
	value,
}: {
	children: React.ReactNode
	value: SwitchContextValue
}) {
	return <SwitchContext value={value}>{children}</SwitchContext>
}

SwitchProvider.displayName = `${DISPLAY_NAME.ROOT}.Provider`

export function useSwitchContext(component: string) {
	const context = React.use(SwitchContext)

	if (!context) {
		throw new Error(`${component} must be used within <Switch>.`)
	}

	return context
}
