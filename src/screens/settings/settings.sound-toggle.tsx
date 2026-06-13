import { PressableFeedback } from '@/components/pressable-feedback'
import { Switch } from '@/components/switch'
import { cn } from '@/lib/cn'
import { usePreferencesStore } from '@/lib/preferences'

export function SettingsSoundToggle() {
	const soundEnabled = usePreferencesStore((state) => state.sound.enabled)

	return (
		<PressableFeedback
			animation={false}
			className={cn(
				'flex items-center gap-3.5 rounded-[1.875rem] p-3 text-left text-[15px] transition-colors text-white/70',
			)}
		>
			<PressableFeedback.Highlight />

			<img
				src={`/assets/apps/settings/sound.svg`}
				className="size-[31px] overflow-hidden rounded-full"
			/>

			<span className="relative min-w-0 flex-1 truncate font-medium">Sound</span>
			<Switch
				isSelected={soundEnabled}
				onSelectedChange={(enabled) => {
					usePreferencesStore.setState((state) => {
						state.sound.enabled = enabled
					})
				}}
			/>
		</PressableFeedback>
	)
}
