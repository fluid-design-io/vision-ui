import type { UseRenderRenderProp } from '@base-ui/react/use-render'
import type * as React from 'react'

export type ListGroupVariant = 'default' | 'secondary' | 'tertiary' | 'transparent'

export interface ListGroupRootState extends Record<string, unknown> {
	variant: ListGroupVariant
}

export interface ListGroupItemState extends Record<string, unknown> {
	disabled: boolean
}

export interface ListGroupRootProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: ListGroupVariant
	render?: UseRenderRenderProp<ListGroupRootState>
}

export interface ListGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: UseRenderRenderProp<ListGroupItemState>
	/**
	 * When true, the item will not play a sound when clicked.
	 */
	isSoundDisabled?: boolean
}

export interface ListGroupItemPrefixProps extends React.HTMLAttributes<HTMLDivElement> {
	render?: UseRenderRenderProp
}

export interface ListGroupItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
	render?: UseRenderRenderProp
}

export interface ListGroupItemTitleProps extends React.HTMLAttributes<HTMLDivElement> {
	render?: UseRenderRenderProp
}

export interface ListGroupItemDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
	render?: UseRenderRenderProp
}

export interface ListGroupIconProps {
	size?: number
	className?: string
}

export interface ListGroupItemSuffixProps extends React.HTMLAttributes<HTMLSpanElement> {
	render?: UseRenderRenderProp
	iconProps?: ListGroupIconProps
}

export interface ListGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	render?: UseRenderRenderProp
}
