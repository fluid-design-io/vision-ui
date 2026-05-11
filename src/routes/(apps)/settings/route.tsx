import { EnvironmentsIcon, PeopleIcon } from '@/components/icons'
import { NavigationSplitView } from '@/components/navigation-split-view'
import { ScrollView } from '@/components/scrollview'
import { Sidebar } from '@/components/sidebar'
import { Stack } from '@/components/stack'
import { Surface } from '@/components/surface'
import { cn } from '@/lib/cn'
import { createFileRoute, Link, Outlet, useMatchRoute } from '@tanstack/react-router'
import { Accessibility, LayoutGrid, Mic, Settings, Sun } from 'lucide-react'
import type * as React from 'react'

export const Route = createFileRoute('/(apps)/settings')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Surface
			thickness="thicker"
			className="mx-auto w-full h-full flex min-h-0 max-w-5xl max-h-[600px] overflow-hidden"
		>
			<Stack>
				<NavigationSplitView columnVisibility="all" sidebarWidth={292}>
					<NavigationSplitView.Sidebar>
						<SettingsSidebar />
					</NavigationSplitView.Sidebar>
					<NavigationSplitView.Detail>
						<ScrollView>
							<Stack.Header.Slot />
							<div className="mx-auto p-5 max-w-xl">
								<Outlet />
							</div>
						</ScrollView>
					</NavigationSplitView.Detail>
				</NavigationSplitView>
			</Stack>
		</Surface>
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

	return (
		<Link
			to={to}
			viewTransition
			className={cn(
				'flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-[15px] transition-colors',
				isMatch
					? 'bg-white/[0.14] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
					: 'text-white/78 hover:bg-white/[0.07]',
			)}
			aria-current={isMatch ? 'page' : undefined}
		>
			<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/90 ring-1 ring-white/10">
				{icon}
			</span>
			<span className="min-w-0 flex-1 truncate font-medium">{label}</span>
		</Link>
	)
}
