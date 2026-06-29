import type { LucideIcon } from 'lucide-react'

/** A full-bleed promotional slide in the Apps & Games hero carousel. */
export interface HeroSlide {
	id: string
	eyebrow: string
	title: string
	subtitle?: string
	cta: string
	/** Optional photographic background. Falls back to `gradient` when absent. */
	image?: string
	objectPosition?: string
	gradient?: string
}

/** A small app row in the "What's New" shelf. */
export interface AppEntry {
	id: string
	name: string
	subtitle: string
	glyph: LucideIcon
	gradient: string
	/** Overrides the default "Get" label (e.g. a price). */
	price?: string
	inAppPurchases?: boolean
}

/** A wide gradient story card in the "Our Favorite Updates" shelf. */
export interface UpdateEntry {
	id: string
	title: string
	subtitle: string
	glyph: LucideIcon
	gradient: string
}

/** A medium artwork card in the "Made for Apple Vision Pro" shelf. */
export interface GameEntry {
	id: string
	name: string
	subtitle: string
	glyph: LucideIcon
	gradient: string
}

/** A tall editorial card in the "Explore Spatial Gaming on Arcade" shelf. */
export interface SpatialFeature {
	id: string
	headline: string
	game: string
	glyph: LucideIcon
	gradient: string
}
