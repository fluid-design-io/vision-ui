import { SettingsLayout } from '@/screens/settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/settings')({
	component: SettingsLayout,
})
