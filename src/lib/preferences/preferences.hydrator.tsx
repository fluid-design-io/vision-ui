import { useEffect } from 'react'
import { usePreferencesStore } from './preferences.store'

export function PreferencesHydrator() {
	useEffect(() => {
		void usePreferencesStore.persist.rehydrate()
	}, [])
	return null
}
