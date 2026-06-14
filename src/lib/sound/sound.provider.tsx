'use client'

import { usePreferencesStore } from '@/lib/preferences'
import * as React from 'react'

import { SoundManager, soundManager } from './sound.manager'

const SoundContext = React.createContext<SoundManager | null>(null)

/**
 * Owns sound-effect playback for the whole app. Mount once near the root so
 * effects survive the components that trigger them (navigation, list churn,
 * etc.). Reads playback preferences from the preferences store at play time.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
	const soundEnabled = usePreferencesStore((state) => state.sound.enabled)

	// Release anything currently playing when the user turns sound off.
	React.useEffect(() => {
		if (!soundEnabled) soundManager.dispose()
	}, [soundEnabled])

	// Release any in-flight effects on teardown.
	React.useEffect(() => () => soundManager.dispose(), [])

	return <SoundContext value={soundManager}>{children}</SoundContext>
}

SoundProvider.displayName = 'SoundProvider'

export function useSoundManager(): SoundManager {
	const manager = React.use(SoundContext)

	if (!manager) {
		throw new Error('useSoundManager must be used within <SoundProvider>.')
	}

	return manager
}
