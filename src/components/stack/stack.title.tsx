'use client'

import { useRender } from '@base-ui/react/use-render'
import { useId, useLayoutEffect, useMemo } from 'react'

import { DISPLAY_NAME } from './stack.constants'
import { nextSeq, useStackChrome } from './stack.context'
import type { StackTitleProps } from './stack.types'

export function StackTitle({
	render,
	displayMode = 'automatic',
	className,
	style,
	children,
}: StackTitleProps) {
	const chrome = useStackChrome()
	const owner = useId()

	const renderedNode = useRender({
		defaultTagName: 'span',
		render,
		props: { className, style, children, 'data-slot': 'stack-title' },
		enabled: children != null,
	})

	const titleNode = useMemo<React.ReactNode>(
		() => renderedNode,
		// `useRender` produces a fresh element every render even when inputs are
		// stable, so we re-anchor the chrome registry only when the inputs change.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[render, className, style, children],
	)

	useLayoutEffect(() => {
		const seq = nextSeq()
		chrome.registerTitle(owner, seq, titleNode)
		chrome.registerTitleDisplayMode(owner, seq, displayMode)
		return () => {
			chrome.clearOwner(owner)
		}
	}, [chrome, owner, titleNode, displayMode])

	return null
}

StackTitle.displayName = DISPLAY_NAME.TITLE
