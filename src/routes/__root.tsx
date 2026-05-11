import Environment from '@/components/environment'
import appCss from '@/styles/app.css?url'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'Vision UI',
			},
			{
				name: 'description',
				content: 'VisionOS UI built with React ⚛️',
			},
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{
				rel: 'icon',
				href: '/icon.png',
			},
		],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<html suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="flex flex-col min-h-screen">
				<RootProvider>
					<Environment>
						<Outlet />
					</Environment>
				</RootProvider>
				<Scripts />
			</body>
		</html>
	)
}
