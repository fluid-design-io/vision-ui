import { Button } from '@/components/button'
import { Stack } from '@/components/stack'
import { Surface } from '@/components/surface'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/app-store/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Surface thickness="thick" className="mx-auto w-full h-full max-w-5xl max-h-[max(300px,65dvh)]">
			<Stack>
				<Stack.Title>App Store</Stack.Title>
				<Stack.Header.Slot />
				<div>
					<Button cursorSnap>Test</Button>
				</div>
			</Stack>
		</Surface>
	)
}
