'use client'

import { useRender } from '@base-ui/react/use-render'
import { useRouter } from '@tanstack/react-router'
import { useCallback, useId, useLayoutEffect, useMemo } from 'react'

import { cn } from '@/lib/cn'

import { ChevronLeftIcon } from 'lucide-react'
import { buttonVariants } from '../button'
import { PressableFeedback } from '../pressable-feedback'
import { DISPLAY_NAME } from './stack.constants'
import { nextSeq, useStackChrome } from './stack.context'
import type { StackScreenBackButtonProps } from './stack.types'

export function StackScreenBackButton({
	render,
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

	const goBack = useCallback(() => {
		if (onPress) onPress()
		else router.history.back()
	}, [onPress, router])

	const renderedNode = useRender({
		defaultTagName: 'button',
		render: render ?? ((props) => <PressableFeedback {...props} />),
		props: {
			type,
			disabled,
			className: cn(buttonVariants({ variant: 'default', size: 'icon' }), className),
			onClick: goBack,
			children: children ?? <ChevronLeftIcon className="size-6" strokeWidth={2} />,
		},
		enabled: !hidden,
	})

	const node = useMemo<React.ReactNode>(
		() => renderedNode,
		// `useRender` produces a fresh element every render even when inputs are
		// stable, so we anchor the registry on the primitive deps.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[render, type, disabled, className, children, goBack, hidden],
	)

	useLayoutEffect(() => {
		const seq = nextSeq()
		chrome.registerBackButton(owner, seq, hidden ? null : node)
		return () => chrome.clearOwner(owner)
	}, [chrome, hidden, node, owner])

	return null
}

StackScreenBackButton.displayName = DISPLAY_NAME.BACK_BUTTON
