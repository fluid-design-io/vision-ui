'use client'

import { SearchIcon } from '@/components/icons'
import { ProgressiveBlur } from '@/components/progressive-blur'
import { Stack } from '@/components/stack'
import { StackRegularHeaderTitle } from '@/components/stack/header/header.title.regular'
import { Surface } from '@/components/surface'
import { Window } from '@/components/window'
import { cn } from '@/lib/cn'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { HIDE_SCROLLBAR, ProfileAvatar } from './app-store.primitives'

const SUGGESTIONS = [
	'Games',
	'Productivity',
	'Spatial',
	'Photo & Video',
	'Social',
	'Entertainment',
	'Health & Fitness',
	'Developer Tools',
]

export function SearchScreen() {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')

	return (
		<Window className="size-full [--stack-header-min:4rem]" onClose={() => navigate({ to: '/' })}>
			<Stack className="relative size-full min-h-0" render={<Surface thickness="thick" />}>
				<Stack.Toolbar placement="topBarLeading">
					<StackRegularHeaderTitle className="text-xl">Search</StackRegularHeaderTitle>
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
					<div className="flex flex-col gap-7 px-8 pb-16 pt-[calc(var(--stack-header-min,4rem)+1rem)]">
						<label className="flex items-center gap-3 rounded-full bg-white/[0.08] px-5 py-3 ring-1 ring-white/12 ring-inset backdrop-blur-xl">
							<SearchIcon className="size-5 text-foreground-muted" />
							<input
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Apps, Games, and Stories"
								className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-foreground-muted/70"
							/>
						</label>
						<div className="flex flex-col gap-3">
							<h2 className="text-lg font-semibold text-foreground">Discover</h2>
							<div className="flex flex-wrap gap-2.5">
								{SUGGESTIONS.map((suggestion) => (
									<button
										key={suggestion}
										type="button"
										onClick={() => setQuery(suggestion)}
										className="rounded-full bg-white/[0.08] px-4 py-2 text-[14px] text-foreground ring-1 ring-white/10 ring-inset transition hover:bg-white/15"
									>
										{suggestion}
									</button>
								))}
							</div>
						</div>
					</div>
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
