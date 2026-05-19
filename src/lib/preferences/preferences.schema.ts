export type UserPreferences = {
	environment: {
		id: string | null
	}
	sound: {
		enabled: boolean
		volume: number
	}
}

/** The default preferences for the user, stored in the local storage */
export const DEFAULT_PREFERENCES: UserPreferences = {
	environment: { id: null },
	sound: { enabled: true, volume: 0.5 },
}
