'use client'

import { cn } from '@/lib/cn'

import { usePressableFeedbackContext } from './pressable-feedback.context'
import type { PressableFeedbackHighlightProps } from './pressable-feedback.types'

export function PressableFeedbackHighlight({
	className,
	...props
}: PressableFeedbackHighlightProps) {
	const context = usePressableFeedbackContext('PressableFeedback.Highlight')

	return (
		<span
			aria-hidden
			data-slot="pressable-feedback-highlight"
			className={cn(
				'pointer-events-none absolute -inset-full rounded-[inherit] opacity-0 transition-opacity duration-200',
				'[background:radial-gradient(78%_120%_at_50%_50%,rgba(255_255_255/0.2)_0%,rgba(255_255_255/0.095)_31%,rgba(255_255_255/0.025)_58%,transparent_76%)]',
				'filter-[blur(0.25px)] mix-blend-plus-lighter',
				'transform-[translate3d(var(--pressable-feedback-x),var(--pressable-feedback-y),0)]',
				context.isActive && 'opacity-100',
				className,
			)}
			{...props}
		/>
	)
}
