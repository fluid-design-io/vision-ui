'use client'

import { createContext, use } from 'react'
import { DISPLAY_NAME } from './ornament.constants'
import type { OrnamentContextValue } from './ornament.types'

const OrnamentContext = createContext<OrnamentContextValue | null>(null)

export function OrnamentProvider({
	value,
	children,
}: {
	value: OrnamentContextValue
	children: React.ReactNode
}) {
	return <OrnamentContext.Provider value={value}>{children}</OrnamentContext.Provider>
}

OrnamentProvider.displayName = `${DISPLAY_NAME.ROOT}.Provider`

export function useOrnament(): OrnamentContextValue {
	const context = use(OrnamentContext)
	if (!context) {
		throw new Error('useOrnament must be used within an <Ornament> root.')
	}
	return context
}
