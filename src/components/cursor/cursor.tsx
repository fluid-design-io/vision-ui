import { CursorPointer } from './cursor.pointer'
import { CursorRoot } from './cursor.root'
import { CursorSnap } from './cursor.snap'
import { CursorSnapTarget } from './cursor.snap-target'

export const Cursor = Object.assign(CursorRoot, {
	Root: CursorRoot,
	Pointer: CursorPointer,
	Snap: CursorSnap,
	SnapTarget: CursorSnapTarget,
})
