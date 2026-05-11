'use client'

import { cn } from '@/lib/cn'
import { ChevronRight } from 'lucide-react'
import type {
	ListGroupItemContentProps,
	ListGroupItemDescriptionProps,
	ListGroupItemPrefixProps,
	ListGroupItemProps,
	ListGroupItemSuffixProps,
	ListGroupItemTitleProps,
	ListGroupRootProps,
	ListGroupSeparatorProps,
} from './list-group.types'

const VARIANT_CLASS: Record<NonNullable<ListGroupRootProps['variant']>, string> = {
	default:
		'rounded-[var(--list-group-radius,1rem)] bg-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]',
	secondary: 'rounded-[var(--list-group-radius,1rem)] border border-white/10 bg-white/[0.05]',
	tertiary: 'rounded-[var(--list-group-radius,1rem)] border border-white/8 bg-black/25',
	transparent: 'rounded-[var(--list-group-radius,1rem)] border-transparent bg-transparent',
}

function ListGroupRoot({ variant = 'default', className, children }: ListGroupRootProps) {
	return <div className={cn('overflow-hidden', VARIANT_CLASS[variant], className)}>{children}</div>
}

function ListGroupItem({ className, type = 'button', children, ...rest }: ListGroupItemProps) {
	return (
		<button
			type={type}
			className={cn(
				'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
				'hover:bg-white/[0.06] active:bg-white/[0.09]',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	)
}

function ListGroupItemPrefix({ className, children, ...rest }: ListGroupItemPrefixProps) {
	return (
		<div className={cn('flex size-9 shrink-0 items-center justify-center', className)} {...rest}>
			{children}
		</div>
	)
}

function ListGroupItemContent({ className, children, ...rest }: ListGroupItemContentProps) {
	return (
		<div className={cn('min-w-0 flex-1', className)} {...rest}>
			{children}
		</div>
	)
}

function ListGroupItemTitle({ className, children, ...rest }: ListGroupItemTitleProps) {
	return (
		<div className={cn('text-[15px] font-medium leading-snug text-white/95', className)} {...rest}>
			{children}
		</div>
	)
}

function ListGroupItemDescription({ className, children, ...rest }: ListGroupItemDescriptionProps) {
	return (
		<p className={cn('mt-0.5 text-sm leading-snug text-white/45', className)} {...rest}>
			{children}
		</p>
	)
}

function ListGroupItemSuffix({
	children,
	className,
	iconProps,
	...rest
}: ListGroupItemSuffixProps) {
	const size = iconProps?.size ?? 18
	return (
		<span
			className={cn('flex shrink-0 items-center justify-center text-white/35', className)}
			{...rest}
		>
			{children ?? (
				<ChevronRight
					size={size}
					strokeWidth={2}
					className={cn(iconProps?.className)}
					aria-hidden
				/>
			)}
		</span>
	)
}

function ListGroupSeparator({ className, ...rest }: ListGroupSeparatorProps) {
	return <div role="separator" className={cn('mx-4 h-px bg-white/10', className)} {...rest} />
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
