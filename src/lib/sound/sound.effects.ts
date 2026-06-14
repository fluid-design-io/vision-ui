import { soundManager } from './sound.manager'
import { SoundSource } from './sound.types'

/**
 * Fire-and-forget sound effect for non-component call sites — e.g. list
 * `renderItem` callbacks, where React hooks are not allowed. Delegates to the
 * app-wide {@link soundManager} (owned by `SoundProvider`), so playback is
 * centralized and survives the triggering element unmounting.
 *
 * Inside components, prefer the `useSoundEffect()` hook.
 */
export function playSoundEffect(source: SoundSource, volume?: number) {
	soundManager.play(source, { volume })
}
