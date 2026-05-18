import * as React from 'react'

import { DISPLAY_NAME } from './switch.constants'
import type { SwitchRenderProp } from './switch.types'

export function callRenderProp<State>(
	children: SwitchRenderProp<State> | undefined,
	state: State,
): React.ReactNode {
	if (typeof children === 'function') {
		return children(state)
	}

	return children
}

function getElementDisplayName(type: React.ReactElement['type']) {
	if (typeof type === 'string') return undefined

	return (type as { displayName?: string }).displayName
}

export type ResolvedSwitchChildren = {
	thumb: React.ReactElement | null
	startContent: React.ReactElement | null
	endContent: React.ReactElement | null
	extra: React.ReactNode[]
}

export function resolveSwitchChildren(children: React.ReactNode): ResolvedSwitchChildren {
	const resolved: ResolvedSwitchChildren = {
		thumb: null,
		startContent: null,
		endContent: null,
		extra: [],
	}

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) {
			if (child != null) resolved.extra.push(child)
			return
		}

		const displayName = getElementDisplayName(child.type)

		switch (displayName) {
			case DISPLAY_NAME.THUMB:
				resolved.thumb = child
				break
			case DISPLAY_NAME.START_CONTENT:
				resolved.startContent = child
				break
			case DISPLAY_NAME.END_CONTENT:
				resolved.endContent = child
				break
			default:
				resolved.extra.push(child)
		}
	})

	return resolved
}
