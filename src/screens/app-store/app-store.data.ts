import {
	Activity,
	Bird,
	Brain,
	Camera,
	Cherry,
	Dices,
	Flower2,
	Gamepad2,
	Map,
	MousePointer,
	Music,
	Pencil,
	PenTool,
	Puzzle,
	Rocket,
	Scissors,
	Sparkles,
	Trophy,
	Wallet,
} from 'lucide-react'
import type { AppEntry, GameEntry, HeroSlide, SpatialFeature, UpdateEntry } from './app-store.types'

const F1_HERO =
	'https://is1-ssl.mzstatic.com/image/thumb/Features/v4/ea/58/74/ea587472-55ae-147e-6450-483d8614218a/4244e26e-bb9a-4d03-a325-78ace5a9f286.png/2400x1350sr.webp'

export const heroSlides: HeroSlide[] = [
	{
		id: 'formula-1',
		eyebrow: 'What to Watch',
		title: 'Stream the 2026\nFormula 1™ Season',
		cta: 'Read More',
		image: F1_HERO,
		objectPosition: '85% top',
	},
	{
		id: 'workflow',
		eyebrow: 'Get Organized',
		title: 'Supercharge\nYour Workflow',
		subtitle: 'Productivity tools for getting more done.',
		cta: 'View Collection',
		gradient: 'radial-gradient(130% 130% at 78% 16%, #8b5cf6 0%, #6d28d9 42%, #3b0764 100%)',
	},
	{
		id: 'new-worlds',
		eyebrow: 'Play Now',
		title: 'Dive Into\nNew Worlds',
		subtitle: 'Spatial adventures built for Apple Vision Pro.',
		cta: 'Explore',
		gradient: 'radial-gradient(130% 130% at 20% 18%, #22d3ee 0%, #0891b2 45%, #0e2a47 100%)',
	},
	{
		id: 'master-craft',
		eyebrow: 'Editor’s Choice',
		title: 'Master\nYour Craft',
		cta: 'See the Apps',
		gradient: 'radial-gradient(130% 130% at 80% 20%, #fbbf24 0%, #f97316 45%, #7c2d12 100%)',
	},
	{
		id: 'in-the-zone',
		eyebrow: 'Focus',
		title: 'Stay in\nthe Zone',
		cta: 'Get Started',
		gradient: 'radial-gradient(130% 130% at 24% 14%, #818cf8 0%, #4f46e5 45%, #1e1b4b 100%)',
	},
	{
		id: 'designed-spatial',
		eyebrow: 'New & Notable',
		title: 'Designed for\nSpatial Computing',
		cta: 'Discover',
		gradient: 'radial-gradient(130% 130% at 74% 20%, #fb7185 0%, #e11d48 45%, #4c0519 100%)',
	},
]

export const whatsNewApps: AppEntry[] = [
	{
		id: 'iracing',
		name: 'iRacing Connect',
		subtitle: 'Official iRacing CloudXR app',
		glyph: Trophy,
		gradient: 'linear-gradient(160deg, #2563eb 0%, #ef4444 100%)',
	},
	{
		id: 'choclift',
		name: 'choclift: Workflow Suite',
		subtitle: 'desktop touch controls',
		glyph: MousePointer,
		gradient: 'linear-gradient(160deg, #fb923c 0%, #b45309 100%)',
		inAppPurchases: true,
	},
	{
		id: 'insight',
		name: 'INSIGHT Timer',
		subtitle: 'The huge meditation app',
		glyph: Sparkles,
		gradient: 'linear-gradient(160deg, #34d399 0%, #059669 100%)',
	},
	{
		id: 'cardpls',
		name: 'Cardpls Wallet',
		subtitle: 'Every pass in one place',
		glyph: Wallet,
		gradient: 'linear-gradient(160deg, #818cf8 0%, #4338ca 100%)',
	},
	{
		id: 'lumen',
		name: 'Lumen Notes',
		subtitle: 'Think it. Note it.',
		glyph: Pencil,
		gradient: 'linear-gradient(160deg, #fcd34d 0%, #d97706 100%)',
	},
	{
		id: 'tempo',
		name: 'Tempo Run',
		subtitle: 'Coaching in your ears',
		glyph: Activity,
		gradient: 'linear-gradient(160deg, #fb7185 0%, #be123c 100%)',
	},
]

