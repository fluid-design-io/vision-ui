'use client'

import { cn } from '@/lib/cn'
import { useId, useLayoutEffect, useMemo } from 'react'
import { DISPLAY_NAME } from './stack.constants'
import { nextSeq, useStackChrome } from './stack.context'
import type { StackSearchBarProps } from './stack.types'

export function StackSearchBar({
	hidden,
	prompt,
	placement = 'automatic',
	onChangeText,
	text,
	className,
	disabled,
	readOnly,
	autoFocus,
	name,
	id,
}: StackSearchBarProps) {
	const chrome = useStackChrome()
	const owner = useId()

	const searchEl = useMemo(
		() => (
			<div
				className={cn('flex min-w-0 flex-1 items-center gap-2 px-2', className)}
				data-stack-search-placement={placement}
			>
				<input
					id={id}
					name={name}
					type="search"
					aria-label={prompt ?? 'Search'}
					placeholder={prompt}
					value={text}
					disabled={disabled}
					readOnly={readOnly}
					autoFocus={autoFocus}
					onChange={(e) => onChangeText?.(e.target.value)}
					className={cn(
						'min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm outline-none',
						'placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/20',
					)}
				/>
			</div>
		),
		[autoFocus, className, disabled, id, name, onChangeText, placement, prompt, readOnly, text],
	)

	useLayoutEffect(() => {
		if (hidden) {
			chrome.registerSearchBar(owner, nextSeq(), null)
			return () => chrome.clearOwner(owner)
		}
		chrome.registerSearchBar(owner, nextSeq(), searchEl)
		return () => chrome.clearOwner(owner)
	}, [chrome, hidden, owner, searchEl])

	return null
}

StackSearchBar.displayName = DISPLAY_NAME.SEARCH_BAR
