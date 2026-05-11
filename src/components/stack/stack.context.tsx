'use client'

import * as React from 'react'
import {
	createContext,
	use,
	useCallback,
	useMemo,
	useRef,
	useSyncExternalStore,
} from 'react'
import { DISPLAY_NAME } from './stack.constants'
import type {
	StackChromeRegistrySnapshot,
	StackTitleDisplayMode,
	ToolbarPlacement,
} from './stack.types'

export type SlotOwner = string

let registrationSeq = 0

export function nextSeq() {
	registrationSeq += 1
	return registrationSeq
}

export type StackChromeContextValue = {
	getSnapshot: () => StackChromeRegistrySnapshot
	subscribe: (listener: () => void) => () => void
	registerTitle: (owner: SlotOwner, seq: number, node: React.ReactNode | null) => void
	registerHeaderStyle: (
		owner: SlotOwner,
		seq: number,
		payload: {
			style?: React.CSSProperties
			hidden?: boolean
			transparent?: boolean
		} | null,
	) => void
	registerTitleDisplayMode: (
		owner: SlotOwner,
		seq: number,
		mode: StackTitleDisplayMode | null,
	) => void
	registerSearchBar: (owner: SlotOwner, seq: number, node: React.ReactNode | null) => void
	registerBackButton: (owner: SlotOwner, seq: number, node: React.ReactNode | null) => void
	registerToolbar: (
		owner: SlotOwner,
		seq: number,
		placement: ToolbarPlacement,
		node: React.ReactNode | null,
	) => void
	clearOwner: (owner: SlotOwner) => void
}

const StackChromeContext = createContext<StackChromeContextValue | null>(null)

type Entry<T> = { seq: number; value: T }

function pickLatest<T>(entries: Map<SlotOwner, Entry<T>>, pickValue: (e: Entry<T>) => T): T | null {
	let best: Entry<T> | null = null
	for (const entry of entries.values()) {
		if (!best || entry.seq > best.seq) best = entry
	}
	return best ? pickValue(best) : null
}

function createEmptySnapshot(): StackChromeRegistrySnapshot {
	return {
		title: null,
		headerStyle: undefined,
		headerHidden: false,
		headerTransparent: false,
		titleDisplayMode: 'automatic',
		searchBar: null,
		backButton: null,
		toolbarTopBarLeading: null,
		toolbarTopBarTrailing: null,
		toolbarBottomBar: null,
		toolbarPrincipal: null,
	}
}

function shallowStyleEqual(
	a: React.CSSProperties | undefined,
	b: React.CSSProperties | undefined,
): boolean {
	if (a === b) return true
	if (!a || !b) return false
	const ka = Object.keys(a)
	const kb = Object.keys(b)
	if (ka.length !== kb.length) return false
	for (const key of ka) {
		if (
			(a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key]
		) {
			return false
		}
	}
	return true
}

/** `useSyncExternalStore` requires referentially stable snapshots when data is unchanged. */
function snapshotsEqual(
	a: StackChromeRegistrySnapshot,
	b: StackChromeRegistrySnapshot,
): boolean {
	return (
		a.title === b.title &&
		a.searchBar === b.searchBar &&
		a.backButton === b.backButton &&
		a.toolbarTopBarLeading === b.toolbarTopBarLeading &&
		a.toolbarTopBarTrailing === b.toolbarTopBarTrailing &&
		a.toolbarBottomBar === b.toolbarBottomBar &&
		a.toolbarPrincipal === b.toolbarPrincipal &&
		a.headerHidden === b.headerHidden &&
		a.headerTransparent === b.headerTransparent &&
		a.titleDisplayMode === b.titleDisplayMode &&
		shallowStyleEqual(a.headerStyle, b.headerStyle)
	)
}

