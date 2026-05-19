import type { CommitLocationOptions } from '@tanstack/react-router'

export type DefaultViewTransitionOptions = CommitLocationOptions['viewTransition']
export type ViewTransitionProps = {
	fromPath?: string
	toPath: string
}

export type ViewTransitionType = 'ornament-tab-switch' | 'home-app-launch'

export type ViewTransitionResolver<T extends readonly ViewTransitionType[] = readonly ViewTransitionType[]> =
	(props: ViewTransitionProps) => T | undefined
