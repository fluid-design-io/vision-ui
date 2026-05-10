'use client'

import { Surface } from '@/components/surface'
import { cn } from '@/lib/cn'
import { DISPLAY_NAME, ORNAMENT_MOTION_VARIANTS } from './ornament.constants'
import { useOrnament } from './ornament.context'
import { ornamentClassNames, ornamentTabsContainer, ornamentTabsTrack } from './ornament.styles'
import type { OrnamentTabsProps } from './ornament.types'

export function OrnamentTabs({ className, children, ...props }: OrnamentTabsProps) {
	const { orientation, isFocused, setIsFocused, setIsPressed } = useOrnament()
	return (
		<div
			data-slot="ornament-tabs"
			className={cn(ornamentTabsContainer({ orientation }), className)}
			{...props}
		>
			<Surface
				variants={ORNAMENT_MOTION_VARIANTS}
				data-slot="ornament-tabs-surface"
				className={ornamentClassNames.tabsSurface}
				role="tablist"
				initial="collapsed"
				whileHover="expanded"
				whileFocus="expanded"
				whileTap="whileTap"
				animate={isFocused ? 'expanded' : 'collapsed'}
				onMouseOut={() => setIsFocused(false)}
				onMouseDown={() => setIsPressed(true)}
				onMouseUp={() => setIsPressed(false)}
				tabIndex={-1}
			>
				<div className={ornamentTabsTrack({ orientation })}>{children}</div>
			</Surface>
		</div>
	)
}

OrnamentTabs.displayName = DISPLAY_NAME.TABS
