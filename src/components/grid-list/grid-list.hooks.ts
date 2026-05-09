import { useEffect, useState } from 'react'

export function useWindowSize() {
	const [size, setSize] = useState({ width: 0, height: 0 })
	useEffect(() => {
		const updateSize = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight })
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])
	return size
}
