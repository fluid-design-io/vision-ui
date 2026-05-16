import { useSelector } from '@tanstack/react-store'
import { useEffect, useRef, useState } from 'react'
import { soundEnabledAtom, soundVolumeAtom } from './sound.atoms'
import { SOUNDS } from './sound.sources'
import { SoundSource, UseSoundControls, UseSoundOptions } from './sound.types'

function disposeAudio(el: HTMLAudioElement) {
	el.pause()
	el.removeAttribute('src')
	el.load()
}

export function useSound(source: SoundSource, options: UseSoundOptions = {}): UseSoundControls {
	const { loop = false, volume: volumeOverride, autoplay = false, manualVolume = false } = options
	const enabled = useSelector(soundEnabledAtom)
	const globalVolume = useSelector(soundVolumeAtom)
	/** Stable URL string for effect deps (avoids `{ src }` object identity churn). */
	const srcKey = typeof source === 'object' ? source.src : SOUNDS[source]
	const volume = volumeOverride ?? globalVolume

	const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
	const fadeFrameRef = useRef<number | null>(null)
	const volumeRef = useRef(volume)

	useEffect(() => {
		volumeRef.current = volume
	}, [volume])

	const cancelFade = () => {
		if (fadeFrameRef.current === null) return
		cancelAnimationFrame(fadeFrameRef.current)
		fadeFrameRef.current = null
	}

	useEffect(() => {
		if (!enabled) {
			setAudio((prev) => {
				if (prev) disposeAudio(prev)
				return null
			})
			return
		}

		const el = new Audio(srcKey)
		el.loop = loop
		el.volume = manualVolume ? 0 : clampVolume(volumeRef.current)
		setAudio(el)

		return () => {
			if (fadeFrameRef.current !== null) {
				cancelAnimationFrame(fadeFrameRef.current)
				fadeFrameRef.current = null
			}
			disposeAudio(el)
		}
	}, [enabled, srcKey, loop, manualVolume])

	useEffect(() => {
		if (!audio || manualVolume) return
		audio.volume = volume
	}, [audio, volume, manualVolume])

	const play = async () => {
		if (!audio) return
		await audio.play().catch(() => {})
	}

	const pause = () => {
		audio?.pause()
	}

	const stop = () => {
		if (!audio) return
		cancelFade()
		audio.pause()
		audio.currentTime = 0
	}

	const fade = (from: number, to: number, duration: number, id?: number) => {
		if (!audio) return Promise.resolve()

		cancelFade()

		const startVolume = clampVolume(from)
		const endVolume = clampVolume(to)
		const fadeDuration = Math.max(0, duration)

		audio.volume = startVolume

		if (fadeDuration === 0 || startVolume === endVolume) {
			audio.volume = endVolume
			audio.dispatchEvent(createFadeEvent(startVolume, endVolume, fadeDuration, id))
			return Promise.resolve()
		}

		return new Promise<void>((resolve) => {
			const startTime = performance.now()

			const tick = (time: number) => {
				const progress = Math.min((time - startTime) / fadeDuration, 1)
				audio.volume = startVolume + (endVolume - startVolume) * progress

				if (progress < 1) {
					fadeFrameRef.current = requestAnimationFrame(tick)
					return
				}

				fadeFrameRef.current = null
				audio.volume = endVolume
				audio.dispatchEvent(createFadeEvent(startVolume, endVolume, fadeDuration, id))
				resolve()
			}

			fadeFrameRef.current = requestAnimationFrame(tick)
		})
	}

	useEffect(() => {
		if (!audio || !autoplay) return
		void audio.play().catch(() => {})
	}, [audio, autoplay])

	return { audio, play, pause, stop, fade }
}

function clampVolume(volume: number) {
	if (!Number.isFinite(volume)) return 0
	return Math.min(Math.max(volume, 0), 1)
}

function createFadeEvent(from: number, to: number, duration: number, id?: number) {
	return new CustomEvent('fade', {
		detail: { from, to, duration, id },
	})
}
