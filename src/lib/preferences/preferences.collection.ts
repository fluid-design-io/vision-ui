import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import {
	DEFAULT_PREFERENCES,
	PREFERENCES_ID,
	userPreferencesSchema,
	type UserPreferences,
} from './preferences.schema'

export const userPreferencesCollection = createCollection(
	localStorageCollectionOptions({
		id: 'user-preferences',
		storageKey: 'vision-ui:prefs',
		getKey: (item) => item.id,
		schema: userPreferencesSchema,
	}),
)

export function ensureDefaultPreferences() {
	if (typeof window === 'undefined') return
	if (!userPreferencesCollection.has(PREFERENCES_ID)) {
		userPreferencesCollection.insert(DEFAULT_PREFERENCES)
	}
}

export function getPreferencesSnapshot(): UserPreferences {
	ensureDefaultPreferences()
	return userPreferencesCollection.get(PREFERENCES_ID) ?? DEFAULT_PREFERENCES
}

export function updatePreferences(updater: (draft: UserPreferences) => void) {
	ensureDefaultPreferences()
	userPreferencesCollection.update(PREFERENCES_ID, updater)
}
