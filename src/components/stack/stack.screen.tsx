'use client'

import * as React from 'react'
import { useMatchRoute } from '@tanstack/react-router'
import { DISPLAY_NAME } from './stack.constants'
import type { StackScreenProps } from './stack.types'

export function StackScreen({ to, children }: StackScreenProps) {
	const matchRoute = useMatchRoute()
	const matches = to ? Boolean(matchRoute({ to: to as never })) : true

	if (!matches) return null
	return <>{children}</>
}

StackScreen.displayName = DISPLAY_NAME.SCREEN
