export const settingsNavSections = [
	[
		{ to: '/settings/general', label: 'General' },
		{ to: '/settings/apps', label: 'Apps' },
		{ to: '/settings/people', label: 'People' },
		{ to: '/settings/environments', label: 'Environments' },
	] as const,
	[
		{ to: '/settings/accessibility', label: 'Accessibility' },
		{ to: '/settings/appearance', label: 'Appearance' },
	] as const,
] as const

export type SettingsNavRoute =
	| (typeof settingsNavSections)[number][number]['to']
