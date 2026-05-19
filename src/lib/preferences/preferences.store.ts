import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { DEFAULT_PREFERENCES, type UserPreferences } from './preferences.schema'

export const usePreferencesStore = create<UserPreferences>()(
	persist(
		immer(() => DEFAULT_PREFERENCES),
		{
			name: 'vision-ui:prefs',
			storage: createJSONStorage(() => localStorage),
			skipHydration: true,
			version: 1,
		},
	),
)
