import { Stack } from '@/components/stack'
import { SettingsPlaceholderScreen } from '@/screens/settings/settings-placeholder.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/settings/appearance')({
	component: SettingsAppearanceRoute,
})

function SettingsAppearanceRoute() {
	return (
		<>
			<Stack.Title displayMode="large">Appearance</Stack.Title>
			<SettingsPlaceholderScreen title="Appearance" />
		</>
	)
}
