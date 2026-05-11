import { Stack } from '@/components/stack'
import { SettingsPlaceholderScreen } from '@/screens/settings/settings-placeholder.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/settings/people')({
	component: SettingsPeopleRoute,
})

function SettingsPeopleRoute() {
	return (
		<>
			<Stack.Title displayMode="large">People</Stack.Title>
			<SettingsPlaceholderScreen title="People" />
		</>
	)
}
