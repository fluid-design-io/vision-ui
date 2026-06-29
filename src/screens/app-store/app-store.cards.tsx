import { PressableFeedback } from '@/components/pressable-feedback'
import { AppIcon, ArcadeLabel, GetButton } from './app-store.primitives'
import type { AppEntry, GameEntry, SpatialFeature, UpdateEntry } from './app-store.types'

/** Soft sheen blobs that give a flat gradient card a sense of artwork. */
function SheenArtwork() {
	return (
		<div aria-hidden className="absolute inset-0 overflow-hidden opacity-80">
			<div className="absolute -top-6 -left-6 size-32 rounded-full bg-white/20 blur-2xl" />
			<div className="absolute top-8 right-6 size-20 rounded-full bg-white/10 blur-xl" />
		</div>
	)
}

/** Small app row used in the "What's New" shelf. */
export function AppCard({ app }: { app: AppEntry }) {
	return (
		<PressableFeedback className="relative flex w-[340px] shrink-0 snap-start items-center gap-3.5 overflow-hidden rounded-[1.5rem] bg-white/[0.07] p-3 ring-1 ring-white/10 ring-inset backdrop-blur-xl [--radius:1.5rem]">
			<PressableFeedback.Highlight />
			<AppIcon glyph={app.glyph} gradient={app.gradient} className="size-14" />
			<div className="relative z-10 min-w-0 flex-1">
				<p className="truncate text-[15px] font-semibold text-foreground">{app.name}</p>
				<p className="truncate text-[13px] leading-tight text-foreground-muted">{app.subtitle}</p>
			</div>
			<div className="relative z-10 flex shrink-0 flex-col items-center gap-1">
				<GetButton label={app.price} />
				{app.inAppPurchases ? (
					<span className="text-[10px] leading-none text-foreground-muted/70">
						In-App Purchases
					</span>
				) : null}
			</div>
		</PressableFeedback>
	)
}

/** Wide vibrant story card used in the "Our Favorite Updates" shelf. */
export function UpdateCard({ update }: { update: UpdateEntry }) {
	return (
		<PressableFeedback
			className="relative flex h-[248px] w-[clamp(380px,42vw,460px)] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[28px] p-6 ring-1 ring-white/10 ring-inset [--radius:28px]"
			style={{ backgroundImage: update.gradient }}
		>
			<PressableFeedback.Highlight />
			<div className="absolute top-1/2 right-7 -translate-y-[58%]">
				<div className="absolute -inset-7 rounded-full bg-white/35 blur-2xl" />
				<AppIcon
					glyph={update.glyph}
					gradient="linear-gradient(160deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04))"
					className="relative size-24 rounded-[26%] bg-white/15 backdrop-blur-md"
				/>
			</div>
			<div className="relative z-10 max-w-[68%]">
				<h3 className="text-[1.35rem] leading-[1.1] font-bold text-white text-shadow-md">
					{update.title}
				</h3>
				<p className="mt-1.5 text-[13px] leading-snug text-white/85">{update.subtitle}</p>
			</div>
		</PressableFeedback>
	)
}

/** Medium artwork card used in the "Made for Apple Vision Pro" shelf. */
export function GameCard({ game }: { game: GameEntry }) {
	return (
		<PressableFeedback
			className="relative h-[226px] w-[clamp(320px,34vw,400px)] shrink-0 snap-start overflow-hidden rounded-[24px] ring-1 ring-white/10 ring-inset [--radius:24px]"
			style={{ backgroundImage: game.gradient }}
		>
			<PressableFeedback.Highlight />
			<SheenArtwork />
			<div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 p-4">
				<AppIcon glyph={game.glyph} gradient={game.gradient} className="size-12" />
				<div className="min-w-0 flex-1">
					<ArcadeLabel className="font-medium" />
					<p className="truncate text-[15px] font-semibold text-white">{game.name}</p>
					<p className="truncate text-[12px] text-white/70">{game.subtitle}</p>
				</div>
				<GetButton />
			</div>
		</PressableFeedback>
	)
}

/** Tall editorial card used in the "Explore Spatial Gaming on Arcade" shelf. */
export function FeatureCard({ feature }: { feature: SpatialFeature }) {
	return (
		<PressableFeedback
			className="relative flex h-[360px] w-[clamp(280px,28vw,320px)] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[26px] ring-1 ring-white/10 ring-inset [--radius:26px]"
			style={{ backgroundImage: feature.gradient }}
		>
			<PressableFeedback.Highlight />
			<SheenArtwork />
			<div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10" />
			<div className="relative z-10 px-5">
				<ArcadeLabel className="font-semibold tracking-[0.12em]" />
				<h3 className="mt-1.5 text-[1.5rem] leading-[1.08] font-bold text-white text-shadow-md">
					{feature.headline}
				</h3>
			</div>
			<div className="relative z-10 mt-5 flex items-center gap-3 px-5 pb-5">
				<AppIcon glyph={feature.glyph} gradient={feature.gradient} className="size-10" />
				<div className="min-w-0 flex-1">
					<ArcadeLabel className="text-white/65" />
					<p className="truncate text-[14px] font-semibold text-white">{feature.game}</p>
				</div>
				<GetButton />
			</div>
		</PressableFeedback>
	)
}
