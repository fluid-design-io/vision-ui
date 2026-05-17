'use client'

import { Button } from '@/components/button'
import { Surface } from '@/components/surface'
import { Info, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isChromiumBasedBrowser } from './browser-compatibility-banner.utils'

function BrowserCompatibilityBanner() {
	const [dismissed, setDismissed] = useState(false)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (!isChromiumBasedBrowser()) {
			setVisible(true)
		}
	}, [])

	if (!visible || dismissed) {
		return null
	}

	return (
		<div
			className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
			role="status"
			aria-live="polite"
		>
			<Surface
				thickness="thinner"
				className="pointer-events-auto flex w-full max-w-3xl items-center gap-3 py-2 px-4"
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -100 }}
				transition={{ type: 'spring', bounce: 0, delay: 2 }}
			>
				<Info strokeWidth={2.5} className="text-white/50 size-5.5 ml-2" aria-hidden />
				<p className="min-w-0 flex-1 text-pretty text-center text-sm leading-snug text-white/75">
					VisionUI uses experimental web features, use Chrome for the best experience.
				</p>
				<Button
					type="button"
					variant="secondary"
					size="icon"
					className="shrink-0"
					cursorSnap
					aria-label="Dismiss browser notice"
					onClick={() => setDismissed(true)}
				>
					<X className="size-5 text-white" aria-hidden />
				</Button>
			</Surface>
		</div>
	)
}

export { BrowserCompatibilityBanner }
