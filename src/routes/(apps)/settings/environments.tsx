import { Stack } from '@/components/stack'
import { SettingsPlaceholderScreen } from '@/screens/settings/settings-placeholder.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/settings/environments')({
	component: SettingsEnvironmentsRoute,
})

function SettingsEnvironmentsRoute() {
	return (
		<>
			<Stack.Title>Environments</Stack.Title>
			<SettingsPlaceholderScreen title="Environments" />
		</>
	)
}
