import type { StackChromeRegistrySnapshot } from '../stack.types'

export function renderHeaderLeading(snapshot: StackChromeRegistrySnapshot) {
	return (
		<div className="flex max-w-[min(18rem,35vw)] min-w-0 flex-1 items-center justify-start gap-2">
			{snapshot.backButton && <div className="flex shrink-0">{snapshot.backButton}</div>}
			<div className="flex shrink-0 items-center gap-1">{snapshot.toolbarTopBarLeading}</div>
		</div>
	)
}

export function renderHeaderTrailing(snapshot: StackChromeRegistrySnapshot) {
	return (
		<div className="flex max-w-[min(18rem,35vw)] min-w-0 flex-1 items-center justify-end gap-2">
			{snapshot.searchBar && <div className="flex shrink-0">{snapshot.searchBar}</div>}
			<div className="flex shrink-0 items-center gap-1">{snapshot.toolbarTopBarTrailing}</div>
		</div>
	)
}
