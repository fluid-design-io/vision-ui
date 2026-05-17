import type * as React from 'react'

export type OrnamentOrientation = 'vertical' | 'horizontal'

export interface OrnamentRootOwnProps {
	/**
	 * Layout direction of the ornament rail.
	 * @default "vertical"
	 */
	orientation?: OrnamentOrientation
}

export interface OrnamentRootProps extends OrnamentRootOwnProps {
	className?: string
	children: React.ReactNode
}

export interface OrnamentTabsProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

export interface OrnamentTabOwnProps {
	/** Whether the tab represents the currently selected route. */
	isActive?: boolean
}

export interface OrnamentTabProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, OrnamentTabOwnProps {
	children: React.ReactNode
}

export interface OrnamentTabIconOwnProps {
	/** Leading icon node. Child icons should set `data-slot="icon"` for built-in size rules. */
	icon: React.ReactNode
}

export interface OrnamentTabIconProps
	extends React.HTMLAttributes<HTMLDivElement>, OrnamentTabIconOwnProps {}

export interface OrnamentTabLabelProps {
	children: React.ReactNode | string
}

export interface OrnamentContextValue {
	/** Layout direction of the ornament rail. */
	orientation: OrnamentOrientation
	/** Whether any tab inside the rail currently has keyboard focus. */
	isFocused: boolean
	setIsFocused: (isFocused: boolean) => void
	/** Whether any tab inside the rail is currently being pressed. */
	isPressed: boolean
	setIsPressed: (isPressed: boolean) => void
}
