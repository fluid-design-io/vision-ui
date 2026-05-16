import { useMatchHomeRoute } from '@/screens/home/home.hooks'
import { useSelector } from '@tanstack/react-store'
import { useEffect } from 'react'
import { soundVolumeAtom } from './sound.atoms'
import { useSound } from './sound.hooks'

const AMBIENT_FADE_DURATION_MS = 1000

/** Play the ambient sound in the home route */
export function useAmbientSound() {
	const { audio, play, pause, fade } = useSound('homeAmbient', { loop: true, manualVolume: true })
	const { isHomeRoute } = useMatchHomeRoute()
	const volume = useSelector(soundVolumeAtom)

	useEffect(() => {
		if (!audio) return

		if (isHomeRoute) {
			const from = audio.paused ? 0 : audio.volume
			audio.volume = from
			void play().then(() => fade(from, volume, AMBIENT_FADE_DURATION_MS))
		} else {
			const from = audio.volume
			void fade(from, 0, AMBIENT_FADE_DURATION_MS).then(() => {
				pause()
			})
		}
	}, [audio, isHomeRoute, volume, play, pause, fade])
}
