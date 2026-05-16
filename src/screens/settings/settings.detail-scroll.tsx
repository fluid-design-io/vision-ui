import { ScrollView } from '@/components/scrollview'
import { Stack } from '@/components/stack'
import { useStackChromeSnapshot } from '@/components/stack/stack.context'
import { cn } from '@/lib/cn'
import { Outlet } from '@tanstack/react-router'

export function SettingsDetailScrollView() {
	const snapshot = useStackChromeSnapshot()
	return (
		<ScrollView.Root className="h-full">
			<Stack.Header.Slot />
			<ScrollView.Viewport
				className={cn(
					'px-5 pb-12 mx-auto max-w-xl',
					'mask-[linear-gradient(to_bottom,transparent_1rem,black_var(--stack-header-min,5rem),black_calc(100%-1.5rem),transparent)]',
					!snapshot.headerHidden && snapshot.titleDisplayMode === 'large'
						? 'pt-(--stack-header-min,6rem)'
						: 'pt-(--stack-header-min,5rem)',
				)}
			>
				<Outlet />
			</ScrollView.Viewport>
			<ScrollView.ScrollIndicator orientation="vertical">
				<ScrollView.ScrollIndicator.Thumb />
			</ScrollView.ScrollIndicator>
		</ScrollView.Root>
	)
}
