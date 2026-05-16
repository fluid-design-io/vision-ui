import { ScrollView } from '@/components/scrollview'
import { Sidebar } from '@/components/sidebar'
import { cn } from '@/lib/cn'
import { Mic } from 'lucide-react'
import { settingsNavSections } from './settings.data'
import { SettingsNavRow } from './settings.nav-row'

export function SettingsSidebar() {
	return (
		<Sidebar>
			<ScrollView>
				<div className="py-5 px-5">
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

				<div className="flex flex-col pb-5 px-3">
					{settingsNavSections.map((section, sectionIndex) => (
						<div key={sectionIndex} className="flex flex-col gap-1">
							{sectionIndex > 0 ? <div className="h-5" /> : null}
							{section.map((item) => (
								<SettingsNavRow key={item.to} to={item.to} label={item.label} />
							))}
						</div>
					))}
				</div>
			</ScrollView>
		</Sidebar>
	)
}
