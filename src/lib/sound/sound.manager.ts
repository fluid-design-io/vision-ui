import { usePreferencesStore } from '@/lib/preferences'
import { SOUNDS } from './sound.sources'
import { SoundSource } from './sound.types'

export interface PlaySoundEffectOptions {
	/** 0-1. Uses preferences `sound.volume` when omitted. */
	volume?: number
}

function clampVolume(volume: number) {
	if (!Number.isFinite(volume)) return 0
	return Math.min(Math.max(volume, 0), 1)
}

function resolveSource(source: SoundSource) {
	return typeof source === 'object' ? source.src : SOUNDS[source]
}

/**
 * Centralized owner of sound-effect playback. Owned by {@link SoundProvider} and
 * therefore alive for the lifetime of the app rather than any single component —
 * so a one-shot effect keeps playing even when the element that triggered it
 * unmounts (e.g. a `<Link>` that navigates away). Each `play` spins up a fresh
 * detached `HTMLAudioElement` that the manager keeps referenced until it ends.
 */
export class SoundManager {
	private activeEffects = new Set<HTMLAudioElement>()

	/** Play a fire-and-forget sound effect. Survives the caller unmounting. */
	play(source: SoundSource, options: PlaySoundEffectOptions = {}) {
		if (typeof Audio === 'undefined') return

		const prefs = usePreferencesStore.getState()
		if (!prefs.sound.enabled) return

		const volume = options.volume ?? prefs.sound.volume
		const audio = new Audio(resolveSource(source))
		audio.volume = clampVolume(volume)
		this.activeEffects.add(audio)

		const cleanup = () => {
			this.activeEffects.delete(audio)
			audio.removeEventListener('ended', cleanup)
			audio.removeEventListener('error', cleanup)
		}

		audio.addEventListener('ended', cleanup)
		audio.addEventListener('error', cleanup)
		void audio.play().catch(cleanup)
	}

	/** Stop and release every active effect. */
	dispose() {
		for (const audio of this.activeEffects) {
			audio.pause()
			audio.removeAttribute('src')
			audio.load()
		}
		this.activeEffects.clear()
	}
}

/**
 * App-wide singleton owned by {@link SoundProvider}. Exposed as a module
 * singleton so non-component call sites (e.g. list `renderItem` callbacks, where
 * hooks are not allowed) can share the same instance via `playSoundEffect`.
 * Component code should prefer the `useSoundEffect()` hook.
 */
export const soundManager = new SoundManager()
