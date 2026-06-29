'use client'

import { ScrollView } from '@/components/scrollview'
import { Stack } from '@/components/stack'
import { StackRegularHeaderTitle } from '@/components/stack/header/header.title.regular'
import { Surface } from '@/components/surface'
import { Window } from '@/components/window'
import { useNavigate } from '@tanstack/react-router'
import { AppCard, UpdateCard } from './app-store.cards'
import { favoriteUpdates, heroSlides, whatsNewApps } from './app-store.data'
import { HeroCarousel } from './app-store.hero-carousel'
import { ProfileAvatar, SectionHeader, Shelf } from './app-store.primitives'

export function AppsAndGamesScreen() {
	const navigate = useNavigate()
	return (
		<Window className="size-full [--stack-header-min:4rem]" onClose={() => navigate({ to: '/' })}>
			<Stack className="relative size-full min-h-0" render={<Surface thickness="thick" />}>
				<Stack.Toolbar placement="topBarLeading">
					<StackRegularHeaderTitle className="text-xl">Apps & Games</StackRegularHeaderTitle>
				</Stack.Toolbar>
				<Stack.Toolbar placement="topBarTrailing">
					<Stack.Toolbar.Button icon={<ProfileAvatar />} />
				</Stack.Toolbar>
				<Stack.Screen render={<ScrollView className="bg-black/15" />}>
					<HeroCarousel slides={heroSlides} />
					<section className="z-10 relative flex flex-col gap-5 pb-5">
						<SectionHeader
							title="What's New"
							subtitle="The latest and greatest, handpicked by editors"
						/>
						<Shelf>
							{whatsNewApps.map((app) => (
								<AppCard key={app.id} app={app} />
							))}
						</Shelf>
					</section>
					<section className="z-10 relative flex flex-col gap-5 mb-12 py-5">
						<SectionHeader
							title="Our Favorite Updates"
							subtitle="What we’re most excited about this week"
						/>
						<Shelf>
							{favoriteUpdates.map((update) => (
								<UpdateCard key={update.id} update={update} />
							))}
						</Shelf>
					</section>
				</Stack.Screen>
				<Stack.Header.Slot className="ps-8 pe-5" />
			</Stack>
		</Window>
	)
}
