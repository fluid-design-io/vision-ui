import type { CommitLocationOptions } from '@tanstack/react-router'

export type DefaultViewTransitionOptions = CommitLocationOptions['viewTransition']
export type ViewTransitionProps = {
	fromPath?: string
	toPath: string
}

export type ViewTransitionType =
	| 'ornament-tab-switch'
	| 'home-app-launch'
	| 'stack'
	| 'stack-in'
	| 'stack-out'

export type ViewTransitionResolver<
	T extends readonly ViewTransitionType[] | false = readonly ViewTransitionType[] | false,
> = (props: ViewTransitionProps) => T | undefined
