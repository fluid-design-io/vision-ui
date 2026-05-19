import { z } from 'zod'

export const PREFERENCES_ID = 'default' as const

export const userPreferencesSchema = z.object({
	id: z.literal(PREFERENCES_ID),
	soundEnabled: z.boolean(),
	soundVolume: z.number().min(0).max(1),
	environmentId: z.string().nullable(),
})

export type UserPreferences = z.infer<typeof userPreferencesSchema>

export const DEFAULT_PREFERENCES: UserPreferences = {
	id: PREFERENCES_ID,
	soundEnabled: true,
	soundVolume: 0.5,
	environmentId: null,
}
