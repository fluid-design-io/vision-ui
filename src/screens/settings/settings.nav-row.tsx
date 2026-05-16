import { cn } from '@/lib/cn'
import { useSound } from '@/lib/sound/sound.hooks'
import { Link, useMatchRoute } from '@tanstack/react-router'
import type { SettingsNavRoute } from './settings.data'

export function SettingsNavRow({ to, label }: { to: SettingsNavRoute; label: string }) {
	const matchRoute = useMatchRoute()
	const isMatch = matchRoute({ to })
	const { play: playGridSelect } = useSound('gridSelect')

	return (
		<Link
			to={to}
			viewTransition
			className={cn(
				'relative flex items-center gap-3.5 rounded-2xl p-3 text-left text-[15px] transition-colors',
				'after:absolute after:inset-0 after:rounded-2xl hover:after:bg-white/5 after:transition-colors after:duration-200',
				isMatch && 'bg-white/12 text-white ring-offset-1 ring-offset-black/10 ring-1 ring-white/5',
				!isMatch && 'text-white/70',
			)}
			aria-current={isMatch ? 'page' : undefined}
			onMouseUp={playGridSelect}
		>
			<img
				src={`/assets/apps/settings/${label.toLowerCase()}.svg`}
				className="size-[26px] rounded-full overflow-hidden"
			/>

			<span className="min-w-0 flex-1 truncate font-medium">{label}</span>
		</Link>
	)
}
