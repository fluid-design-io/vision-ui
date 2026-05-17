import { Button } from '@/components/button'
import { Cursor } from '@/components/cursor'
import { PressableFeedback } from '@/components/pressable-feedback'
import { Stack } from '@/components/stack'
import { Surface } from '@/components/surface'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

export const Route = createFileRoute('/(environment)/(apps)/app-store/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Surface thickness="thick" className="mx-auto w-full h-full max-w-5xl max-h-[max(300px,65dvh)]">
			<Stack>
				<Stack.Title>App Store</Stack.Title>
				<Stack.Header.Slot />
				<div className="pt-(--stack-header-min,5rem) px-5 flex gap-8">
					<Cursor.Snap>
						<Cursor.SnapTarget>
							<PressableFeedback render={<Button />}>
								<PressableFeedback.Highlight />
								<Cursor.SnapTarget factor={0.2}>
									<span className="z-1 text-sm font-medium text-foreground">Test</span>
								</Cursor.SnapTarget>
							</PressableFeedback>
						</Cursor.SnapTarget>
					</Cursor.Snap>
					<Cursor.Snap>
						<Cursor.SnapTarget>
							<PressableFeedback render={<Button size="icon" />}>
								<PressableFeedback.Highlight />
								<Cursor.SnapTarget factor={0.2}>
									<PlusIcon />
								</Cursor.SnapTarget>
							</PressableFeedback>
						</Cursor.SnapTarget>
					</Cursor.Snap>
				</div>
			</Stack>
		</Surface>
	)
}
