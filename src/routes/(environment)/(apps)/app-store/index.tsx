import { Stack } from '@/components/stack'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/app-store/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Stack>
			<Stack.Title>App Store</Stack.Title>
			<Stack.Screen>To be implemented</Stack.Screen>
		</Stack>
	)
}
