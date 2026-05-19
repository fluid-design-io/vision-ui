import { SOUNDS } from './sound.sources'

export type SoundId = keyof typeof SOUNDS

export type SoundSource = SoundId | { src: string }

export interface UseSoundOptions {
	loop?: boolean
	/** 0-1. Uses user preferences `sound.volume` when omitted. */
	volume?: number
	/** When true, calls `play()` whenever a new `HTMLAudioElement` is ready. Default false. */
	autoplay?: boolean
	/**
	 * When true, skips binding preferences `sound.volume` (and `volume`) onto `audio.volume`.
	 * The caller is responsible for volume, e.g. home ambient with custom fades.
	 */
	manualVolume?: boolean
}

export interface UseSoundControls {
	audio: HTMLAudioElement | null
	play: () => Promise<void>
	pause: () => void
	/** Pause and seek to the start. */
	stop: () => void
	/**
	 * Fade the sound between two volumes over the given duration in milliseconds.
	 * `id` is accepted for Howler-compatible call sites but ignored by HTMLAudioElement.
	 */
	fade: (from: number, to: number, duration: number, id?: number) => Promise<void>
}
