'use client'

import { useState } from 'react'
import { DISPLAY_NAME } from './ornament.constants'
import { OrnamentProvider } from './ornament.context'
import { OrnamentTab, OrnamentTabIcon, OrnamentTabLabel } from './ornament.tab'
import { OrnamentTabs } from './ornament.tabs'
import type { OrnamentRootProps } from './ornament.types'

function OrnamentRoot({ orientation = 'vertical', className, children }: OrnamentRootProps) {
	const [isFocused, setIsFocused] = useState(false)
	const [isPressed, setIsPressed] = useState(false)

	return (
		<OrnamentProvider value={{ orientation, isFocused, setIsFocused, isPressed, setIsPressed }}>
			<div className={className} data-slot="ornament-root">
				{children}
			</div>
		</OrnamentProvider>
	)
}

OrnamentRoot.displayName = DISPLAY_NAME.ROOT

export const Ornament = Object.assign(OrnamentRoot, {
	Root: OrnamentRoot,
	Tabs: OrnamentTabs,
	Tab: OrnamentTab,
	TabIcon: OrnamentTabIcon,
	TabLabel: OrnamentTabLabel,
})
