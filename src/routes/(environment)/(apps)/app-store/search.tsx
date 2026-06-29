import { SearchScreen } from '@/screens/app-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(environment)/(apps)/app-store/search')({
	component: SearchScreen,
})
