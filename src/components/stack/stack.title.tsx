'use client'

import * as React from 'react'
import { isValidElement, useId, useLayoutEffect, useMemo } from 'react'
import { mergeSlotProps } from '@/lib/slot'
import { DISPLAY_NAME } from './stack.constants'
import { nextSeq, useStackChrome } from './stack.context'
import type { StackTitleProps } from './stack.types'

export function StackTitle({
	asChild,
	displayMode = 'automatic',
	className,
	style,
	children,
}: StackTitleProps) {
	const chrome = useStackChrome()
	const owner = useId()

	const titleNode = useMemo(() => {
		if (children == null) return null
		if (asChild && isValidElement(children)) {
			return mergeSlotProps(children as React.ReactElement<Record<string, unknown>>, {
				className,
				style,
			} as Record<string, unknown>)
		}
		if (typeof children === 'string' || typeof children === 'number') {
			return (
				<span className={className} style={style}>
					{children}
				</span>
			)
		}
		return <span className={className ?? undefined}>{children}</span>
	}, [asChild, children, className, style])

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
