import { EnvironmentsIcon, PeopleIcon } from '@/components/icons'
import { NavigationSplitView } from '@/components/navigation-split-view'
import { ScrollView } from '@/components/scrollview'
import { Sidebar } from '@/components/sidebar'
import { Stack } from '@/components/stack'
import { useStackChromeSnapshot } from '@/components/stack/stack.context'
import { cn } from '@/lib/cn'
import { useSound } from '@/lib/sound/sound.hooks'
import { createFileRoute, Link, Outlet, useMatchRoute } from '@tanstack/react-router'
import { Accessibility, LayoutGrid, Mic, Settings, Sun } from 'lucide-react'
import type * as React from 'react'

export const Route = createFileRoute('/(environment)/(apps)/settings')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<NavigationSplitView
			columnVisibility="all"
			sidebarWidth={292}
			className="mx-auto w-full h-full flex min-h-0 max-w-5xl max-h-[max(300px,65dvh)] overflow-hidden"
		>
			<NavigationSplitView.Sidebar>
				<SettingsSidebar />
			</NavigationSplitView.Sidebar>
			<NavigationSplitView.Detail>
				<Stack>
					<NavigationDetailScrollView />
				</Stack>
			</NavigationSplitView.Detail>
		</NavigationSplitView>
	)
}

function SettingsSidebar() {
	return (
		<Sidebar>
			<ScrollView className="px-5">
				<div className="px-1 py-5">
					<label className="relative block">
						<span className="sr-only">Search settings</span>
						<Mic
							className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40"
							strokeWidth={2}
							aria-hidden
						/>
						<input
							type="search"
							placeholder="Search"
							className={cn(
								'w-full rounded-full border-[0.5px] border-white/12 bg-black/35 py-2.5 pl-9 pr-3 text-sm text-white/95',
								'placeholder:text-white/35 placeholder:font-medium focus-visible:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15',
								/* Inner shadow */
								'shadow-[inset_0_3px_4px_2px_rgb(10_10_10/0.2),0_0.5px_1px_rgb(255_255_255/0.25)]',
							)}
						/>
					</label>
				</div>

				<div className="flex flex-col gap-0.5 pb-5">
					<NavRow
						to="/settings/general"
						icon={<Settings className="size-[22px]" strokeWidth={1.75} />}
						label="General"
					/>
					<NavRow
						to="/settings/apps"
						icon={<LayoutGrid className="size-[22px]" strokeWidth={1.75} />}
						label="Apps"
					/>
					<NavRow
						to="/settings/people"
						icon={<PeopleIcon className="size-[22px]" />}
						label="People"
					/>
					<NavRow
						to="/settings/environments"
						icon={<EnvironmentsIcon className="size-[22px]" />}
						label="Environments"
					/>
					<NavRow
						to="/settings/accessibility"
						icon={<Accessibility className="size-[22px]" strokeWidth={1.75} />}
						label="Accessibility"
					/>
					<NavRow
						to="/settings/appearance"
						icon={<Sun className="size-[22px]" strokeWidth={1.75} />}
						label="Appearance"
					/>
				</div>
			</ScrollView>
		</Sidebar>
	)
}

function NavRow({
	to,
	icon,
	label,
}: {
	to:
		| '/settings/general'
		| '/settings/apps'
		| '/settings/people'
		| '/settings/environments'
		| '/settings/accessibility'
		| '/settings/appearance'
	icon: React.ReactNode
	label: string
}) {
	const matchRoute = useMatchRoute()
	const isMatch = matchRoute({ to })
	const { play: playGridSelect } = useSound('gridSelect')

	return (
		<Link
			to={to}
			viewTransition
			className={cn(
				'flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-[15px] transition-colors',
				isMatch ? 'bg-white/[0.14] text-white' : 'text-white/78 hover:bg-white/[0.07]',
			)}
			aria-current={isMatch ? 'page' : undefined}
			onMouseUp={playGridSelect}
		>
			<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/90">
				{icon}
			</span>
			<span className="min-w-0 flex-1 truncate font-medium">{label}</span>
		</Link>
	)
}

function NavigationDetailScrollView() {
	const snapshot = useStackChromeSnapshot()
	return (
		<ScrollView.Root className="h-full">
			<Stack.Header.Slot />
			<ScrollView.Viewport
				className={cn(
					'px-5 pb-12 mx-auto max-w-xl',
					'mask-[linear-gradient(to_bottom,transparent_1rem,black_var(--stack-header-min,5rem),black_calc(100%-1.5rem),transparent)]',
					!snapshot.headerHidden && snapshot.titleDisplayMode === 'large'
						? 'pt-(--stack-header-min,6rem)'
						: 'pt-(--stack-header-min,5rem)',
				)}
			>
				<Outlet />
			</ScrollView.Viewport>
			<ScrollView.ScrollIndicator orientation="vertical">
				<ScrollView.ScrollIndicator.Thumb />
			</ScrollView.ScrollIndicator>
		</ScrollView.Root>
	)
}
