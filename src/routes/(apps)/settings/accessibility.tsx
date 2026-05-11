import { Stack } from '@/components/stack'
import { SettingsPlaceholderScreen } from '@/screens/settings/settings-placeholder.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/settings/accessibility')({
	component: SettingsAccessibilityRoute,
})

function SettingsAccessibilityRoute() {
	return (
		<>
			<Stack.Title displayMode="large">Accessibility</Stack.Title>
			<SettingsPlaceholderScreen title="Accessibility" />
		</>
	)
}
