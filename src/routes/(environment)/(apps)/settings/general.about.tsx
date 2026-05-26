import { Stack } from '@/components/stack'
import { SettingsAboutScreen } from '@/screens/settings/settings-about.screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/settings/general/about')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Stack.Title>About</Stack.Title>
			<Stack.Screen.BackButton />
			<SettingsAboutScreen />
		</>
	)
}
