import type { Environment } from '@/components/environment/environment.types'
import environmentData from '@/components/environment/environment.data'
import { usePreferencesStore } from './preferences.store'
import type { UserPreferences } from './preferences.schema'

const environmentsById = new Map(environmentData.map((environment) => [environment.id, environment]))

export function useEnvironment(): Environment | null {
	const environmentId = usePreferencesStore((state) => state.environment.id)
	if (!environmentId) return null
	return environmentsById.get(environmentId) ?? null
}

export function getPreferences(): UserPreferences {
	return usePreferencesStore.getState()
}

export function setEnvironmentId(id: string | null) {
	usePreferencesStore.setState((state) => {
		state.environment.id = id
	})
}

export function setSound(sound: Partial<UserPreferences['sound']>) {
	usePreferencesStore.setState((state) => {
		Object.assign(state.sound, sound)
	})
}
