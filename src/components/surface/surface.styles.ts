import type { GlassThickness } from './surface.types'

export const SATURATION = 1.5

export const getThickness = (thickness: GlassThickness) => {
	switch (thickness) {
		case 'thinnest':
			return 24
		case 'thinner':
			return 32
		case 'thin':
			return 42
		case 'normal':
			return 48
		case 'thick':
			return 64
		case 'thicker':
			return 72
		case 'thickest':
			return 96
		default:
			return 24
	}
}

export const getRings = (thickness: GlassThickness) => {
	switch (thickness) {
		case 'thinnest':
			return '0px 3px 6.5px 0px rgba(0, 0, 0, 0.05), -0.25px 0.35px 0.15px -1.5px rgba(255, 255, 255, 0.15) inset, 0px 0.35px 2px 0px rgba(255, 255, 255, 0.15) inset'
		case 'thinner':
			return '0px 4px 8px 0px rgba(0, 0, 0, 0.05), -0.35px 0.55px 0.25px -1.5px rgba(255, 255, 255, 0.2) inset, 0px 0.55px 2px 0px rgba(255, 255, 255, 0.2) inset'
		case 'thin':
			return '0px 6px 10px 0px rgba(0, 0, 0, 0.05), -0.45px 0.75px 0.35px -1.5px rgba(255, 255, 255, 0.25) inset, 0px 0.75px 2px 0px rgba(255, 255, 255, 0.25) inset'
		case 'normal':
			return '0px 8px 12px 0px rgba(0, 0, 0, 0.05), -0.55px 1px 0.45px -1.5px rgba(255, 255, 255, 0.3) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.3) inset'
		case 'thick':
			return '0px 12px 16px 0px rgba(0, 0, 0, 0.05), -0.65px 1.25px 0.65px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.25px 2px 0px rgba(255, 255, 255, 0.35) inset'
		case 'thicker':
			return '0px 18px 22px 0px rgba(0, 0, 0, 0.05), -0.75px 1.75px 0.75px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.75px 6px 0px rgba(255, 255, 255, 0.35) inset'
		case 'thickest':
			return '0px 24px 28px 0px rgba(0, 0, 0, 0.05), -0.85px 1.85px 0.85px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.85px 6px 0px rgba(255, 255, 255, 0.35) inset'
		default:
			return '0px 3px 6.5px 0px rgba(0, 0, 0, 0.05), -0.25px 0.35px 0.15px -1.5px rgba(255, 255, 255, 0.15) inset, 0px 0.35px 2px 0px rgba(255, 255, 255, 0.15) inset'
	}
}

export const getHighlightStroke = (thickness: GlassThickness) => {
	switch (thickness) {
		case 'thinnest':
			return '[--mask-stroke:0.75px]'
		case 'thinner':
			return '[--mask-stroke:1px]'
		case 'thin':
			return '[--mask-stroke:1.25px]'
		case 'normal':
			return '[--mask-stroke:1.5px]'
		case 'thick':
			return '[--mask-stroke:1.75px]'
		case 'thicker':
			return '[--mask-stroke:1.85px]'
		case 'thickest':
			return '[--mask-stroke:1.9px]'
		default:
			return '[--mask-stroke:0.75px]'
	}
}

export const getHighlightOpacity = (thickness: GlassThickness) => {
	switch (thickness) {
		case 'thinnest':
			return 0.15
		case 'thinner':
			return 0.175
		case 'thin':
			return 0.2
		case 'normal':
			return 0.225
		case 'thick':
			return 0.25
		case 'thicker':
			return 0.275
		case 'thickest':
			return 0.3
		default:
			return 0.15
	}
}

export const SURFACE_LAYOUT_VARS = {
	VAR_RADIUS: '[--view-radius:34px]',
	VAR_DIAMETER: '[--view-diameter:68px]',
} as const

const maskComposite = ['exclude', 'intersect', 'subtract', 'intersect', 'subtract', 'add']

const defaultHighlightStyle = {
	borderRadius: `var(--view-radius)`,
	maskSize: '100% 100%',
	WebkitMaskSize: '100% 100%',
	maskRepeat: 'no-repeat',
	WebkitMaskRepeat: 'no-repeat',
} as const

const leftTopHighlight =
	'conic-gradient(from 270deg at var(--view-radius) var(--view-radius), transparent 0deg, white 45deg, transparent 170deg), transparent'
const leftTopMaskImage = [
	'linear-gradient(to right, black, black)',
	'linear-gradient(to right, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))',
	'linear-gradient(to bottom, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))',
	'linear-gradient(to right, black calc(var(--view-radius) - var(--mask-stroke)), transparent var(--view-radius))',
	'linear-gradient(to bottom, black calc(var(--view-radius) - var(--mask-stroke)), transparent var(--view-radius))',
	'radial-gradient(var(--view-diameter) var(--view-diameter) at var(--view-radius) var(--view-radius), black var(--mask-inner-distance), transparent var(--mask-outer-distance))',
]

export const leftTopHighlightStyle = {
	background: leftTopHighlight,
	maskImage: leftTopMaskImage.join(', '),
	maskComposite: maskComposite.join(', '),
	...defaultHighlightStyle,
} as React.CSSProperties

const rightBottomHighlight =
	'conic-gradient(from 60deg at var(--view-radius) var(--view-radius), transparent 0deg, white 65deg, transparent 160deg), transparent'
const rightBottomMaskImage = [
	'linear-gradient(to left, black, black)',
	'linear-gradient(to left, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))',
	'linear-gradient(to top, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))',
	'linear-gradient(to left, black calc(var(--view-radius) - var(--mask-stroke)), transparent var(--view-radius))',
	'linear-gradient(to top, black calc(var(--view-radius) - var(--mask-stroke)), transparent var(--view-radius))',
	'radial-gradient(var(--view-diameter) var(--view-diameter) at calc(100% - var(--view-radius)) calc(100% - var(--view-radius)), black var(--mask-inner-distance), transparent var(--mask-outer-distance))',
]

export const rightBottomHighlightStyle = {
	background: rightBottomHighlight,
	maskImage: rightBottomMaskImage.join(', '),
	maskComposite: maskComposite.join(', '),
	...defaultHighlightStyle,
} as React.CSSProperties
