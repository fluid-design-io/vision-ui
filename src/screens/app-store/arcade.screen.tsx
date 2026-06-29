'use client'

import { ProgressiveBlur } from '@/components/progressive-blur'
import { ScrollView } from '@/components/scrollview'
import { Stack } from '@/components/stack'
import { StackRegularHeaderTitle } from '@/components/stack/header/header.title.regular'
import { Surface } from '@/components/surface'
import { Window } from '@/components/window'
import { cn } from '@/lib/cn'
import { useNavigate } from '@tanstack/react-router'
import { ArcadeHero } from './app-store.arcade-hero'
import { FeatureCard, GameCard } from './app-store.cards'
import { arcadeGames, spatialFeatures } from './app-store.data'
import { HIDE_SCROLLBAR, ProfileAvatar, SectionHeader, Shelf } from './app-store.primitives'

export function ArcadeScreen() {
	const navigate = useNavigate()

	return (
		<Window className="size-full [--stack-header-min:4rem]" onClose={() => navigate({ to: '/' })}>
			<Stack className="relative size-full min-h-0" render={<Surface thickness="thick" />}>
				<Stack.Toolbar placement="topBarLeading">
					<StackRegularHeaderTitle className="text-xl">Arcade</StackRegularHeaderTitle>
				</Stack.Toolbar>
				<Stack.Toolbar placement="topBarTrailing">
					<Stack.Toolbar.Button icon={<ProfileAvatar />} />
				</Stack.Toolbar>
				<Stack.Screen
					className={cn(
						'h-full overflow-x-hidden overflow-y-auto overscroll-y-contain',
						HIDE_SCROLLBAR,
					)}
				>
					<ScrollView>
						<ArcadeHero />
						<section className="flex flex-col gap-4">
							<SectionHeader title="Made for Apple Vision Pro" />
							<Shelf>
								{arcadeGames.map((game) => (
									<GameCard key={game.id} game={game} />
								))}
							</Shelf>
						</section>
						<section className="flex flex-col gap-4">
							<SectionHeader title="Explore Spatial Gaming on Arcade" />
							<Shelf>
								{spatialFeatures.map((feature) => (
									<FeatureCard key={feature.id} feature={feature} />
								))}
							</Shelf>
						</section>
					</ScrollView>
				</Stack.Screen>
				<ProgressiveBlur
					position="top"
					height="5.5rem"
					backgroundColor="rgba(0, 0, 0, 0.18)"
					blurAmount="7px"
					className="z-30"
				/>
				<Stack.Header.Slot className="ps-8 pe-5" />
			</Stack>
		</Window>
	)
}
