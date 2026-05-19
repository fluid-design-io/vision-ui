import { z } from 'zod'

export const userPreferencesSchema = z.object({
	environment: z.object({
		id: z.string().nullable(),
	}),
	sound: z.object({
		enabled: z.boolean(),
		volume: z.number().min(0).max(1),
	}),
})

export type UserPreferences = z.infer<typeof userPreferencesSchema>

export const DEFAULT_PREFERENCES: UserPreferences = {
	environment: { id: null },
	sound: { enabled: true, volume: 0.5 },
}
