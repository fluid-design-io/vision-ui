import { Button } from '@/components/button'
import { ProgressiveBlur } from '@/components/progressive-blur'
import { Stack } from '@/components/stack'
import { StackRegularHeaderTitle } from '@/components/stack/header/header.title.regular'
import { Surface } from '@/components/surface'
import { Window } from '@/components/window'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { User2 } from 'lucide-react'

export const Route = createFileRoute('/(environment)/(apps)/app-store/')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()

	return (
		<Window
			className="w-full max-w-5xl mx-auto h-full max-h-[max(300px,70dvh)] [--stack-header-min:4rem]"
			onClose={() => navigate({ to: '/' })}
		>
			<Stack
				className="h-full w-full min-h-0 max-h-[max(300px,70dvh)]"
				render={<Surface thickness="thick" />}
			>
				<Stack.Toolbar placement="topBarLeading">
					<StackRegularHeaderTitle className="text-xl">Apps & Games</StackRegularHeaderTitle>
				</Stack.Toolbar>
				<Stack.Toolbar placement="topBarTrailing">
					<Stack.Toolbar.Button icon={<User2 className="size-6" />} />
				</Stack.Toolbar>
				<Stack.Screen>
					<Stack.Header.Slot className="ps-8 pe-5" />
					<div className="absolute inset-0 isolate">
						<img
							src="https://is1-ssl.mzstatic.com/image/thumb/Features/v4/ea/58/74/ea587472-55ae-147e-6450-483d8614218a/4244e26e-bb9a-4d03-a325-78ace5a9f286.png/2400x1350sr.webp"
							decoding="async"
							className="absolute inset-0 object-cover object-[85%_top]"
						/>
						<div className="absolute left-0 inset-y-0 w-[50%] bg-linear-to-r from-black/50 to-transparent" />
						<ProgressiveBlur
							position="bottom"
							height="35%"
							backgroundColor="rgba(0, 0, 0, 0.5)"
							blurAmount="16px"
						/>
						<div className="size-full relative pt-(--stack-header-min,4rem) pb-14 grid sm:grid-cols-[minmax(240px,320px)_auto] px-14 place-items-center">
							<div className="flex flex-col gap-4 items-start">
								<span className="text-sm text-foreground uppercase tracking-wide">
									What to watch
								</span>
								<h1 className="text-3xl font-bold text-foreground">
									Stream the 2026 Formula 1™ season
								</h1>
								<Button className="backdrop-blur-sm rounded-full">Read More</Button>
							</div>
						</div>
					</div>
				</Stack.Screen>
			</Stack>
		</Window>
	)
}
