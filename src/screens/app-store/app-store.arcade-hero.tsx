import { Button } from '@/components/button'
import { cn } from '@/lib/cn'
import { Gamepad2 } from 'lucide-react'

const CHARACTER_BLOBS = [
	'left-[18%] top-[15%] size-16 bg-amber-300',
	'left-[33%] top-[8%] size-20 bg-rose-300',
	'left-[50%] top-[12%] size-14 bg-sky-300',
	'left-[63%] top-[9%] size-20 bg-emerald-300',
	'left-[78%] top-[16%] size-16 bg-fuchsia-300',
]

/** Decorative character-like orbs + top spotlight evoking the Arcade key art. */
function ArcadeArtwork() {
	return (
		<div aria-hidden className="absolute inset-0 overflow-hidden">
			{CHARACTER_BLOBS.map((blob) => (
				<div
					key={blob}
					className={cn(
						'absolute rounded-[42%] opacity-80 blur-[2px] shadow-lg shadow-black/20',
						blob,
					)}
				/>
			))}
			<div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.35),transparent)]" />
		</div>
	)
}

/** Full-bleed Apple Arcade subscription promo at the top of the Arcade tab. */
export function ArcadeHero() {
	return (
		<div className="relative isolate h-[clamp(300px,46dvh,480px)] w-full overflow-hidden">
			<div
				className="absolute inset-0"
				style={{
					backgroundImage:
						'radial-gradient(130% 120% at 22% 8%, #a855f7 0%, #7c3aed 28%, #db2777 60%, #f97316 100%)',
				}}
			/>
			<ArcadeArtwork />
			<div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/15" />
			<div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-8 pt-(--stack-header-min,4rem) pb-10 text-center">
				<div className="flex items-center gap-1.5 text-white">
					<Gamepad2 className="size-6" strokeWidth={2.25} />
					<span className="text-xl font-semibold tracking-tight">Arcade</span>
				</div>
				<h1 className="max-w-2xl text-[1.7rem] leading-tight font-bold text-white text-shadow-lg">
					Play 200+ Games. No In-App Purchases. No Ads.
				</h1>
				<Button className="rounded-full px-7">Start Playing</Button>
				<p className="text-xs text-white/75">
					Plan renews automatically for $6.99/month until canceled.
				</p>
			</div>
		</div>
	)
}
