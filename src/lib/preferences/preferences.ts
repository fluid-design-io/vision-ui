import type { Environment } from '@/components/environment/environment.types'
import environmentData from '@/components/environment/environment.data'
import { usePreferencesStore } from './preferences.store'

const environmentsById = new Map(
	environmentData.map((environment) => [environment.id, environment]),
)

export function useEnvironment(): Environment | null {
	const environmentId = usePreferencesStore((state) => state.environment.id)
	if (!environmentId) return null
	return environmentsById.get(environmentId) ?? null
}
