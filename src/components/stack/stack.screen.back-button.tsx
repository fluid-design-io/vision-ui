'use client'

import * as React from 'react'
import { cloneElement, isValidElement, useId, useLayoutEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/cn'
import { DISPLAY_NAME } from './stack.constants'
import { nextSeq, useStackChrome } from './stack.context'
import type { StackScreenBackButtonProps } from './stack.types'

export function StackScreenBackButton({
	asChild,
	hidden,
	onPress,
	className,
	children,
	disabled,
	type = 'button',
}: StackScreenBackButtonProps) {
	const chrome = useStackChrome()
	const owner = useId()
	const router = useRouter()

	useLayoutEffect(() => {
		if (hidden) {
			chrome.registerBackButton(owner, nextSeq(), null)
			return () => chrome.clearOwner(owner)
		}

		const seq = nextSeq()
		const goBack = () => {
			if (onPress) onPress()
			else router.history.back()
		}

		const node =
			asChild && isValidElement(children)
				? cloneElement(children as React.ReactElement<{ onClick?: () => void; className?: string }>, {
						onClick: () => {
							;(children.props as { onClick?: () => void }).onClick?.()
							goBack()
						},
						className: cn(className, (children.props as { className?: string }).className),
					})
				: (
						<button
							type={type}
							disabled={disabled}
							className={cn(
								'rounded-lg px-2 py-1 text-sm text-white/90 hover:bg-white/10 disabled:opacity-40',
								className,
							)}
							onClick={goBack}
						>
							{children ?? 'Back'}
						</button>
					)

		chrome.registerBackButton(owner, seq, node)
		return () => chrome.clearOwner(owner)
	}, [asChild, children, chrome, className, disabled, hidden, onPress, owner, router, type])

	return null
}

StackScreenBackButton.displayName = DISPLAY_NAME.BACK_BUTTON
