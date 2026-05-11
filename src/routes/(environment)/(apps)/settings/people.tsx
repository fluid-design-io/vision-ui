import { Stack } from '@/components/stack'
import { SettingsPlaceholderScreen } from '@/screens/settings/settings-placeholder.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/settings/people')({
	component: SettingsPeopleRoute,
})

function SettingsPeopleRoute() {
	return (
		<>
			<Stack.Title>People</Stack.Title>
			<SettingsPlaceholderScreen title="People" />
		</>
	)
}
