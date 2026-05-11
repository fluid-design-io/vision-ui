import { Stack } from '@/components/stack'
import { SettingsPlaceholderScreen } from '@/screens/settings/settings-placeholder.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/settings/apps')({
	component: SettingsAppsRoute,
})

function SettingsAppsRoute() {
	return (
		<>
			<Stack.Title>Apps</Stack.Title>
			<SettingsPlaceholderScreen title="Apps" />
		</>
	)
}
