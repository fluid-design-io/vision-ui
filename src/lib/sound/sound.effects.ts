import { soundEnabledAtom, soundVolumeAtom } from './sound.atoms'
import { SOUNDS } from './sound.sources'
import { SoundSource } from './sound.types'

const activeEffects = new Set<HTMLAudioElement>()

export function playSoundEffect(source: SoundSource, volume = soundVolumeAtom.get()) {
	if (!soundEnabledAtom.get() || typeof Audio === 'undefined') return

	const src = typeof source === 'object' ? source.src : SOUNDS[source]
	const audio = new Audio(src)
	audio.volume = clampVolume(volume)
	activeEffects.add(audio)

	const cleanup = () => {
		activeEffects.delete(audio)
		audio.removeEventListener('ended', cleanup)
		audio.removeEventListener('error', cleanup)
	}

	audio.addEventListener('ended', cleanup)
	audio.addEventListener('error', cleanup)
	void audio.play().catch(cleanup)
}

function clampVolume(volume: number) {
	if (!Number.isFinite(volume)) return 0
	return Math.min(Math.max(volume, 0), 1)
}
