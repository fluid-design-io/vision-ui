import { PressableFeedback } from '@/components/pressable-feedback'
import { cn } from '@/lib/cn'
import { useSound } from '@/lib/sound/sound.hooks'
import { Link, useMatchRoute } from '@tanstack/react-router'
import type { SettingsNavRoute } from './settings.data'

export function SettingsNavRow({ to, label }: { to: SettingsNavRoute; label: string }) {
	const matchRoute = useMatchRoute()
	const isMatch = matchRoute({ to })
	const { play: playGridSelect } = useSound('gridSelect')

	return (
		<PressableFeedback
			animation={false}
			render={<Link to={to} viewTransition />}
			className={cn(
				'flex items-center gap-3.5 rounded-2xl p-3 text-left text-[15px] transition-colors',
				isMatch && 'bg-white/12 text-white ring-offset-2 ring-offset-black/20 ring-1 ring-white/15',
				!isMatch && 'text-white/70',
			)}
			aria-current={isMatch ? 'page' : undefined}
			onMouseUp={playGridSelect}
		>
			<PressableFeedback.Highlight />

			<img
				src={`/assets/apps/settings/${label.toLowerCase()}.svg`}
				className="size-[31px] overflow-hidden rounded-full"
			/>

			<span className="relative min-w-0 flex-1 truncate font-medium">{label}</span>
		</PressableFeedback>
	)
}
