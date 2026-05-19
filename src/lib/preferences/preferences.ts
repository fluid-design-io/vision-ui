import type { Environment } from '@/components/environment/environment.types'
import environmentData from '@/components/environment/environment.data'
import { eq, useLiveQuery } from '@tanstack/react-db'
import { useEffect } from 'react'
import {
	ensureDefaultPreferences,
	getPreferencesSnapshot,
	updatePreferences,
	userPreferencesCollection,
} from './preferences.collection'
import { DEFAULT_PREFERENCES, PREFERENCES_ID, type UserPreferences } from './preferences.schema'

const environmentsById = new Map(environmentData.map((environment) => [environment.id, environment]))

export function usePreferences(): UserPreferences {
	const { data } = useLiveQuery((q) =>
		q
			.from({ pref: userPreferencesCollection })
			.where(({ pref }) => eq(pref.id, PREFERENCES_ID)),
	)

	useEffect(() => {
		ensureDefaultPreferences()
	}, [])

	return data[0] ?? DEFAULT_PREFERENCES
}

export function useEnvironment(): Environment | null {
	const { environmentId } = usePreferences()
	if (!environmentId) return null
	return environmentsById.get(environmentId) ?? null
}

export function getPreferences(): UserPreferences {
	return getPreferencesSnapshot()
}

export function setEnvironmentId(id: string | null) {
	updatePreferences((draft) => {
		draft.environmentId = id
	})
}

export function setSoundEnabled(enabled: boolean) {
	updatePreferences((draft) => {
		draft.soundEnabled = enabled
	})
}

export function setSoundVolume(volume: number) {
	updatePreferences((draft) => {
		draft.soundVolume = volume
	})
}
