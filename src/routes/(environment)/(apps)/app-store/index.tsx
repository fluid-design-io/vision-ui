import { AppsAndGamesScreen } from '@/screens/app-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/app-store/')({
	component: AppsAndGamesScreen,
})
