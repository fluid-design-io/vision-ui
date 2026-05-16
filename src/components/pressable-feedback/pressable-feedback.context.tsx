'use client'

import * as React from 'react'

type PressableFeedbackContextValue = {
	disabled: boolean
	xOffset: number
	yOffset: number
	isActive: boolean
	isPressed: boolean
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>
	setIsPressed: React.Dispatch<React.SetStateAction<boolean>>
	setTarget: (node: HTMLElement | null) => void
	updatePosition: (event: React.MouseEvent<HTMLElement>) => void
}

export const PressableFeedbackContext =
	React.createContext<PressableFeedbackContextValue | null>(null)

export function usePressableFeedbackContext(component: string) {
	const context = React.use(PressableFeedbackContext)

	if (!context) {
		throw new Error(`${component} must be used within <PressableFeedback>.`)
	}

	return context
}
