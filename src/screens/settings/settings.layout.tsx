import { NavigationSplitView } from '@/components/navigation-split-view'
import { Stack } from '@/components/stack'
import { SettingsDetailScrollView } from './settings.detail-scroll'
import { SettingsSidebar } from './settings.sidebar'

export function SettingsLayout() {
	return (
		<NavigationSplitView
			columnVisibility="all"
			sidebarWidth={292}
			className="mx-auto w-full h-full flex min-h-0 max-w-5xl max-h-[max(300px,65dvh)] overflow-hidden"
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
	)
}
