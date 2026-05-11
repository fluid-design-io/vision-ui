import type * as React from 'react'

export type ListGroupVariant = 'default' | 'secondary' | 'tertiary' | 'transparent'

export interface ListGroupRootProps {
	variant?: ListGroupVariant
	className?: string
	children?: React.ReactNode
}

export interface ListGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ListGroupItemPrefixProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ListGroupItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ListGroupItemTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ListGroupItemDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface ListGroupIconProps {
	size?: number
	className?: string
}

export interface ListGroupItemSuffixProps extends React.HTMLAttributes<HTMLSpanElement> {
	iconProps?: ListGroupIconProps
}

export interface ListGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
