import { Stack } from '@/components/stack'
import { SettingsGeneralScreen } from '@/screens/settings/settings-general.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/settings/general')({
	component: SettingsGeneralRoute,
})

function SettingsGeneralRoute() {
	return (
		<>
			<Stack.Title>General</Stack.Title>
			<SettingsGeneralScreen />
		</>
	)
}
