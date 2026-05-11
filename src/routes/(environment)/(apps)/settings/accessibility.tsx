import { Stack } from '@/components/stack'
import { SettingsPlaceholderScreen } from '@/screens/settings/settings-placeholder.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/settings/accessibility')({
	component: SettingsAccessibilityRoute,
})

function SettingsAccessibilityRoute() {
	return (
		<>
			<Stack.Title>Accessibility</Stack.Title>
			<SettingsPlaceholderScreen title="Accessibility" />
		</>
	)
}
