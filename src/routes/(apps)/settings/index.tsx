import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/settings/')({
	beforeLoad: () => {
		throw redirect({
			to: '/settings/general',
			replace: true,
		})
	},
})
