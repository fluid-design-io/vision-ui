import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div data-slot="apps-root">
			<Outlet />
		</div>
	)
}
