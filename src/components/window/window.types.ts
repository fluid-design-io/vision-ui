import type * as React from 'react'

export interface WindowOwnProps {
	/**
	 * Forwarded to the default `WindowControl` close button. Ignored when you
	 * provide your own `WindowControl` as a child.
	 */
	onClose?: () => void
}

export interface WindowRootProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
		WindowOwnProps {
	children?: React.ReactNode
}

export type WindowProps = WindowRootProps