export function StackChromeProvider({ children }: { children: React.ReactNode }) {
	const listenersRef = useRef(new Set<() => void>())
	const titleEntriesRef = useRef(new Map<SlotOwner, Entry<React.ReactNode>>())
	const headerEntriesRef = useRef(
		new Map<
			SlotOwner,
			Entry<{ style?: React.CSSProperties; hidden?: boolean; transparent?: boolean }>
		>(),
	)
	const titleModeEntriesRef = useRef(new Map<SlotOwner, Entry<StackTitleDisplayMode>>())
	const searchEntriesRef = useRef(new Map<SlotOwner, Entry<React.ReactNode>>())
	const backEntriesRef = useRef(new Map<SlotOwner, Entry<React.ReactNode>>())
	const toolbarLeadingRef = useRef(new Map<SlotOwner, Entry<React.ReactNode>>())
	const toolbarTrailingRef = useRef(new Map<SlotOwner, Entry<React.ReactNode>>())
	const toolbarBottomRef = useRef(new Map<SlotOwner, Entry<React.ReactNode>>())
	const toolbarPrincipalRef = useRef(new Map<SlotOwner, Entry<React.ReactNode>>())

	const snapshotRef = useRef<StackChromeRegistrySnapshot>(createEmptySnapshot())

	const recomputeSnapshot = useCallback((): StackChromeRegistrySnapshot => {
		const headerPayload = pickLatest(headerEntriesRef.current, (e) => e.value)
		const titleMode =
			pickLatest(titleModeEntriesRef.current, (e) => e.value) ?? ('automatic' as const)

		return {
			title: pickLatest(titleEntriesRef.current, (e) => e.value),
			headerStyle: headerPayload?.style,
			headerHidden: headerPayload?.hidden ?? false,
			headerTransparent: headerPayload?.transparent ?? false,
			titleDisplayMode: titleMode,
			searchBar: pickLatest(searchEntriesRef.current, (e) => e.value),
			backButton: pickLatest(backEntriesRef.current, (e) => e.value),
			toolbarTopBarLeading: pickLatest(toolbarLeadingRef.current, (e) => e.value),
			toolbarTopBarTrailing: pickLatest(toolbarTrailingRef.current, (e) => e.value),
			toolbarBottomBar: pickLatest(toolbarBottomRef.current, (e) => e.value),
			toolbarPrincipal: pickLatest(toolbarPrincipalRef.current, (e) => e.value),
		}
	}, [])

	const emit = useCallback(() => {
		const next = recomputeSnapshot()
		if (snapshotsEqual(snapshotRef.current, next)) return
		snapshotRef.current = next
		listenersRef.current.forEach((l) => l())
	}, [recomputeSnapshot])

	const subscribe = useCallback((listener: () => void) => {
		listenersRef.current.add(listener)
		return () => {
			listenersRef.current.delete(listener)
		}
	}, [])

	const getSnapshot = useCallback((): StackChromeRegistrySnapshot => snapshotRef.current, [])

	const registerTitle = useCallback(
		(owner: SlotOwner, seq: number, node: React.ReactNode | null) => {
			if (node == null) titleEntriesRef.current.delete(owner)
			else titleEntriesRef.current.set(owner, { seq, value: node })
			emit()
		},
		[emit],
	)

	const registerHeaderStyle = useCallback(
		(
			owner: SlotOwner,
			seq: number,
			payload: {
				style?: React.CSSProperties
				hidden?: boolean
				transparent?: boolean
			} | null,
		) => {
			if (payload == null) headerEntriesRef.current.delete(owner)
			else headerEntriesRef.current.set(owner, { seq, value: payload })
			emit()
		},
		[emit],
	)

	const registerTitleDisplayMode = useCallback(
		(owner: SlotOwner, seq: number, mode: StackTitleDisplayMode | null) => {
			if (mode == null) titleModeEntriesRef.current.delete(owner)
			else titleModeEntriesRef.current.set(owner, { seq, value: mode })
			emit()
		},
		[emit],
	)

	const registerSearchBar = useCallback(
		(owner: SlotOwner, seq: number, node: React.ReactNode | null) => {
			if (node == null) searchEntriesRef.current.delete(owner)
			else searchEntriesRef.current.set(owner, { seq, value: node })
			emit()
		},
		[emit],
	)

	const registerBackButton = useCallback(
		(owner: SlotOwner, seq: number, node: React.ReactNode | null) => {
			if (node == null) backEntriesRef.current.delete(owner)
			else backEntriesRef.current.set(owner, { seq, value: node })
			emit()
		},
		[emit],
	)

	const registerToolbar = useCallback(
		(owner: SlotOwner, seq: number, placement: ToolbarPlacement, node: React.ReactNode | null) => {
			const map =
				placement === 'topBarLeading'
					? toolbarLeadingRef
					: placement === 'topBarTrailing'
						? toolbarTrailingRef
						: placement === 'bottomBar'
							? toolbarBottomRef
							: toolbarPrincipalRef
			if (node == null) map.current.delete(owner)
			else map.current.set(owner, { seq, value: node })
			emit()
		},
		[emit],
	)

	const clearOwner = useCallback(
		(owner: SlotOwner) => {
			titleEntriesRef.current.delete(owner)
			headerEntriesRef.current.delete(owner)
			titleModeEntriesRef.current.delete(owner)
			searchEntriesRef.current.delete(owner)
			backEntriesRef.current.delete(owner)
			toolbarLeadingRef.current.delete(owner)
			toolbarTrailingRef.current.delete(owner)
			toolbarBottomRef.current.delete(owner)
			toolbarPrincipalRef.current.delete(owner)
			emit()
		},
		[emit],
	)

	const value = useMemo(
		() =>
			({
				getSnapshot,
				subscribe,
				registerTitle,
				registerHeaderStyle,
				registerTitleDisplayMode,
				registerSearchBar,
				registerBackButton,
				registerToolbar,
				clearOwner,
			}) satisfies StackChromeContextValue,
		[
			getSnapshot,
			subscribe,
			registerTitle,
			registerHeaderStyle,
			registerTitleDisplayMode,
			registerSearchBar,
			registerBackButton,
			registerToolbar,
			clearOwner,
		],
	)

	return <StackChromeContext.Provider value={value}>{children}</StackChromeContext.Provider>
}

StackChromeProvider.displayName = `${DISPLAY_NAME.STACK}.ChromeProvider`

export function useStackChrome(): StackChromeContextValue {
	const ctx = use(StackChromeContext)
	if (!ctx) {
		throw new Error('Stack chrome components must be used within <Stack>.')
	}
	return ctx
}

/** Subscribe to chrome registry updates (for header / bottom bar renderers). */
export function useStackChromeSnapshot() {
	const chrome = useStackChrome()
	return useSyncExternalStore(chrome.subscribe, chrome.getSnapshot, chrome.getSnapshot)
}