export const favoriteUpdates: UpdateEntry[] = [
	{
		id: 'mindnode',
		title: 'MindNode: Mind Map & Outline',
		subtitle: 'MindNode — See your maps fast with a faster canvas.',
		glyph: Brain,
		gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 58%, #f0abfc 100%)',
	},
	{
		id: 'touchdesk',
		title: 'TouchDesk — Desktop Canvas',
		subtitle: 'Add videos to your canvas.',
		glyph: PenTool,
		gradient: 'linear-gradient(135deg, #e879f9 0%, #c026d3 50%, #fb923c 100%)',
	},
	{
		id: 'halide',
		title: 'Halide Mark II — Pro Camera',
		subtitle: 'Pro photography, simplified.',
		glyph: Camera,
		gradient: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 58%, #a7f3d0 100%)',
	},
]

export const arcadeGames: GameEntry[] = [
	{
		id: 'crossy-road',
		name: 'Crossy Road+',
		subtitle: 'Endless Co-op Play',
		glyph: Bird,
		gradient: 'linear-gradient(160deg, #38bdf8 0%, #2563eb 50%, #1e3a8a 100%)',
	},
	{
		id: 'retrocade',
		name: 'Retrocade',
		subtitle: 'Golden Age of Games',
		glyph: Gamepad2,
		gradient: 'linear-gradient(160deg, #f59e0b 0%, #b45309 52%, #1c1917 100%)',
	},
	{
		id: 'fruit-ninja',
		name: 'Super Fruit Ninja',
		subtitle: 'Fruit Power in your space',
		glyph: Cherry,
		gradient: 'linear-gradient(160deg, #34d399 0%, #10b981 45%, #064e3b 100%)',
	},
	{
		id: 'wylde-flowers',
		name: 'Wylde Flowers',
		subtitle: 'Cozy, magical life sim',
		glyph: Flower2,
		gradient: 'linear-gradient(160deg, #86efac 0%, #16a34a 55%, #14532d 100%)',
	},
	{
		id: 'synth-riders',
		name: 'Synth Riders',
		subtitle: 'Let the music move you',
		glyph: Music,
		gradient: 'linear-gradient(160deg, #c084fc 0%, #7c3aed 50%, #2e1065 100%)',
	},
	{
		id: 'game-room',
		name: 'Game Room',
		subtitle: 'Play Classics Together',
		glyph: Dices,
		gradient: 'linear-gradient(160deg, #a16207 0%, #422006 60%, #1c1917 100%)',
	},
]

export const spatialFeatures: SpatialFeature[] = [
	{
		id: 'museums',
		headline: 'Puzzle Through Beautiful Museums',
		game: 'Masterpieced',
		glyph: Puzzle,
		gradient: 'radial-gradient(120% 120% at 30% 18%, #1e3a8a 0%, #0f172a 60%, #020617 100%)',
	},
	{
		id: 'jetpack',
		headline: 'Have a Blast Flying Fast',
		game: 'Jetpack Joyride 2',
		glyph: Rocket,
		gradient: 'radial-gradient(120% 120% at 58% 28%, #f59e0b 0%, #b45309 45%, #7c2d12 100%)',
	},
	{
		id: 'stitch',
		headline: 'Unwind With a Crafty Puzzler',
		game: 'stitch.',
		glyph: Scissors,
		gradient: 'radial-gradient(120% 120% at 40% 24%, #fda4af 0%, #fb923c 55%, #be123c 100%)',
	},
	{
		id: 'skate',
		headline: 'Carve Up the City',
		game: 'Skate City',
		glyph: Map,
		gradient: 'radial-gradient(120% 120% at 34% 20%, #2dd4bf 0%, #0e7490 55%, #083344 100%)',
	},
]
