'use client'

import * as React from 'react'
import { DISPLAY_NAME } from '../stack.constants'
import { nextSeq, useStackChrome } from '../stack.context'
import type { StackHeaderProps } from '../stack.types'

/** Registers navigation bar chrome options (material / visibility). Renders nothing. */
export function StackHeader({ hidden = false, transparent = false, style }: StackHeaderProps) {
	const chrome = useStackChrome()
	const owner = React.useId()

	React.useLayoutEffect(() => {
		const seq = nextSeq()
		const mergedStyle = { ...style }
		if (transparent) {
			mergedStyle.backgroundColor =
				mergedStyle.backgroundColor ?? ('transparent' as unknown as string)
		}
		chrome.registerHeaderStyle(owner, seq, {
			style: mergedStyle,
			hidden,
			transparent,
		})
		return () => chrome.clearOwner(owner)
	}, [chrome, owner, hidden, transparent, style])

	return null
}

StackHeader.displayName = DISPLAY_NAME.HEADER
