import { NavigationSplitView } from '@/components/navigation-split-view'
import { Stack } from '@/components/stack'
import { Window } from '@/components/window'
import { useNavigate } from '@tanstack/react-router'
import { SettingsDetailScrollView } from './settings.detail-scroll'
import { SettingsSidebar } from './settings.sidebar'

export function SettingsLayout() {
	const navigate = useNavigate()
	return (
		<Window
			className="w-full h-full max-w-5xl mx-auto max-h-[max(300px,70dvh)] flex flex-col"
			onClose={() => navigate({ to: '/' })}
		>
			<NavigationSplitView
				columnVisibility="all"
				sidebarWidth={292}
				className="flex-1 w-full overflow-hidden"
			>
				<NavigationSplitView.Sidebar>
					<SettingsSidebar />
				</NavigationSplitView.Sidebar>
				<NavigationSplitView.Detail>
					<Stack>
						<SettingsDetailScrollView />
					</Stack>
				</NavigationSplitView.Detail>
			</NavigationSplitView>
		</Window>
	)
}
