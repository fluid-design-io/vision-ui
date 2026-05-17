import { BrowserCompatibilityBanner } from '@/components/browser-compatibility-banner'
import { Cursor } from '@/components/cursor'
import Environment from '@/components/environment'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Cursor>
			<Cursor.Pointer />
			<Environment>
				<BrowserCompatibilityBanner />
				<Outlet />
			</Environment>
		</Cursor>
	)
}
