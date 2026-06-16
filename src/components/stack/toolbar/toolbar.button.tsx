'use client'

import { Button } from '@/components/button'
import { Cursor } from '@/components/cursor'
import { PressableFeedback } from '@/components/pressable-feedback'
import { TOOLBAR_DISPLAY_NAME } from './toolbar.constants'
import { useToolbarPlacement } from './toolbar.context'
import type { ToolbarButtonProps } from './toolbar.types'

export function ToolbarButton({
	icon,
	children,
	onPress,
	hidden,
	disabled,
	tintColor,
	className,
	type = 'button',
	...rest
}: ToolbarButtonProps) {
	const ctx = useToolbarPlacement()
	const color = tintColor ?? ctx.tintColor

	if (hidden) return null

	return (
		<Cursor.Snap>
			<Cursor.SnapTarget>
				<PressableFeedback render={<Button size="icon" />}>
					<PressableFeedback.Highlight />
					<PressableFeedback.Scale />
					<Cursor.SnapTarget factor={0.2}>{icon ?? children}</Cursor.SnapTarget>
				</PressableFeedback>
			</Cursor.SnapTarget>
		</Cursor.Snap>
	)
}

ToolbarButton.displayName = TOOLBAR_DISPLAY_NAME.BUTTON
