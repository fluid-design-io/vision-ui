import { useSyncExternalStore } from 'react'

type WindowSize = { width: number; height: number }

const serverSnapshot: WindowSize = { width: 0, height: 0 }

let cachedSnapshot: WindowSize = serverSnapshot

function getSnapshot(): WindowSize {
	const width = window.innerWidth
	const height = window.innerHeight
	if (cachedSnapshot.width === width && cachedSnapshot.height === height) {
		return cachedSnapshot
	}
	cachedSnapshot = { width, height }
	return cachedSnapshot
}

function getServerSnapshot(): WindowSize {
	return serverSnapshot
}

function subscribe(callback: () => void) {
	window.addEventListener('resize', callback)
	return () => window.removeEventListener('resize', callback)
}

export function useWindowSize() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
