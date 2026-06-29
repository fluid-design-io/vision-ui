'use client'

import { Stack } from '@/components/stack'
import { StackRegularHeaderTitle } from '@/components/stack/header/header.title.regular'
import { Surface } from '@/components/surface'
import { Window } from '@/components/window'
import { cn } from '@/lib/cn'
import { useNavigate } from '@tanstack/react-router'
import { AppCard, UpdateCard } from './app-store.cards'
import { favoriteUpdates, heroSlides, whatsNewApps } from './app-store.data'
import { HeroCarousel } from './app-store.hero-carousel'
import { HIDE_SCROLLBAR, ProfileAvatar, SectionHeader, Shelf } from './app-store.primitives'

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
				<Stack.Screen
					className={cn(
						'h-full overflow-x-hidden overflow-y-auto overscroll-y-contain',
						HIDE_SCROLLBAR,
					)}
				>
					<div className="flex flex-col gap-10 pb-16">
						<HeroCarousel slides={heroSlides} />
						<section className="flex flex-col gap-4">
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
						<section className="flex flex-col gap-4">
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
					</div>
				</Stack.Screen>
				<Stack.Header.Slot className="ps-8 pe-5" />
			</Stack>
		</Window>
	)
}
