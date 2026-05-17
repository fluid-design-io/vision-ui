'use client'

import * as React from 'react'

import { useCursorContext } from './cursor.context'

export function useCursorSnapshot() {
	const { store } = useCursorContext('useCursorSnapshot')
	return React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)
}
