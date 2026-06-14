'use client'

import { cn } from '@/lib/cn'
import { useSoundEffect } from '@/lib/sound/sound.hooks'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ChevronRight } from 'lucide-react'
import type {
	ListGroupItemContentProps,
	ListGroupItemDescriptionProps,
	ListGroupItemPrefixProps,
	ListGroupItemProps,
	ListGroupItemSuffixProps,
	ListGroupItemTitleProps,
	ListGroupRootProps,
	ListGroupRootState,
	ListGroupSeparatorProps,
} from './list-group.types'

const VARIANT_CLASS: Record<NonNullable<ListGroupRootProps['variant']>, string> = {
	default:
		'rounded-[var(--list-group-radius,1.875rem)] bg-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]',
	secondary: 'rounded-[var(--list-group-radius,1.875rem)] border border-white/10 bg-white/[0.05]',
	tertiary: 'rounded-[var(--list-group-radius,1.875rem)] border border-white/8 bg-black/25',
	transparent: 'rounded-[var(--list-group-radius,1.875rem)] border-transparent bg-transparent',
}

function ListGroupRoot({
	variant = 'default',
	render,
	className,
	children,
	...props
}: ListGroupRootProps) {
	const state: ListGroupRootState = { variant }

	return useRender<ListGroupRootState, HTMLDivElement>({
		defaultTagName: 'div',
		render,
		state,
		props: {
			...mergeProps<'div'>(
				{
					className: cn('overflow-hidden', VARIANT_CLASS[variant], className),
					children,
				},
				props,
			),
			'data-slot': 'list-group-root',
			'data-variant': variant,
		},
	})
}

function ListGroupItem({
	render,
	className,
	type = 'button',
	children,
	disabled,
	isSoundDisabled,
	onMouseUp,
	...props
}: ListGroupItemProps) {
	// Play sound on click
	const playSound = useSoundEffect()
	const state = { disabled: Boolean(disabled) }

	return useRender<typeof state, HTMLButtonElement>({
		defaultTagName: 'button',
		render,
		state,
		props: {
			...mergeProps<'button'>(
				{
					type,
					disabled,
					className: cn(
						'flex w-full items-center gap-3 pl-5 pr-3.5 py-3.25 text-left transition-colors',
						'hover:bg-white/6 active:bg-white/9',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
						className,
					),
					onMouseUp: (e) =>
						onMouseUp?.(e) ?? (!isSoundDisabled && !disabled && playSound('gridSelect')),
					children,
				},
				props,
			),
			'data-slot': 'list-group-item',
			'data-disabled': disabled ? '' : undefined,
		},
	})
}

function ListGroupItemPrefix({ render, className, children, ...props }: ListGroupItemPrefixProps) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: {
			...mergeProps<'div'>(
				{
					className: cn('flex size-9 shrink-0 items-center justify-center', className),
					children,
				},
				props,
			),
			'data-slot': 'list-group-item-prefix',
		},
	})
}

function ListGroupItemContent({
	render,
	className,
	children,
	...props
}: ListGroupItemContentProps) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: {
			...mergeProps<'div'>(
				{
					className: cn('min-w-0 flex-1', className),
					children,
				},
				props,
			),
			'data-slot': 'list-group-item-content',
		},
	})
}

function ListGroupItemTitle({ render, className, children, ...props }: ListGroupItemTitleProps) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: {
			...mergeProps<'div'>(
				{
					className: cn('text-[15px] font-medium leading-snug text-white/95', className),
					children,
				},
				props,
			),
			'data-slot': 'list-group-item-title',
		},
	})
}

function ListGroupItemDescription({
	render,
	className,
	children,
	...props
}: ListGroupItemDescriptionProps) {
	return useRender({
		defaultTagName: 'p',
		render,
		props: {
			...mergeProps<'p'>(
				{
					className: cn('mt-0.5 text-sm leading-snug text-white/45', className),
					children,
				},
				props,
			),
			'data-slot': 'list-group-item-description',
		},
	})
}

function ListGroupItemSuffix({
	children,
	className,
	iconProps,
	render,
	...props
}: ListGroupItemSuffixProps) {
	const size = iconProps?.size ?? 24
	return useRender({
		defaultTagName: 'span',
		render,
		props: {
			...mergeProps<'span'>(
				{
					className: cn('flex shrink-0 items-center justify-center text-white/35', className),
					children: children ?? (
						<ChevronRight
							size={size}
							strokeWidth={2}
							className={cn(iconProps?.className)}
							aria-hidden
						/>
					),
				},
				props,
			),
			'data-slot': 'list-group-item-suffix',
		},
	})
}

function ListGroupSeparator({ render, className, ...props }: ListGroupSeparatorProps) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: {
			...mergeProps<'div'>(
				{
					role: 'separator',
					className: cn('h-px bg-white/10', className),
				},
				props,
			),
			'data-slot': 'list-group-separator',
		},
	})
}

export const ListGroup = Object.assign(ListGroupRoot, {
	Item: ListGroupItem,
	ItemPrefix: ListGroupItemPrefix,
	ItemContent: ListGroupItemContent,
	ItemTitle: ListGroupItemTitle,
	ItemDescription: ListGroupItemDescription,
	ItemSuffix: ListGroupItemSuffix,
	Separator: ListGroupSeparator,
})
