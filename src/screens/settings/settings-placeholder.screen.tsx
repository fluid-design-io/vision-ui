'use client'

export function SettingsPlaceholderScreen({ title }: { title: string }) {
	return (
		<div className="flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center">
			<p className="text-lg font-medium text-white/90">{title}</p>
			<p className="text-sm text-white/45">This section is a placeholder in the mockup.</p>
		</div>
	)
}
