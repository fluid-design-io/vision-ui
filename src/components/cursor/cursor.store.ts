import type { CursorSnapshot, CursorStore, CursorTargetRegistration } from './cursor.types'

function createSnapshot(overrides: Partial<CursorSnapshot> = {}): CursorSnapshot {
	const snapshot = {
		isEnabled: false,
		isInside: false,
		isActive: false,
		isPressed: false,
		isSnapped: false,
		activeTargetId: null,
		pointerCount: 0,
		...overrides,
	}

	return {
		...snapshot,
		isActive: snapshot.isEnabled && snapshot.isInside,
		isSnapped: snapshot.activeTargetId !== null,
	}
}

function snapshotsEqual(a: CursorSnapshot, b: CursorSnapshot): boolean {
	return (
		a.isEnabled === b.isEnabled &&
		a.isInside === b.isInside &&
		a.isActive === b.isActive &&
		a.isPressed === b.isPressed &&
		a.isSnapped === b.isSnapped &&
		a.activeTargetId === b.activeTargetId &&
		a.pointerCount === b.pointerCount
	)
}

export function createCursorStore(): CursorStore {
	const listeners = new Set<() => void>()
	const targets = new Map<string, CursorTargetRegistration>()
	let snapshot = createSnapshot()

	function emit(next: CursorSnapshot) {
		if (snapshotsEqual(snapshot, next)) return
		snapshot = next
		listeners.forEach((listener) => listener())
	}

	function patchSnapshot(patch: Partial<CursorSnapshot>) {
		emit(createSnapshot({ ...snapshot, ...patch }))
	}

	return {
		getSnapshot: () => snapshot,
		subscribe(listener) {
			listeners.add(listener)
			return () => {
				listeners.delete(listener)
			}
		},
		getTargets: () => targets.values(),
		getTarget: (id) => targets.get(id) ?? null,
		registerTarget(target) {
			targets.set(target.id, target)
		},
		updateTarget(id, patch) {
			const target = targets.get(id)
			if (!target) return
			Object.assign(target, patch)
			if (target.isDisabled && snapshot.activeTargetId === id) {
				target.controller.resetParallax()
				patchSnapshot({ activeTargetId: null })
			}
		},
		unregisterTarget(id) {
			const target = targets.get(id)
			target?.controller.resetParallax()
			targets.delete(id)
			if (snapshot.activeTargetId === id) {
				patchSnapshot({ activeTargetId: null })
			}
		},
		setEnabled: (isEnabled) => patchSnapshot({ isEnabled }),
		setInside: (isInside) => patchSnapshot({ isInside }),
		setPressed: (isPressed) => patchSnapshot({ isPressed }),
		setActiveTarget: (activeTargetId) => patchSnapshot({ activeTargetId }),
		setPointerCount: (pointerCount) => patchSnapshot({ pointerCount }),
	}
}
